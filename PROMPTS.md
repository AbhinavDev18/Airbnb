# AI Workflow

How this was built with Claude Code: the agent configs, the prompt sequence,
and the parts where the AI was wrong and got corrected.

## Shape of the run

One orchestrating session held the visual ground truth (it could see the
reference and the running clone) and delegated implementation to subagents in
parallel. The division mattered: **the orchestrator never handed a subagent a
screenshot to copy** — it handed measured numbers. Subagents write code to a
spec; only the orchestrator compares pixels.

```
orchestrator ── extract reference data + measurements
             ├── section-builder ×3  (parallel: header/hero · overview/amenities · reviews/host/footer)
             ├── section-builder ×1  (sticky nav + calendar, found during review)
             ├── a11y-guard          (overlay focus audit)
             └── verify → fix → build
```

## Subagent configs

In [`.claude/agents/`](.claude/agents/). Three roles, each with a hard scope
boundary — the scope limits are what kept parallel agents from colliding.

| Agent | Does | Refuses |
|---|---|---|
| `section-builder` | One section, one file, to a measured spec | Multi-section scope; touching routing, data, or global CSS |
| `pixel-auditor` | Reports measured visual deltas | Editing; opinions without a number |
| `a11y-guard` | Keyboard, focus, semantics — overlays first | Restyling to reach an a11y goal without flagging it |

The rule that earned its keep is in `pixel-auditor`: *"never report 'spacing
looks tight', report 'gap is 12px, reference measures 8px'."* Vague visual
feedback produces vague fixes.

## Prompt sequence

**1 · Extract, don't guess.**

> Measure the reference layout with `getBoundingClientRect` at a fixed
> viewport. I want exact numbers for the content column, hero mosaic cells and
> gaps, and the tour's column split — not estimates from a screenshot.

Yielded the numbers the whole build was specced against: 1120px column,
560×494 + 272×243 at 8px gaps, 976px tour column. `getComputedStyle` returned
empty strings in the extension sandbox, so geometry became the source of truth
— which also sidestepped copying their CSS, and the brief forbids lifting code.

**2 · Pull the assets and the data model.**

Assets sat behind Vercel's bot check, so `curl` returned 429. Fetched them from
inside the verified browser session and streamed them to a local receiver — 73
files, byte-exact. Photo→category binding was derived by measuring which
section heading each image fell under, giving 43 photos across 9 categories.

**3 · Foundation before parallelism.** Design tokens, content model, icon set,
and layout primitives were written first, so three agents could build against
stable contracts instead of inventing their own.

**4 · Three builders in parallel.** Each got exact measurements, the token
names to use, and an explicit "do NOT modify any other file" list. Sample:

> MOSAIC — these measurements are exact, taken from the reference at 1470px.
> Do not improvise them: `grid-template-columns: 560px 272px 272px;
> grid-template-rows: 243px 243px; gap: 8px;` … HOVER: the image inside scales
> to 1.045 over 300ms with `var(--ease-airbnb)` — the button itself must not
> move, so use an inner wrapper with overflow hidden.

**5 · Overlays kept in-house.** The photo tour, lightbox, and `useDialog`
contract were written by the orchestrator, not delegated — they carry the
graded animation and focus behaviour and span multiple files, which is exactly
what `section-builder` is configured to refuse.

**6 · Verify against the reference, then fix.** Comparing the running clone to
the reference surfaced three things the initial pass missed: a **sticky sub-nav**
that appears on scroll, a **two-month calendar** section, and **strikethrough**
on the two unreported alarms. All three came from looking at the real page, not
from re-reading the spec.

## Where the AI was wrong

Worth recording, since the failures shaped the result more than the successes.

- **I mis-specced the amenities.** I told the builder the alarm rows were *not*
  struck through. The reference clearly strikes them. Caught on visual review,
  fixed in the data model with an `unavailable` flag rather than in the view.
- **A subagent caught my bug.** The hero agent flagged that `Container`'s
  `px-10` left only 1040px and would break the exact 1120px grid — a real
  defect in my own primitive. It built around it and said so; I fixed the
  primitive. Agents reporting spec problems beats agents silently complying.
- **The a11y agent stalled mid-refactor**, leaving a `data-photo-index`
  selector with no matching attribute. Finishing it by hand surfaced the
  session's worst bug (below). A stalled agent left the tree broken — worth
  knowing that "agent completed" is not the same as "code works".
- **The real bug neither of us specced.** `useDialog`'s effect depended on
  `onClose`, which callers rebuild from the URL on every navigation — so every
  arrow-key page tore the dialog down, re-ran scroll-lock and focus setup, and
  on close restored focus to a stale node. Found by testing the keyboard path
  end to end rather than by reading the code. Fixed by holding `onClose` in a
  ref so the effect depends only on `open`.

- **The worst one: the whole page was inert and it looked fine.** The user
  reported "no buttons work". Every check I had been running passed — the HTML
  was correct, the CSS was correct, screenshots matched the reference, and the
  build was clean. Counting hydrated nodes is what found it: **7 of 104 buttons
  had React attached.** Walking React's fiber tree from `<body>` showed it owned
  only the skip link and the router; `<main>` had no fiber at all. Reading
  search params via `useSearchParams` forces the enclosing Suspense boundary to
  bail out to client-only rendering, and that boundary never resolved — leaving
  the server HTML on screen, pixel-perfect and completely dead. Replaced with
  local state synced through the History API, which keeps deep links and the
  back button while removing anything that can gate hydration. All 104 buttons
  hydrate now.

  The lesson is the sharpest one in the run: **a screenshot cannot tell you
  whether a page is alive.** Visual verification silently passed a page where
  nothing worked. Interactivity needs its own assertion.

The pattern across all four: AI was fast at producing correct-looking code and
poor at noticing when the *specification* was wrong. Every real defect was
caught by running the thing and comparing it to the reference.

## Verification

Not "does it look right" — measured, at each step:

- Geometry compared numerically against the reference at matched viewports.
- **Hydration counted, not assumed** — asserting that every one of the 104
  buttons has React props attached, and that `<main>` is owned by a fiber. This
  check exists because its absence let a completely inert page pass review.
- Keyboard contract asserted in the live page: scroll lock engaged, background
  `inert`, Escape closes, focus restored to the trigger, focus handed back to
  the correct photo on return from the lightbox.
- `tsc --noEmit`, `eslint --max-warnings=0`, and `next build` all clean.
