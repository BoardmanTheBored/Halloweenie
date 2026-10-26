# Technical Specification

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Keep a concise, testable description of the experience currently being built.

## Working agreement

Developer: Begin with the running prototype, approve the intended behavior, test it directly, and update this file when the intended result changes.

Agent: Read `AGENTS.md`, `brief.md`, `research.md`, and this file, then inspect the project. Turn decisions into acceptance checks without inventing product choices or freezing details that still require testing.

Start a fresh chat with:

`Read the project documents, inspect the running prototype, and help me specify the next useful build checkpoint.`

## Current build contract

Define only enough to build and verify the current direction:

- the intended User experience and chosen scene, ambience, and story behavior
- the system structure, shared rules, and states that keep audiovisual behavior and interaction coordinated
- the assets and layout needed for that structure, linking to sources and credits in `research.md`
- acceptance checks for the chosen behavior and every requirement in `brief.md`, including accessibility and failure behavior

Reference the brief's fixed requirements rather than copying them. Specify your decisions precisely enough that the Developer and Agent can judge the same result. Leave untested details open until they are needed, and distinguish provisional ideas from approved behavior.

### Status: Developer approved 2026-10-19 (ambient effects, CSS-shape placeholders until art exists, statue-first order). Items marked (P) stay provisional until tested.

### Experience
Scene, stories, hint ladders, overlay rules, persistence and Reset behavior are approved in `research.md` (Decisions); this file does not restate them. Tone: eerie, gentle, melancholic, no startles. Fixed requirements live in `brief.md`.

### Decisions made this round
- Overlay system and 3 close-up images are built for all three stories now. The statue story is implemented end to end first; fountain and gates follow as separate checkpoints.
- Overlay-vs-"no switching pages" interpretation: Developer accepts the risk (same page, fade overlay).
- Ambient effects (P): drifting fog, flickering gate-lantern light, bats crossing the moon. Final choice after seeing the art.
- Audio: synthesized Web Audio placeholders for everything first; CC0 recordings are verified and swapped in later (`research.md` audio tables). No audio assets exist yet.
- Art: none exists. Gemini generation in layers (sky/moon, castle, mid-ground, foreground) plus 3 close-ups; flat placeholders (CSS shapes) are acceptable until art arrives.

### System structure (P)
- Plain HTML/CSS/JS, no build step, one page, vertical phone layout (fixed-aspect stage scaled to viewport, no scroll).
- Layer stack, bottom to top: background art, ambient effect layers, interactive hotspots, UI (Play/Pause, hint line), overlay (close-up + back arrow + Reset), start screen.
- One central state: `paused`, `reducedMotion`, `activeStory` (none | 1-3), `storyProgress`, `completed[1..3]`, `playing`. All animation, audio, timers, hint timer and input check this one state; Play/Pause flips it everywhere together.
- Story playback is a small timeline (5-10 s) that disables all other input until it ends.

### Acceptance checks (current checkpoint: scene, start screen, Play/Pause, overlay shell, statue story)
Start screen and motion
1. Page opens to a start screen; Enter launches the scene and resumes the audio context in the same tap handler.
2. Reduced-motion preference is read before Enter; when set, ambient motion is replaced by static or minimal effects, and the user is told so on the start screen.
Scene
3. The scene fits a phone portrait viewport (e.g. 390x844 and 360x640) with no scrolling.
4. Castle focal point plus three features (fountain, statue, gates); 3 ambient effects running; looping ambient audio audible after Enter.
Play/Pause
5. One unobtrusive control; pause freezes motion, effects, audio, timers (including the hint timer and any running story) and input; resume continues from the same point.
Statue story and overlay
6. Tapping the statue opens its close-up overlay with a fade; back arrow closes it; closing mid-story resets tap progress.
7. Taps on eyes, hand, moon must go in order; each gives a distinct audiovisual response and visible progress; a wrong tap inside the open story (out of order, or a target already done) gives soft feedback (ring, quiet thud) and resets tap progress to the start, with the glows fading out; locked objects in the main scene give soft feedback only. (Developer decision 2026-10-19.)
8. Completion plays a 5-10 s sequence; all other input is disabled during it; afterward the overlay fades to the main scene showing the persistent change.
9. Tapping the completed statue reopens the overlay with Reset; Reset restores the pre-story look and the story replays without reload.
10. Hints appear after ~12-15 s idle, up to three, each more direct, in the bottom text line, and pause with Play/Pause.
Input and accessibility
11. Everything works by touch and keyboard (focusable hotspots, Enter/Space, visible focus, Escape closes overlay); targets at least 44x44 CSS px; text contrast at least 4.5:1.
12. Failure behavior: if audio is blocked or fails, the visuals still work and no error is shown to the user.
Verification: run in browser preview, then on a physical phone over HTTPS (iOS silent-switch and loop behavior from `research.md` Technical notes).

## Phase 2: fountain and gates stories (Developer approved 2026-10-26)

Concepts, order and overlay rules are in `research.md` (Decisions); this section records only the build decisions.
- **Persistent changes use CSS effects only** (no new art): fountain keeps a dim lingering reflection in its close-up and a faint silver sheen on the main-scene water; gates keep a warm glow and slow mist in the gatehouse archway (story 3).
- **Audio is synthesized** (same approach as story 1); no CC0 recordings for stories 2-3.
- **Fountain finale (7 s):** moonlight falls into the basin, the reflection of the lit castle cross-fades in, a tower window pulses, ripples wash away. The waving silhouette from `research.md` is replaced by that window pulse because no silhouette art exists.
- **Art mapping:** `Closeup_Background` is the fountain backdrop; `Fountain_Close` is the empty basin and `Fountain_Close_Reflection` the same basin with the castle reflected; `Gate Closeup` is the gates backdrop; `Gate_Doors_Closed`, `Knocker`, `Lantern_Unlit`, `Lantern_Lit` are the gate pieces.
- **Unlock rule:** each story's main-scene object gives soft feedback only until the previous story is complete. Hint ladders for a story appear only once it is unlocked.
- **Acceptance:** checks 5-12 above apply to each new story, plus: the fountain's three taps each have a distinct sound and a lasting ring.

## Scope and revisions

- Excluded for now: music, persistence across reloads, stories 2-3 implementation, CC0 audio swap, deployment.
- Next behavior that must work: acceptance checks 1-5 (scene, start, Play/Pause), then 6-12.
- Changes: 2026-10-19 research draft approved; overlay built for all three stories; interpretation risk accepted.

## Saving the transcript

When directed, save the complete conversation as `transcripts/spec-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
