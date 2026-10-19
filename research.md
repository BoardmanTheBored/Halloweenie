# Research

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Keep the evidence and creative decisions that currently guide the build.

## Working agreement

Developer: Run the starter first. Direct the inquiry, judge sources and options, make consequential decisions, and keep this file current.

Agent: Read `AGENTS.md`, `brief.md`, and this file, then inspect the project. Help compare possibilities, test assumptions quickly, and verify external sources without delaying the prototype for exhaustive research.

Start a fresh chat with:

`Read brief.md and research.md, inspect the running project, and help me develop the scene and three spooky stories.`

## Inquiry and decisions

Record only what informs the next build decisions:

- creative alternatives for the scene, stories, and audiovisual direction, with reasons for your choices
- useful sources and references, what they support, and important limitations
- experiments that resolve uncertainty, the results, and consequential trade-offs

Investigate unfamiliar techniques or asset sources as needed. Verify usage terms and keep source links and required credits here. Distinguish evidence from assumptions; the Agent's recommendation alone is not evidence.

## Decisions (Developer approved 2026-10-19)

### Scene
- **Setting:** gothic castle on a cliff against a large moon (the "weenie"). Genre-level gothic only.
- **Environmental features (Developer choice):** fountain, statue, castle gates (castle itself is the focal point).
- **No branding:** no Castlevania/Konami names, logos, lettering, characters, items, or music. Reason: brief says "Do not use any specific branding."
- **Visual style:** painterly, elegant gothic, AI-generated with Google Gemini. Prompt with descriptors, not artist names (Developer chose this over naming Ayami Kojima, a living artist, for ethical reasons and to avoid implying her involvement). Suggested descriptors: elongated gothic forms, ink-wash linework, muted jewel tones on deep indigo, soft watercolor gradients.
- **Layers:** flat generator output must be split into transparent layers (sky/moon, castle, mid-ground, foreground). Plan layers in the prompts; test cutout effort early.

### Story concepts (Developer-directed; trigger details still provisional)
**Overarching frame (approved):** the castle is expecting a guest. Tone: eerie, gentle, melancholic; not startling or scary (slow pacing, soft fades, low-volume sounds, no jump cuts or stingers; ghost only as a distant silhouette or inviting light).
**Structure (approved):** stories are LINEAR: 1 -> 2 -> 3, each unlocking the next. No windows/progress-counter device. Link is narrative only. Statue is built first (Phase 1).
1. **Statue, "Look":** tap eyes, raised hand, then the moon; moon brightens, head turns toward the castle, a distant bell tolls, statue stills.
2. **Fountain, "Remember":** tap the basin three times (distinct chime per ripple); third pulls the moon's reflection into the water, showing the castle once lit and welcoming, a silhouette waving from the tower; ripples away.
3. **Gates, "Come in":** tap two lanterns, then the knocker; gates swing open slowly on candlelight and mist, wait, then close softly. Ties to the park-visit goal.
Hint ladders (3 progressive hints each) point only at the next unlocked story. Locked objects still give soft feedback but do not trigger.
**Replay and persistence (approved):**
- Each completed story leaves a persistent scene change and unlocks the next. Proposed changes: statue stays turned toward the castle with faintly glowing eyes; fountain keeps a faint silver sheen and dim lingering reflection; gates stay ajar with candlelight and slow mist.
- Replay uses a **per-story Reset button** placed next to Play/Pause. It appears when the current story completes and disappears when the player moves on to the next story, so only the current story can be reset (no cross-story conflicts with the linear order). Resetting returns that story's objects to their pre-story look so it can be triggered again. No confirmation step (stories are short). Provisional: "moves on" = first tap on the next story's trigger objects; after story 3 the button stays.
- State is in memory only; a page reload starts fresh.
- Brief check: the brief asks for one unobtrusive Play/Pause control; Reset is a second, small control. Keep it visually secondary.
**Focused story view (approved: close-up overlay):** tapping a story's trigger object fades in a separate, more detailed painted close-up (one per story, 3 total) over the main scene, like a game's world-map zoom. Same page, no navigation, scene stays in place beneath. Hints, trigger taps, the story, and the per-story Reset happen in the overlay. Brief check: the brief requires one scene "without scrolling or switching pages"; an overlay on the same page is judged compatible, but this is an interpretation, so confirm with the instructor if unsure. Cost: 3 extra close-up images plus overlay open/close transitions.
**Overlay rules (approved):**
- All trigger taps happen inside the overlay (the statue close-up must therefore show the eyes, hand, and moon).
- The player exits with a back arrow (no tap-outside exit).
- Persistent changes appear in the main scene as well as the overlay (main art must render each post-story state).
- Closing the overlay before the story finishes resets that story's tap progress.
- "Leaving" a story = closing its overlay; the per-story Reset button therefore exists only inside the overlay (supersedes the first-tap rule above).
- After a story completes, the overlay fades back to the main scene automatically, showing the persistent change.
- Hints appear after an idle time as a line of text at the bottom of the screen, in the main scene.
- Reset access (approved): tapping a completed story's object reopens its overlay in a completed state, showing Reset and the back arrow. Same for story 3.
- Hint timing (approved): first hint after ~12-15 s idle, then another every ~12-15 s, each more direct; also shown inside overlays via the same bottom text line with story-specific hints; the hint timer pauses with Play/Pause.
**Open:** none from this round. Remaining research: verify audio candidates and find owl, gate creak, and water sounds.

