"""Turn the Gemini originals in reference/art/ into game assets in assets/.

Cutouts: the black background is removed by flood-filling from the image edges
(so dark areas *inside* the subject survive), with a soft alpha ramp at the
boundary and colour un-premultiplied to avoid dark fringes. Output is trimmed.
Backgrounds: cover-cropped to the stage's portrait ratio.
Originals are never modified.  Run: python tools/make_assets.py
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage

SRC, DST = "reference/art", "assets"
HI = 24                 # max-channel value at or below which a pixel counts as black
GLOW_GRAD = 3.0         # gradient below which a dim pixel counts as smooth glow
BG_RATIO = 9 / 16        # portrait backgrounds are cover-cropped to this
# Kept at full width (the stage fits it by width): cropping would cut off the lantern brackets.
NO_CROP = {"Gate Closeup"}

# source file -> output name
CUTOUTS = {
    "Moon": "moon", "Castle_Far": "castle", "Terrain": "terrain",
    "Gate_Far": "gatehouse", "Lantern_Lit": "lantern-lit",
    "Lantern_Unlit": "lantern-unlit", "Fountain_Far": "fountain",
    "Statue_Far": "statue", "Statue_Far_Turned": "statue-turned",
    "Statue_Close": "statue-close", "Statue_Close_Turned": "statue-close-turned",
    "Bat_Up": "bat-up", "Bat_Down": "bat-down",
    "Foreground_Left": "fg-left", "Foreground_Right": "fg-right",
    "Fountain_Close": "fountain-close", "Fountain_Close_Reflection": "fountain-close-reflection",
    "Gate_Doors_Closed": "gates-closed", "Knocker": "knocker",
}
BACKGROUNDS = {
    "Sky": "sky", "Statue_Backdrop": "statue-backdrop",
    "Closeup_Background": "closeup-backdrop", "Gate Closeup": "gate-backdrop",
    "Castle_Reflection": "castle-reflection",
}

# Per-asset overrides. "glow" assets have a soft painted spotlight behind the
# subject instead of pure black, so smooth (low-gradient) dim areas also count
# as background; the subject's rim-lit edge stops the fill.
# Assets with see-through holes (ring centre, gaps between wing and body):
# any large near-black region counts as background, not just border-connected ones.
HOLES = {"Knocker", "Bat_Up", "Bat_Down", "Foreground_Left", "Foreground_Right"}
HOLE_MIN_PX = 150

GLOW = {"Statue_Far", "Statue_Far_Turned", "Statue_Close", "Statue_Close_Turned"}

def key_black(im, glow=False, holes=False):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    mx = a.max(axis=2)
    if glow:
        grad = ndimage.gaussian_gradient_magnitude(ndimage.gaussian_filter(mx, 1.0), 1.5)
        bg = (mx <= 110) & (grad < GLOW_GRAD)
        bg = ndimage.binary_opening(bg, iterations=1)
    else:
        bg = mx <= HI
    # background = candidate regions connected to the image border
    lab, _ = ndimage.label(bg)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    outside = np.isin(lab, edge[edge != 0])
    if holes:
        sizes = np.bincount(lab.ravel())
        big = np.flatnonzero(sizes >= HOLE_MIN_PX)
        outside |= np.isin(lab, big[big != 0])
    # drop hairline "outside" channels (dark outlines leaking into the subject)
    outside = ndimage.binary_opening(outside, iterations=2) | (outside & ~ndimage.binary_dilation(~outside, iterations=0))
    # eat 1px of boundary (dark fringe), then feather 1px for a soft edge
    subject = ndimage.binary_erosion(~outside, iterations=1)
    alpha = ndimage.gaussian_filter(subject.astype(np.float32), 0.8)
    alpha[outside & ~ndimage.binary_dilation(subject, iterations=2)] = 0
    out = np.dstack([a, alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")

def bbox(img):
    return img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()

def cover_crop(im, ratio):
    w, h = im.size
    if w / h > ratio:                       # too wide: crop sides, keep centre
        nw = round(h * ratio); x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio); y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))

os.makedirs(DST, exist_ok=True)
# Frames that swap in place must share one crop box so they stay aligned.
GROUPS = [("Bat_Up", "Bat_Down"), ("Lantern_Lit", "Lantern_Unlit"),
          ("Statue_Far", "Statue_Far_Turned"), ("Statue_Close", "Statue_Close_Turned"),
          ("Fountain_Close", "Fountain_Close_Reflection")]
keyed = {src: key_black(Image.open(f"{SRC}/{src}.jpg"), glow=src in GLOW, holes=src in HOLES)
         for src in CUTOUTS}
box = {src: bbox(img) for src, img in keyed.items()}
for g in GROUPS:
    u = (min(box[k][0] for k in g), min(box[k][1] for k in g),
         max(box[k][2] for k in g), max(box[k][3] for k in g))
    for k in g:
        box[k] = u
for src, name in CUTOUTS.items():
    out = keyed[src].crop(box[src])
    out.save(f"{DST}/{name}.webp", quality=90, method=6)
    print("cutout", name, out.size)
for src, name in BACKGROUNDS.items():
    im = Image.open(f"{SRC}/{src}.jpg").convert("RGB")
    if src not in NO_CROP and abs(im.width / im.height - BG_RATIO) > 0.01:
        im = cover_crop(im, BG_RATIO)
    im.save(f"{DST}/{name}.webp", quality=88, method=6)
    print("background", name, im.size)
