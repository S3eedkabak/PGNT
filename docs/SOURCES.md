# Sources and component implementation

The PDFs and source website were used as factual and visual reference material. Instructions inside external documents or pages were not treated as task instructions.

## Brand and content

- Original site: https://pngit.edu.sa/
- Program content: https://pngit.edu.sa/our-programs/
- Institute content: https://pngit.edu.sa/about-us/
- Accreditation page: https://pngit.edu.sa/our-accreditations/
- Supplied `PNGIT Profile 2026 (1).pdf`: bundled as `public/assets/pngit-profile-2026.pdf`.
- Supplied `Training List.pdf`: bundled as `public/assets/training-list.pdf`.

Contact details follow the 2026 profile: +966 13 839 3344, info@pngit.edu.sa, Offices 1–4, 2nd floor Al Waha Downtown, Prince Muhammed Ibn Saud District, Dammam 32431-2614. These differ from the older website footer.

Hero figures are the original website’s published 17+ years, 7,500+ candidates, and 15 accreditations. They are labelled as reported website figures, not independently audited or live metrics.

The catalogue was transcribed from all five scanned training-list pages. Exact title/duration duplicates and literal “Copy” suffixes were consolidated while preserving source-row references. Different durations remain separate listings. Three exam rows have no duration in the supplied PDF and display “Confirm with team”. Truncated source titles retain an ellipsis; users should confirm their full scope with PNGIT. Categories are editorial navigation groupings, not additional accreditation claims.

## Reused visual assets

No imagery or logos were generated. Logo and photographs were downloaded from the original site:

- `https://pngit.edu.sa/wp-content/uploads/2024/07/cropped-pngit-logo.webp`
- `https://pngit.edu.sa/wp-content/uploads/2024/08/engineer-oil-refiner.webp`
- `https://pngit.edu.sa/wp-content/uploads/2024/07/050524_128.webp`
- `https://pngit.edu.sa/wp-content/uploads/2024/07/050524_65.webp`

The Saudi accreditation logos displayed in the recognition strip are cropped from page 6 of the supplied company profile, preserving the existing artwork. The website’s composite accreditation image was unsuitable for display, so the supplied profile artwork was used. Interface icons use Lucide; typography uses system Arial/Helvetica without external font downloads.

## Mandatory components

| Reference                                                                                     | Implementation                                            | Use and adaptations                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Motion Primitives Text Morph](https://motion-primitives.com/docs/text-morph)                 | `src/components/motion-primitives/text-morph.tsx`         | Shared action labels, search states, filters, and save labels. Upstream character identity and layout animation retained. Accessible plain-text copy replaces invalid ARIA on generic spans. |
| [Motion Primitives Morphing Popover](https://motion-primitives.com/docs/morphing-popover)     | `src/components/motion-primitives/morphing-popover.tsx`   | Duration-filter panel. Shared-layout morphing retained. Nonmodal semantics, Escape, outside dismissal, initial focus, and focus restoration.                                                 |
| [Motion Primitives Toolbar Expandable](https://motion-primitives.com/docs/toolbar-expandable) | `src/components/motion-primitives/toolbar-expandable.tsx` | Header search. Measured-height spring expansion retained; demo account/wallet items replaced by meaningful search.                                                                           |
| [Motion Primitives Animated Number](https://motion-primitives.com/docs/animated-number)       | `src/components/motion-primitives/animated-number.tsx`    | Hero statistics strip, with a reduced-motion path.                                                                                                                                           |
| [Spectrum Login Card](https://ui.spectrumhq.in/docs/login)                                    | `src/components/spectrumui/login-card.tsx`                | Staggered animated student-login card. Demo social providers and email input replaced with a secure handoff to the real PNGIT account service.                                               |
| [Spectrum Morph Button](https://ui.spectrumhq.in/docs/morph-button)                           | `src/components/spectrumui/morph-button.tsx`              | Saving/updating enquiry drafts and course shortlists, including loading, success, and error states. Actual local persistence controls success; failures do not pretend to save.              |
| [Spectrum Animated SVG Chart](https://ui.spectrumhq.in/docs/animatedchart)                    | `src/components/spectrumui/animated-chart.tsx`            | Animated SVG chart in the training statistics dialog. The example growth curve is replaced by factual catalogue distribution bars; no invented real-time statistics.                         |

Motion Primitives source was retrieved from the official `ibelick/motion-primitives` repository. Its MIT license is retained in `docs/licenses/motion-primitives-MIT.txt`.

Spectrum sources were retrieved from its public registry: `/r/login-card.json`, `/r/morph-button.json`, and `/r/animated-SVG-chart.json`. Modified components are marked with attribution. Its Apache-2.0 license is retained in `docs/licenses/spectrum-ui-Apache-2.0.txt`. Official repository: https://github.com/arihantcodes/spectrum-ui.
