# Implementation Plan

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Track the next useful build checkpoints, verification, and consequential revisions.

## Working agreement

Developer: Keep the browser preview running, choose priorities, test results directly, and plan only the next few checkpoints.

Agent: Read the project documents and inspect the files. Keep each checkpoint small enough to run and judge. Do not expand scope or mark Developer verification complete.

Start or continue a fresh chat with:

`Read the project documents, inspect the current build, and help me complete the next unchecked checkpoint.`

## Checkpoints

Create your own checklist for the next few results, using the workflow in `brief.md` and the current `spec.md`. Name the main risk, what each checkpoint should produce, and how you will verify it. Review and approve the approach before implementation.

### Approved approach (Developer approved 2026-10-19)

Main risk: the art pipeline (Gemini output split into transparent layers, fit to the phone viewport). Mitigation: build with CSS-shape placeholders first and swap in real art at checkpoint 6. Timing and tone of the story sequence tuned on placeholders will need a second pass after the swap. Phase 1 scope is the statue story only. Hosting: GitHub Pages. Acceptance check numbers refer to `spec.md`.

- [x] 1. Stage and layers: fixed-aspect stage scaled to viewport, layer stack with placeholder shapes. Verify: checks 3-4 (layout) at 390x844 and 360x640, no scroll.
- [x] 2. Start screen, central state, Play/Pause: reduced-motion note, Enter resumes audio context, one state object. Verify: checks 1, 2, 5.
- [x] 3. Ambience: fog, gate-lantern flicker, bats, synthesized wind loop. Verify: checks 4, 5 (pause stops everything).
- [x] 4. Overlay shell and statue interaction: fade overlay, back arrow, Escape, ordered taps, progress, soft wrong-tap feedback, keyboard. Verify: checks 6, 7, 11, plus Pause mid-story.
- [x] 5. Statue story sequence: 5-10 s timeline, synthesized sounds, persistent change, Reset, hint ladder. Verify: checks 8-10, 12; replay without reload; audio blocked still works.
- [x] 6. Real art swap: Gemini layers and close-up replace placeholders; second-pass timing/tone tuning. Verify: re-run checks 3-5 and 8. *(Art swapped and committed `4f7492c`; browser story run clean at 390x844 and 360x640. Second pass done 2026-10-26, see Evidence below: checks 3-5 and 8-9 re-run, timing and tone approved unchanged.)*
- [x] 7. Deploy to GitHub Pages and test on a physical phone (iOS silent switch, audio loop). Unlocks Playtest 1. *(Live at https://boardmanthebored.github.io/Halloweenie/; see Evidence below. Android and one iOS tester report no problems.)*

Phase 2 (stories 2 and 3; decisions in `spec.md`, Phase 2 section):

- [x] 8. Fountain story ("Remember"): unlocked by the statue story; tap the water three times; reflection finale; persistent dim reflection and main-scene sheen; Reset; hint ladders. Verify: checks 5-12 for story 2. *(Built and agent-tested in Edge at 390x844 and 360x640: lock, three taps by touch and keyboard, finale, pause mid-finale, hints, Reset and replay. Developer tested; layout and close-up layering adjusted per feedback.)*
- [x] 9. Gates story ("Come in"): two lanterns, then the knocker; gates swing open, wait, close; persistent warm glow and mist; Reset; hint ladders. Verify: checks 5-12 for story 3. *(Built and agent-tested in Edge at 390x844 and 360x640: lock until story 2, lanterns then knocker by touch and keyboard, wrong taps reset, 8.6 s finale, pause mid-finale, hints, Reset and replay. Developer tested; knocker kept hidden through the closing phase per feedback.)*

- [x] 10. Story-complete screen and credits: opens after every gates finale (story message plus credits); small Credits link in the scene opens credits only; Back to the castle, Escape and focus handling; scene inert while open; Pause still works; hints off while open. *(Built and agent-tested in Edge at 390x844 and 360x640. Credits include Claude Code, per the Developer. Developer tested.)*

Each checkpoint ends with a git commit after the Developer has tested it.

Test each result before continuing, including related behavior that already works. Update priorities as evidence emerges and preserve meaningful working checkpoints in git. Before delivery, verify the deployed app against the brief and specification.

## Evidence and revisions

Record non-identifying playtest observations, separating what Users did or said from your interpretation. Use the findings to choose revision priorities and record what changed and how you verified the improvement.

Keep implementation progress and verification here. Update `research.md` when evidence changes a decision and `spec.md` when intended behavior changes; link to those updates rather than duplicating them. Record consequential changes, not every small adjustment.

### Checkpoint 6 second pass: timing and tone (2026-10-26)

- Agent re-ran acceptance checks 3, 4, 5, 8 and 9 in Edge at 390x844 and 360x640 on the real art: all pass, no page errors. Pause froze the clock, fog and the mid-finale animation, and resume continued. Check 3 note: at 360x640 the page cannot scroll; the stage is taller than the viewport and cropped by design.
- Agent observation: mid-finale (about 2.6-4.2 s) the front and turned statue images overlap, giving a ghostly double image of the head and robe folds.
- Developer decision: keep the long dissolve (it reads as eerie), and said the bell, grind and swell sounds felt fine. No timing or tone changes made; the 7.0 s finale timeline stands. Audio sync was judged by the Developer by ear; the Agent cannot hear audio.

### Checkpoint 7: deployment and first phone test (2026-10-26)

- Deployed from `main` (root) to GitHub Pages; the Developer enabled Pages in repo Settings. The deployed page returned 200 and an automated Edge run at 390x844 completed the whole statue story (taps, finale, persistent change, overlay closed). Only console errors: two 404s for `favicon.ico` (no icon file; harmless).
- Developer on a Samsung Galaxy S25 (Android): the game ran without errors or bugs, and the audio loop played fine.
- A playtester on iOS 27.0.1 reported that it works fine, with the ringer switch on silent, and that the audio sounded fine. Interpretation: this confirms iOS audio unlock and the silent-switch case from `research.md` Technical notes for this one device and version The tester also heard no gap or click when the loop restarts, so looping is gapless on that device (single report).
- Known and accepted by the Developer: at 360x640 the stage crops top and bottom, so the moon's top edge is cut and Pause overlaps it.

## Saving transcripts

When directed, save the complete conversation as `transcripts/plan-YYYY-MM-DD_HHMMSS.md` or `transcripts/build-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
