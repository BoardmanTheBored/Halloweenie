# Art prompts (Gemini)

Prompts for every image asset in Virtual Hallo"weenie". Decisions behind them (style descriptors, no artist names, no branding, Gemini usage and credit) are in `research.md`; how the images are used is in `spec.md` and `plan.md` (checkpoint 6).

## How to use

1. Generate **one asset per chat**. Paste the matching shared header first, then the asset prompt. Ask for one change at a time if the result is off.
2. Choose the aspect ratio shown on each asset (set it in Gemini's controls, or say it in the prompt). Request the highest resolution available; the displayed sizes are small, but close-ups benefit from detail.
3. **Cutout assets (A and C-cutout)** are generated on pure black so the black can be keyed out. Before accepting one, check that all four corners and any empty area are exactly `#000000` with no gradient, vignette, floor shadow or glow.
4. **Why the subject must not contain pure black:** a black key also removes any black inside the subject. The cutout header therefore asks for deep indigo (`#14123A`) as the darkest tone plus a thin moonlit rim. Look especially at the gatehouse archway and the bats.
5. Turn off the visible watermark if Gemini offers it. Do not try to strip the invisible SynthID or metadata; keep the original exports (see `research.md`, Gemini image usage). Credit: "Scene art generated with Google Gemini."
6. Save originals under `reference/art/` (unprocessed) and cleaned cutouts under `assets/` when we build checkpoint 6.
7. Tick the box when an asset is generated **and** its background is verified.

Generation order that keeps assets consistent: A7 first (reference for A8-A10), A2 before C3, A5 before C7-C8, A12 after A11.

## Shared header A: cutouts on black (paste first)

```
STYLE: painterly, elegant gothic illustration. Elongated gothic forms, ink-wash linework, muted jewel tones (deep indigo, plum, teal, tarnished silver), soft watercolor gradients. Moonlit night. Eerie, gentle, melancholic mood; not gory, not violent, suitable for ages 10+. No text, letters, logos, signatures, watermarks or borders. Not based on any existing franchise, game or character.

BACKGROUND (critical): the subject sits alone on a perfectly flat, pure black (#000000) background, identical edge to edge: no gradient, vignette, texture, floor, ground plane, cast shadow, fog, stars or glow on the background. The subject itself contains NO pure black: its darkest areas are deep indigo (about #14123A) so it can be separated from the background cleanly. Crisp, clean outline with a thin pale-blue moonlit rim light along the edges. Leave a margin of empty black around the subject unless the prompt says it bleeds off the edge.
```

## Shared header B: full-frame backgrounds (paste first)

```
STYLE: painterly, elegant gothic illustration. Elongated gothic forms, ink-wash linework, muted jewel tones (deep indigo, plum, teal, tarnished silver), soft watercolor gradients. Moonlit night. Eerie, gentle, melancholic mood; not gory, not violent, suitable for ages 10+. No text, letters, logos, signatures, watermarks or borders. Not based on any existing franchise, game or character.

FRAME: the image fills the entire frame edge to edge with no black bars and no vignette border. There is NO moon anywhere in the image (the moon is added separately). The central area stays calm and uncluttered because separate objects are placed there later. No characters or figures.
```

---

## A. Phase 1 cutouts (on black) — scene and statue story

- [x] **A1. Moon** (1:1). Used in the scene and the statue close-up.
```
A large full moon, front view, filling most of a square frame. Luminous pale silver-blue disc with soft grey-lavender craters and maria, crisp circular edge. No clouds, no halo or glow outside the disc.
```

- [x] **A2. Castle** (3:4 portrait). Focal point.
```
A tall gothic castle seen straight-on from the front, backlit by a large moon behind it. Dominant central spire, two flanking pointed towers, battlements, narrow arched windows, one single warm candle-lit window high in the central spire. Deep indigo stone with pale rim light along roof edges. Flat straight bottom edge (the base will be hidden behind a cliff). No cliff, ground, fog or sky.
```

- [x] **A3. Terrain / cliff** (1:1; bleeds off the left, right and bottom edges).
```
A rocky cliff-top landscape seen from the front. An irregular rocky cliff crest runs across the full width in the upper third of the frame; everything ABOVE the crest is pure black (sky). Below the crest, a cliff face and a wide flat gravel path with sparse dead grass fill the frame down to the bottom edge. Indigo and slate tones, moonlight on the crest. A clear open flat area in the lower half for objects to be placed. No buildings, statues, fountains or trees. The terrain bleeds off the left, right and bottom edges.
```

- [x] **A4. Gatehouse** (4:3 landscape).
```
A stone gatehouse seen straight-on from the front: a central arched gateway flanked by two short round towers with pointed conical roofs, crenellated wall between them, two empty iron lantern brackets mounted either side of the arch. The archway interior is filled with very dark indigo (NOT pure black). Weathered stone, deep indigo and slate with moonlit rim light. Flat straight bottom edge. No ground, no lanterns lit.
```

- [x] **A5. Lantern, lit** (1:1; small object, used twice in the scene).
```
A single ornate wrought-iron wall lantern, front view, with a hanging bracket at the top. Glass panes glow warmly from one candle flame inside; the flame is visible. Dark indigo iron, warm amber light only inside the glass. No light spill outside the lantern.
```

- [x] **A6. Fountain** (1:1).
```
A tiered stone garden fountain, slightly elevated three-quarter front view: a wide shallow circular basin, a central pillar with a smaller upper bowl and a gentle thin stream of water. Still dark water with soft silvery moon reflections. Weathered stone in indigo and slate. No ground, no fog, no plants.
```

- [x] **A7. Statue, close-up, facing front** (9:16 portrait). Generate this first.
```
A weathered stone statue, waist up, facing the viewer. A serene robed figure in long flowing robes, hollow pale stone eyes (not glowing), head slightly bowed. One arm raised with an open palm: the figure's LEFT arm, on the viewer's right, raised beside the head. Moss and fine cracks on the stone. Calm and melancholic, not frightening.
```

- [x] **A8. Statue, close-up, head turned** (9:16). Attach A7 as reference.
```
Using the attached reference image: the exact same statue, same pose, robes, raised hand and lighting, but the head is turned to the viewer's right, gazing toward the upper right. Eyes remain pale stone, not glowing. Nothing else changes.
```

- [x] **A9. Statue, main scene, facing front** (9:16, small in the scene). Attach A7 as reference.
```
Using the attached reference image: the same statue, now full-length and standing on a low square stone plinth, front view, same raised left arm (viewer's right), head slightly bowed. Entire figure and plinth inside the frame. Flat straight bottom edge.
```

- [x] **A10. Statue, main scene, head turned** (9:16). Attach A9 as reference.
```
Using the attached reference image: the same full-length statue on the same plinth, exactly the same pose and framing, but the head is turned to the viewer's right, gazing toward the upper right. Nothing else changes.
```

- [x] **A11. Bat, wings up** (3:2).
```
A single bat silhouette-style illustration seen from the front, wings spread wide and raised upward mid-flap. Deep indigo membranes with visible finger-bone ribs, small ears, thin pale moonlit rim light. Not scary or detailed with fangs.
```

- [x] **A12. Bat, wings down** (3:2). Attach A11 as reference.
```
Using the attached reference image: the exact same bat in the same size and style, but the wings are swept downward, at the bottom of the flap. Nothing else changes.
```

- [x] **A13. Foreground, left** (1:1; bleeds off the left and bottom edges).
```
A foreground cluster of twisted bare thorny branches, tall dead grass and the leaning corner of a broken gravestone, rising from the bottom-left corner of the frame. Deep indigo with thin moonlit rim light. Bleeds off the left and bottom edges only. Nothing else in the frame.
```

- [x] **A14. Foreground, right** (1:1; bleeds off the right and bottom edges).
```
A foreground cluster of a crooked iron fence post, a twisted bare shrub and a few tall reeds, rising from the bottom-right corner of the frame. Deep indigo with thin moonlit rim light. Bleeds off the right and bottom edges only. Nothing else in the frame.
```

## B. Phase 1 full-frame backgrounds (header B, not cutouts)

The stage is about 9:19.5 and crops to cover, so generate 9:16 and keep anything important away from the far left and right edges.

- [x] **B1. Sky, main scene** (9:16).
```
A tall portrait night sky only, filling the entire frame. Deep indigo at the top shading to dusky violet, with a faint teal-plum glow near the bottom edge. Scattered small soft stars, more near the top, and a few thin wisps of high cloud lit faintly silver. No buildings, hills, trees, ground or birds. Painterly watercolor gradients.
```

- [x] **B2. Statue close-up backdrop** (9:16).
```
A moonlit night garden seen straight-on. The upper 70% is deep indigo night sky with soft stars and faint wisps of cloud. At about 70% of the height, a far-away soft silhouette of low hedges and a low stone garden wall dissolving in pale mist. The bottom 25% is dark flagstone-paved ground with faint moonlit highlights. The centre of the frame is calm and empty. No statue, no moon.
```

---

## C. Later stories (Phase 2): fountain "Remember" and gates "Come in"

Not needed for Playtest 1. Listed here so the full set is planned.

### Fountain close-up

- [x] **C1. Fountain close-up backdrop** (9:16, header B).
```
A moonlit castle garden at night seen straight-on. The upper 55% is deep indigo sky with soft stars. A middle band of tall dark hedges and a distant stone balustrade softened by mist. The lower 40% is a dark flagstone courtyard with faint silvery highlights. The centre is calm and empty, where a fountain will be placed. No fountain, no statue, no moon.
```

- [x] **C2. Fountain basin, close-up** (1:1, header A).
```
A large circular stone fountain basin seen from a high three-quarter angle, looking down at the still dark water. The basin rim is weathered carved stone with gentle gothic scalloping. The water surface is dark indigo, glassy and perfectly still, with NO reflections (reflections are added later) and a small low pedestal rising from the centre of the water; no spouting water. The basin fills most of the frame; nothing beneath the rim.
```

- [x] **C3. Reflection of the castle, once welcoming** (3:4, header A). Attach A2 as reference.
```
Using the attached reference image of the castle: the castle's REFLECTION on water, shown upside-down and gently rippled with soft slightly blurred edges, as the castle once was, warm and welcoming. Every window glows warm gold and lanterns are lit along the walls. In one tower window, a small friendly silhouette of a person waves. Deep indigo and gold. Reflection only: no water border, no shoreline, no surrounding scenery.
```

### Gates close-up

- [x] **C4. Gates close-up backdrop** (9:16, header B).
```
A close view of a gothic castle gateway at night, seen straight-on and filling the frame: a massive weathered stone wall with a tall pointed archway in the centre (about 60% of the frame width and reaching about 60% of its height). Through the open archway, a distant warm candle-lit courtyard glows softly and welcomingly with a hint of warm mist. Two empty iron lantern brackets are mounted on the wall either side of the arch. Moss and cracks on the stone. No gates or doors in the arch, no figures, no moon.
```

- [x] **C5. Double gates, closed** (3:4, header A). Cut down the centre seam in code to swing the two leaves.
```
A pair of tall closed double gates with a pointed-arch top, seen straight-on and perfectly symmetrical. Dark wood planks with wrought-iron bands and studs. A clear vertical seam at the exact centre where the two leaves meet. No knocker, no ring, no handle (the knocker is added separately). Deep indigo and weathered wood tones.
```

- [x] **C6. Door knocker** (1:1, header A).
```
A heavy wrought-iron door knocker: a large ring hanging from a crescent-moon shaped mount, front view. Deep indigo iron with soft silver highlights.
```

- [x] **C7. Large lantern, unlit** (1:1, header A). Attach A5 as reference.
```
Using the attached reference image: the same wrought-iron lantern redrawn much larger and in finer detail for a close-up, with its hanging bracket. It is NOT lit: the glass panes are dark and glassy with a cold pale-blue sheen, and an unlit candle is visible inside.
```

- [x] **C8. Large lantern, lit** (1:1, header A). Attach C7 as reference.
```
Using the attached reference image: the exact same lantern, same size, same framing and same details, but now lit. A single candle flame glows inside and the glass panes glow warm amber. No light spill outside the lantern.
```

---

## Not generated with AI

- Moon, lantern and eye glows: CSS gradients.
- Fog: procedural noise texture (approved).
- Sounds: synthesized placeholders; CC0 recordings to be verified (see `research.md`).
