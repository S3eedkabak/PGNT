# PNGIT draft1 — good / bad / evaluation

Reviewed on 16 November 2026. This is a frontend rebrand prepared for the `draft1` branch, with no changes to the production PNGIT website.

## Good

| Area                 | Evaluation                                                                                                                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand                | Original PNGIT logo, teal `#11786f`, orange `#f06d23`, industrial photography, and source accreditation artwork retained. No generated imagery, custom display fonts, or decorative eyebrow copy.                            |
| Navigation           | Five primary destinations, an obvious course CTA, mobile menu, expandable search, native anchor navigation, and a keyboard skip link.                                                                                        |
| Course discovery     | 178 catalogue listings preserve all 195 original rows. Search supports ordinary names, punctuation, and WPR/H2S abbreviations. Categories, duration filters, saved courses, and “show more” keep the list manageable.        |
| Course confidence    | Details show the source duration, original row reference, source PDF link, and a direct enquiry action. No invented dates, fees, ratings, or seat availability.                                                              |
| Mandatory components | All seven references have actual source implementations and meaningful product use. Full mapping is in `SOURCES.md`.                                                                                                         |
| Accessibility        | Labelled controls, accessible static text beneath animated characters, native modal focus containment, Escape dismissal and focus restoration, nonmodal filter semantics, reduced-motion handling, and contrast corrections. |
| Responsive design    | Browser measurements at 320, 390, 768, 1024, and 1440 pixels showed page width equal to viewport width. Mobile menu, course details, search, and contact form were exercised.                                                |
| Honest persistence   | Save buttons reflect actual local writes and expose failure states. Enquiry drafts can be restored, updated, and cleared.                                                                                                    |

## Bad / remaining limitations

- **Authentication remains external.** The Spectrum login card connects to PNGIT’s existing student portal. It does not authenticate against a new backend. WordPress, LMS, and account migration are outside this draft.
- **Enquiries use email.** Visitors must have an email app configured and review/send the prepared message themselves. There is no CRM or server-side form delivery connected to this frontend.
- **No real-time statistics endpoint was exposed by the source site.** The animated chart shows actual catalogue distribution. Hero counters are clearly labelled as original-site reported figures; they are not independently verified current totals.
- **The scanned training list has source limitations.** Some titles are visibly truncated in the supplied PDF and stay marked with an ellipsis. Three exam listings have no stated duration. Their scope, current availability, fees, language, and prerequisites require confirmation by PNGIT.
- **Photography is reused deliberately.** The source website offers a limited relevant image selection, so some course cards share photographs. These are category illustrations, not evidence of a particular course session.
- **Saved items are device-local.** They do not sync to student accounts. Clearing browser storage removes saved courses and drafts.
- **The recognition strip reflects supplied source claims.** Current accreditation status and exact approval scopes should be confirmed by PNGIT before production launch.
- **Automated accessibility checks have limits.** The browser audit is not an independent accessibility certification or a full assistive-technology study.

## Checks performed

| Check                                      | Result                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Production TypeScript + Vite build         | Passed                                                                                                                       |
| Node regression tests                      | 8 passed                                                                                                                     |
| Dependency audit                           | 0 vulnerabilities                                                                                                            |
| Source-row coverage                        | All rows 1–195 represented exactly once in provenance                                                                        |
| Featured course verification               | WPR, NEBOSH IGC, CWQAP Electrical, Forklift Operator, First Aid/CPR/AED, and IOSH durations checked against source           |
| Desktop automated WCAG 2/2.1 A/AA audit    | Zero violations in the evaluated homepage state                                                                              |
| Mobile automated WCAG 2/2.1 A/AA audit     | Zero violations in the evaluated homepage state                                                                              |
| Student-login dialog audit                 | Zero violations in the evaluated dialog state                                                                                |
| Browser search                             | CWQAP returned six specialisations; WPR returned three listings                                                              |
| Duration filtering                         | One-day-or-less excludes three-day CWQAP courses; regression test prevents hour-based courses appearing as multi-day courses |
| Shortlist persistence                      | Saved course remained after reload and appeared in Saved filter; test item subsequently removed                              |
| Enquiry draft persistence                  | Saved, reloaded, restored, then cleared using the UI                                                                         |
| Modal keyboard behaviour                   | Initial focus on close control; Escape closes; focus returns to originating course button                                    |
| Mobile menu                                | Opens, exposes all destinations, closes after navigation                                                                     |
| Missing image / horizontal overflow checks | No missing loaded images; no horizontal page overflow at tested widths                                                       |

The first review found and corrected a Strict Mode dialog lifecycle issue, invalid ARIA on animated generic text, insufficient contrast, an overflowing off-screen accessibility label, the multi-day duration filter, and OCR row/duration mapping errors.

## Verdict

A review-ready rebrand with a complete course-discovery flow and the requested motion components. Before replacing the live site, PNGIT should confirm source content and connect any desired backend services. The branch itself is ready for design and implementation review.

## Visual review

- `screenshots/hero.jpg`: desktop first screen.
- `screenshots/desktop.jpg`: complete desktop page.
- `screenshots/mobile.jpg`: complete mobile page.