### Gemini image usage
- **Developer's position:** Gemini-generated images are free to use, are not copyrightable, and Google states users own the output. Decision: treat as usable; credit "Scene art generated with Google Gemini."
- **Evidence ([Gemini Apps Help](https://support.google.com/gemini/answer/16722517), [watermark settings](https://support.google.com/gemini/answer/17405358)):** images carry an invisible SynthID watermark and C2PA metadata; the visible watermark is optional; turning it off does not remove SynthID or metadata; SynthID usually survives edits.
- **Not verified:** the exact usage-rights wording in Google's Terms of Service / Generative AI Additional Terms was not read. Commercial-use claims come from secondary sources that conflict. Revisit if the client's use becomes commercial.
- **Practice:** do not try to strip SynthID or metadata; keep original exports.

## Audio (candidates only; NOT yet verified or approved)
Found via Freesound search filtered to CC0. Each needs: license confirmed on its own page, listening check, loop check, then moved to the verified table.

| Use | Candidate | Author | Link |
|---|---|---|---|
| Ambient bed | Night Ambience | brunoboselli | https://freesound.org/people/brunoboselli/sounds/459675/ |
| Ambient bed | Night_Crickets_Wind (suburban, may sound off-tone) | roisin.gleeson | https://freesound.org/people/roisin.gleeson/sounds/699142/ |
| Ambient bed | Nightscapes Asplund | 1ratatosk1 | https://freesound.org/people/1ratatosk1/sounds/245824/ |
| Bell (statue story) | Distant Tolling Bell, ~8 s | TicAshfield | https://freesound.org/people/TicAshfield/sounds/824588/ |
| Bell | TOLLING BELL, ~21 s | SamuelGremaud | https://freesound.org/people/SamuelGremaud/sounds/454855/ |
| Bell | Short Bell Tolls, ~3 s | craigsmith | https://freesound.org/people/craigsmith/sounds/479985/ |

Still needed: owl, gate creak, water/fountain. Fallback source: OpenGameArt "Loopable Dungeon Ambience" (CC0; confirm on page). Avoid CC-BY items unless credited.

Statue-story candidates (Freesound CC0 filter; durations from search listing, unverified):

| Use | Candidate | Author | Link |
|---|---|---|---|
| Hand tap (stone scrape) | Stone Scrape 2, ~8 s | alegemaate | https://freesound.org/people/alegemaate/sounds/667283/ |
| Hand tap | stone_slab3.wav, ~4 s | NistuGgner | https://freesound.org/people/NistuGgner/sounds/700537/ |
| Head turn (long grind) | Stone Slab Door Grinding - Heavy Rock Scrape, ~10 s | NahuelMartinez | https://freesound.org/people/NahuelMartinez/sounds/844329/ |
| Head turn | Move Stone Rune 4, ~14 s | qubodup | https://freesound.org/people/qubodup/sounds/743246/ |
| Head turn (long) | Heavy stone door opens 2, ~57 s (trim) | PostProdDog | https://freesound.org/people/PostProdDog/sounds/578491/ |

Searches for owl, fountain, gate creak, door knocker, and flame were rate-limited (HTTP 429) and still need running.

**Verified audio (fill in):** none yet.

## SFX plan (DRAFT: sourcing status shown; Developer chose to synthesize UI/chimes/swells)
**Approach:** synthesize with Web Audio code where possible (original, no license or credit needed); source CC0 recordings only for organic sounds. No music-box (Developer decision). Statue story sounds come first.

| Sound | Story | Source | Status |
|---|---|---|---|
| Night wind bed (loop) | Ambient | Recorded CC0 | Candidates listed above, unverified |
| Owl hoot (random one-shots) | Ambient | Recorded CC0 | To find |
| Fountain trickle (quiet loop) | Ambient | Recorded CC0 | To find |
| Enter, overlay open/close, hint, locked-tap, reset, story-complete | UI | Synthesized | To build |
| Eyes tap (glow shimmer), moon tap (rising chime), moon brighten (swell) | 1 Statue | Synthesized | To build |
| Hand tap (stone scrape), head turn (long stone grind) | 1 Statue | Recorded CC0 | To find |
| Bell toll (~8 s) | 1 Statue | Recorded CC0 | Candidates listed above, unverified |
| Basin ripple x3 (distinct pitches), reflection shimmer, ripple away | 2 Fountain | Synthesized (water-drop base could be recorded) | To build / find |
| Lantern ignite x2 (distinct), candle crackle, mist wind | 3 Gates | Recorded CC0 | To find |
| Knocker thunk + echo, gate creak (open), gate close creak/thud | 3 Gates | Recorded CC0 | To find |

Reuse to reduce work: bell can double as hint chime; one creak can serve gate open/close and overlay sounds (pitch/reverse).

## Technical notes
- iOS Safari keeps Web Audio locked until a user gesture: call `audioCtx.resume()` inside the Enter button handler ([Matt Montag](https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos)).
- iOS may mute Web Audio when the ringer switch is silent: confirm on the physical phone; consider an on-screen note.
- Gapless looping on iOS: unverified; test directly.

## Open questions
- Confirm statue story as Phase 1.
- Approve or change the story concepts and features.
- Image tool settings (aspect ratio for phone viewport) and layer plan.

## Revisions

Update decisions when new evidence changes the direction, linking to playtest observations in `plan.md` rather than copying them. Keep chosen behavior and asset requirements in `spec.md`. The Developer confirms when the inquiry is sufficient to continue building; exhaustive research is not a prerequisite.

## Saving the transcript

When directed, save the complete conversation as `transcripts/research-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
