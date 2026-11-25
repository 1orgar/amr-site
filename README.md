# Apple Music Remote (AMR) — Official Product Site (`amr-site`)

Interactive, zero-dependency static landing page for **[Apple Music Remote (AMR)](https://github.com/1orgar/amr)** built in AMR's signature **Pure OLED Monochrome + Signal-Path Telemetry** design system and ready for zero-config **GitHub Pages** deployment.

## Highlights

- **Interactive Multi-Device Showcase**: Synchronized live simulator across **iPhone 16 Pro** (OLED PWA, Signal Path, QR Invite, iOS Lock Screen & Dynamic Island), **65" 4K OLED TV** (`StandBy Mode` with live 60fps 32-band logarithmic RTA & animated 16-zone WLED DDP Ambilight), **iPad Pro / Desktop Split-View Console** (Roon-style Signal Path, 3-page Digital Booklet reader, and `512-D` Geodesic SLERP Sonic Bridge), and **macOS Native AppKit Settings**.
- **Interactive Acoustic & DSP Engineering Lab**:
  1. `4096-pt vDSP FFT` Fake Hi-Res Verifier (`22.05 kHz` / `24 kHz` brickwall & `24-bit LSB` padded-bit matrix).
  2. `64-Bit` Room Acoustic Auto-PEQ measured via iPhone MEMS mic against the Harman In-Room Target.
  3. `768 kHz HQ PCM NOS (LNS15)` vs `DSD256 7EC-Super` quantization noise-floor plot (`-168.4 dBFS`, `27+ effective bits`).
  4. `256-sample` look-ahead `C1` Cubic Hermite Mastering De-Clipper waveform oscilloscope.
- **Interactive 4-Stage System Architecture & API Playground**: Clickable 12-node Swift architecture schematic + WebSocket / REST / Home Assistant JSON explorer.
- **Verified Scannable Vector QR Codes**: Generated via Apple `CoreImage` (`CIQRCodeGenerator`) and verified with `Vision` (`VNDetectBarcodesRequest`).
- **Search Engine (SEO) & LLM / AI Search (GEO) Optimization**:
  - Rich `JSON-LD` `@graph` (`SoftwareApplication`, `WebSite`, `HowTo`, `FAQPage`), Open Graph `1200×630` PNG (`assets/og-cover.png`), Twitter Large Summary Card, `robots.txt`, and `sitemap.xml`.
  - First-class `llms.txt` and `llms-full.txt` following the `llmstxt.org` specification for ChatGPT, Claude, Perplexity, Gemini, and RAG crawlers.

## Local Preview

```bash
python3 -m http.server 8123 --directory .
# Open http://localhost:8123
```

## GitHub Pages Deployment

1. Push this repository to `https://github.com/1orgar/amr-site` (branch `main`).
2. In GitHub **Settings → Pages**, set **Source** to **GitHub Actions** (uses `.github/workflows/deploy-pages.yml`) *or* **Deploy from a branch (`main` / `/root`)** — `.nojekyll` and relative asset paths support both out of the box.
3. If you attach a custom domain later, update canonical/OG/sitemap URLs in one command:
   ```bash
   ./scripts/set-domain.sh https://amr.yourdomain.com
   ```
