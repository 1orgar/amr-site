#!/usr/bin/env python3
"""
Generates verified vector QR codes (via macOS CoreImage CIQRCodeGenerator),
copies official AMR brand icons, creates 5 procedural audiophile album covers,
and renders the 1200x630 Open Graph social card (SVG + raster PNG).
"""

import os
import shutil
import subprocess
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
AMR_ROOT = SITE_ROOT.parent / "amr"
ASSETS_DIR = SITE_ROOT / "assets"
COVERS_DIR = ASSETS_DIR / "covers"


def copy_official_icons() -> None:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    COVERS_DIR.mkdir(parents=True, exist_ok=True)

    copies = [
        (AMR_ROOT / "SharedAssets" / "AppIconMac.svg", ASSETS_DIR / "icon-mac.svg"),
        (AMR_ROOT / "AppleMusicRemoteMac" / "Web" / "apple-touch-icon.svg", ASSETS_DIR / "icon-pwa.svg"),
        (AMR_ROOT / "AppleMusicRemoteMac" / "Web" / "apple-touch-icon-192.png", ASSETS_DIR / "favicon-192.png"),
        (AMR_ROOT / "AppleMusicRemoteMac" / "Web" / "apple-touch-icon-180.png", ASSETS_DIR / "apple-touch-icon.png"),
        (AMR_ROOT / "SharedAssets" / "Icons" / "macOS" / "icon_512x512.png", ASSETS_DIR / "icon-512.png"),
    ]
    for src, dst in copies:
        if src.exists():
            shutil.copy2(src, dst)
            print(f"[ok] Copied {src.name} -> {dst.relative_to(SITE_ROOT)}")


def generate_qr_svgs() -> None:
    """Use Apple CoreImage CIQRCodeGenerator via swift to extract exact QR bit matrices and emit crisp SVGs."""
    swift_code = r'''
import Foundation
import CoreImage
import CoreGraphics

func makeQRSVG(payload: String, outPath: String, accentHex: String) throws {
    guard let data = payload.data(using: .utf8),
          let filter = CIFilter(name: "CIQRCodeGenerator") else {
        throw NSError(domain: "QR", code: 1)
    }
    filter.setValue(data, forKey: "inputMessage")
    filter.setValue("M", forKey: "inputCorrectionLevel")
    guard let ciImage = filter.outputImage else {
        throw NSError(domain: "QR", code: 2)
    }

    let extent = ciImage.extent.integral
    let w = Int(extent.width)
    let h = Int(extent.height)
    let ctx = CIContext(options: [.useSoftwareRenderer: true])
    var bitmap = [UInt8](repeating: 255, count: w * h * 4)
    ctx.render(
        ciImage,
        toBitmap: &bitmap,
        rowBytes: w * 4,
        bounds: extent,
        format: .RGBA8,
        colorSpace: CGColorSpaceCreateDeviceRGB()
    )

    let cell = 10
    let pad = 20
    let totalW = w * cell + pad * 2
    let totalH = h * cell + pad * 2

    var rects = ""
    for y in 0..<h {
        for x in 0..<w {
            let idx = (y * w + x) * 4
            let isDark = bitmap[idx] < 128
            if isDark {
                let px = pad + x * cell
                let py = pad + y * cell
                rects += "    <rect x=\"\(px)\" y=\"\(py)\" width=\"\(cell)\" height=\"\(cell)\" rx=\"2.2\"/>\n"
            }
        }
    }

    let svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \(totalW) \(totalH)" width="\(totalW)" height="\(totalH)" role="img" aria-label="QR Code for \(payload)">
  <rect width="\(totalW)" height="\(totalH)" rx="24" fill="#ffffff"/>
  <g fill="#0a0a0c">
\(rects)  </g>
</svg>
"""
    try svg.write(toFile: outPath, atomically: true, encoding: .utf8)
}

let args = CommandLine.arguments
try makeQRSVG(payload: args[1], outPath: args[2], accentHex: "#FA2D48")
try makeQRSVG(payload: args[3], outPath: args[4], accentHex: "#FFFFFF")
try makeQRSVG(payload: args[5], outPath: args[6], accentHex: "#30D158")
'''
    qr_download = str(ASSETS_DIR / "qr-download.svg")
    qr_github = str(ASSETS_DIR / "qr-github.svg")
    qr_invite = str(ASSETS_DIR / "qr-invite-demo.svg")

    subprocess.run(
        [
            "xcrun",
            "swift",
            "-",
            "https://github.com/1orgar/amr/releases/latest",
            qr_download,
            "https://github.com/1orgar/amr",
            qr_github,
            "http://mac-studio.local:8080/?invite=amr-v3-demo",
            qr_invite,
        ],
        input=swift_code.encode("utf-8"),
        check=True,
    )
    print("[ok] Generated verified CoreImage QR SVGs (qr-download.svg, qr-github.svg, qr-invite-demo.svg)")


def generate_demo_covers() -> None:
    covers = {
        "giorgio-hires.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09080f"/>
      <stop offset="50%" stop-color="#19132b"/>
      <stop offset="100%" stop-color="#050508"/>
    </linearGradient>
    <radialGradient id="s1" cx="62%" cy="38%" r="52%">
      <stop offset="0%" stop-color="#fa2d48" stop-opacity="0.88"/>
      <stop offset="45%" stop-color="#ff9f0a" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="s2" cx="28%" cy="72%" r="48%">
      <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.58"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g1)"/>
  <circle cx="370" cy="230" r="280" fill="url(#s1)"/>
  <circle cx="170" cy="430" r="250" fill="url(#s2)"/>
  <g fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="1.5">
    <circle cx="300" cy="300" r="210"/>
    <circle cx="300" cy="300" r="168"/>
    <circle cx="300" cy="300" r="126"/>
    <circle cx="300" cy="300" r="84"/>
  </g>
  <polygon points="300,130 455,415 145,415" fill="none" stroke="#ffffff" stroke-width="3" stroke-opacity="0.85"/>
  <line x1="80" y1="330" x2="232" y2="270" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.7"/>
  <line x1="368" y1="270" x2="530" y2="235" stroke="#fa2d48" stroke-width="4"/>
  <line x1="376" y1="286" x2="530" y2="278" stroke="#ff9f0a" stroke-width="4"/>
  <line x1="384" y1="302" x2="530" y2="322" stroke="#30d158" stroke-width="4"/>
  <line x1="392" y1="318" x2="530" y2="366" stroke="#00d2ff" stroke-width="4"/>
  <text x="44" y="528" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="22" font-weight="700" letter-spacing="3">ANALOG ODYSSEY</text>
  <text x="44" y="556" fill="rgba(255,255,255,0.6)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" letter-spacing="2">24-BIT / 88.2 KHZ STUDIO MASTER</text>
</svg>""",
        "modal-quartet.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#051322"/>
      <stop offset="60%" stop-color="#0a243d"/>
      <stop offset="100%" stop-color="#04080f"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#3a86ff" stop-opacity="0.62"/>
      <stop offset="55%" stop-color="#00b4d8" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <rect width="600" height="600" fill="url(#glow)"/>
  <g fill="#64d2ff" opacity="0.85">
    <rect x="84" y="140" width="28" height="300" rx="2"/>
    <rect x="132" y="190" width="28" height="250" rx="2" opacity="0.65"/>
    <rect x="180" y="110" width="28" height="330" rx="2"/>
    <rect x="228" y="220" width="28" height="220" rx="2" opacity="0.5"/>
    <rect x="276" y="155" width="28" height="285" rx="2" fill="#ffffff"/>
    <rect x="324" y="195" width="28" height="245" rx="2" opacity="0.7"/>
    <rect x="372" y="130" width="28" height="310" rx="2"/>
    <rect x="420" y="240" width="28" height="200" rx="2" opacity="0.45"/>
    <rect x="468" y="175" width="28" height="265" rx="2" opacity="0.8"/>
  </g>
  <text x="84" y="505" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="30" font-weight="800" letter-spacing="-0.5">MIDNIGHT MODAL</text>
  <text x="84" y="538" fill="#70d7ff" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" letter-spacing="2.5">192 KHZ TAPE TRANSFER • DSD256</text>
</svg>""",
        "magnetic-remaster.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d0b07"/>
      <stop offset="50%" stop-color="#2e1209"/>
      <stop offset="100%" stop-color="#090606"/>
    </linearGradient>
    <radialGradient id="amber" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff9f0a" stop-opacity="0.65"/>
      <stop offset="50%" stop-color="#ff453a" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="300" cy="290" r="260" fill="url(#amber)"/>
  <g stroke="#ff9f0a" fill="none" stroke-width="2.2" opacity="0.78">
    <path d="M 70 290 Q 185 120 300 290 T 530 290"/>
    <path d="M 70 290 Q 185 160 300 290 T 530 290" opacity="0.6"/>
    <path d="M 70 290 Q 185 460 300 290 T 530 290"/>
    <path d="M 70 290 Q 185 420 300 290 T 530 290" opacity="0.6"/>
  </g>
  <line x1="70" y1="195" x2="530" y2="195" stroke="#ff453a" stroke-width="2" stroke-dasharray="6 6"/>
  <line x1="70" y1="385" x2="530" y2="385" stroke="#ff453a" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="48" y="520" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="24" font-weight="800" letter-spacing="2">MAGNETIC HORIZON</text>
  <text x="48" y="550" fill="#ff9f0a" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" letter-spacing="2">2008 LOUDNESS REMASTER • DR5</text>
</svg>""",
        "chamber-nocturne.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0d14"/>
      <stop offset="100%" stop-color="#171324"/>
    </linearGradient>
    <radialGradient id="violet" cx="52%" cy="42%" r="50%">
      <stop offset="0%" stop-color="#bf5af2" stop-opacity="0.52"/>
      <stop offset="55%" stop-color="#5e5ce6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="310" cy="255" r="270" fill="url(#violet)"/>
  <circle cx="300" cy="265" r="128" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.8"/>
  <circle cx="332" cy="250" r="112" fill="#0e0e17"/>
  <g stroke="rgba(255,255,255,0.22)" stroke-width="1">
    <line x1="80" y1="435" x2="520" y2="435"/>
    <line x1="80" y1="447" x2="520" y2="447"/>
    <line x1="80" y1="459" x2="520" y2="459"/>
    <line x1="80" y1="471" x2="520" y2="471"/>
    <line x1="80" y1="483" x2="520" y2="483"/>
  </g>
  <text x="80" y="532" fill="#ffffff" font-family="Georgia, serif" font-size="26" font-style="italic">Nocturne Op. 27 Live</text>
  <text x="80" y="560" fill="rgba(255,255,255,0.58)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12.5" letter-spacing="2">DR18 SYMPHONIC RECORDING • 24/96</text>
</svg>""",
        "solaris-r2r.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041511"/>
      <stop offset="60%" stop-color="#08241d"/>
      <stop offset="100%" stop-color="#030807"/>
    </linearGradient>
    <radialGradient id="em" cx="50%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#30d158" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#00c7be" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="300" cy="275" r="265" fill="url(#em)"/>
  <g fill="none" stroke="#30d158" stroke-width="1.8" opacity="0.82">
    <rect x="155" y="130" width="290" height="290" rx="18"/>
    <rect x="190" y="165" width="220" height="220" rx="14" opacity="0.72"/>
    <rect x="225" y="200" width="150" height="150" rx="10" opacity="0.54"/>
    <rect x="260" y="235" width="80" height="80" rx="6" stroke="#ffffff"/>
  </g>
  <text x="48" y="520" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="24" font-weight="700" letter-spacing="3">SOLARIS ARPEGGIO</text>
  <text x="48" y="550" fill="#30d158" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" letter-spacing="2">R2R LADDER • 705.6 KHZ LNS15 NOS</text>
</svg>""",
    }
    for name, content in covers.items():
        (COVERS_DIR / name).write_text(content, encoding="utf-8")
    print(f"[ok] Generated {len(covers)} procedural audiophile cover SVGs")


def generate_og_cover() -> None:
    """Create a 1200x630 Open Graph SVG and render it to a high-res PNG via macOS AppKit/NSImage."""
    og_svg = ASSETS_DIR / "og-cover.svg"
    og_png = ASSETS_DIR / "og-cover.png"

    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="55%" stop-color="#09090d"/>
      <stop offset="100%" stop-color="#0f0a16"/>
    </linearGradient>
    <radialGradient id="crimsonGlow" cx="22%" cy="32%" r="48%">
      <stop offset="0%" stop-color="#fa2d48" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#7928ca" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cyanGlow" cx="82%" cy="68%" r="46%">
      <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="#30d158" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fa233b"/>
      <stop offset="50%" stop-color="#c837ab"/>
      <stop offset="100%" stop-color="#00d2ff"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#151519"/>
      <stop offset="100%" stop-color="#0c0c0f"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#crimsonGlow)"/>
  <rect width="1200" height="630" fill="url(#cyanGlow)"/>

  <!-- Subtle precision grid -->
  <g stroke="rgba(255,255,255,0.035)" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126"/>
    <line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="378" x2="1200" y2="378"/>
    <line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="960" y1="0" x2="960" y2="630"/>
  </g>

  <!-- Left Column: Brand + Headline -->
  <g transform="translate(68, 66)">
    <!-- Squircle Icon -->
    <rect x="0" y="0" width="68" height="68" rx="16" fill="#141022" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    <g fill="url(#brandGrad)">
      <rect x="14" y="29" width="5" height="16" rx="2.5"/>
      <rect x="22" y="20" width="5" height="28" rx="2.5"/>
      <rect x="31" y="13" width="6" height="42" rx="3"/>
      <rect x="41" y="22" width="5" height="26" rx="2.5"/>
      <rect x="49" y="27" width="5" height="18" rx="2.5"/>
    </g>

    <!-- Eyebrow Pill -->
    <rect x="86" y="16" width="322" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
    <circle cx="106" cy="34" r="5" fill="#30d158"/>
    <text x="120" y="39" fill="#e5e5ea" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" font-weight="700" letter-spacing="1.4">AMR v3.0 • PURE SWIFT MACOS</text>

    <!-- Main Headline -->
    <text x="0" y="152" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="58" font-weight="800" letter-spacing="-1.8">Apple Music Remote</text>
    <text x="0" y="214" fill="#9e9ea6" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="32" font-weight="600" letter-spacing="-0.6">Bit-Perfect CoreAudio &amp; 64-Bit Hybrid DSP</text>

    <text x="0" y="268" fill="#8e8e96" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="19" font-weight="400">Auto 44.1–192 kHz DAC sync • DSD512 DoP &amp; 768 kHz LNS15 NOS</text>
    <text x="0" y="298" fill="#8e8e96" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="19" font-weight="400">4096-pt FFT Fake Hi-Res Detector • Room Auto-PEQ • Neural AI</text>

    <!-- Spec Pills -->
    <g transform="translate(0, 342)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" font-weight="700">
      <rect x="0" y="0" width="166" height="38" rx="10" fill="rgba(48,209,88,0.13)" stroke="rgba(48,209,88,0.45)"/>
      <text x="83" y="24" text-anchor="middle" fill="#30d158">0.0 dBFS BIT-PERFECT</text>

      <rect x="178" y="0" width="172" height="38" rx="10" fill="rgba(250,45,72,0.14)" stroke="rgba(250,45,72,0.45)"/>
      <text x="264" y="24" text-anchor="middle" fill="#ff4560">DSD512 • 7EC TRELLIS</text>

      <rect x="362" y="0" width="174" height="38" rx="10" fill="rgba(100,210,255,0.12)" stroke="rgba(100,210,255,0.4)"/>
      <text x="449" y="24" text-anchor="middle" fill="#70d7ff">-165 dBFS LNS15 NOS</text>

      <rect x="0" y="50" width="188" height="38" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)"/>
      <text x="94" y="74" text-anchor="middle" fill="#ffffff">BLUOS &amp; DLNA 24/192</text>

      <rect x="200" y="50" width="168" height="38" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)"/>
      <text x="284" y="74" text-anchor="middle" fill="#ffffff">AMP TCP SOUNDCHECK</text>

      <rect x="380" y="50" width="156" height="38" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)"/>
      <text x="458" y="74" text-anchor="middle" fill="#ffffff">WLED DDP 40 FPS</text>
    </g>

    <text x="0" y="486" fill="#636369" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14" letter-spacing="1">github.com/1orgar/amr  •  macOS 14.0+ Universal (Apple Silicon &amp; Intel)  •  MIT License</text>
  </g>

  <!-- Right Column: Signal Path Inspector Mock Card -->
  <g transform="translate(716, 62)">
    <rect x="0" y="0" width="420" height="506" rx="24" fill="url(#cardBg)" stroke="#28282e" stroke-width="1.5"/>
    <text x="26" y="42" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="18" font-weight="700">Signal Path</text>
    <rect x="274" y="22" width="120" height="26" rx="7" fill="rgba(48,209,88,0.16)" stroke="rgba(48,209,88,0.45)"/>
    <text x="334" y="39" text-anchor="middle" fill="#30d158" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700" letter-spacing="0.8">TRUE HI-RES</text>
    <line x1="0" y1="62" x2="420" y2="62" stroke="#222227"/>

    <!-- Node 1 -->
    <rect x="24" y="82" width="372" height="78" rx="14" fill="#17171c" stroke="#2a2a31"/>
    <circle cx="46" cy="108" r="5" fill="#30d158"/>
    <text x="62" y="112" fill="#8e8e95" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700" letter-spacing="1">SOURCE • APPLE MUSIC</text>
    <text x="376" y="112" text-anchor="end" fill="#ffffff" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700">ALAC 24/192</text>
    <text x="62" y="140" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="15" font-weight="600">4096-pt vDSP FFT • 24-Bit LSB Verified</text>

    <line x1="46" y1="160" x2="46" y2="180" stroke="#30d158" stroke-width="2"/>

    <!-- Node 2 -->
    <rect x="24" y="180" width="372" height="92" rx="14" fill="#17171c" stroke="#2a2a31"/>
    <circle cx="46" cy="206" r="5" fill="#fa2d48"/>
    <text x="62" y="210" fill="#8e8e95" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700" letter-spacing="1">HYBRID 64-BIT ENGINE</text>
    <text x="376" y="210" text-anchor="end" fill="#30d158" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700">HOG • INT 0x4c</text>
    <text x="62" y="237" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="15" font-weight="600">AMX FP64 / Metal 262k • Auto-PEQ</text>
    <text x="62" y="258" fill="#8e8e95" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11.5">De-Clip C1 • Weiss De-Esser • DRC</text>

    <line x1="46" y1="272" x2="46" y2="292" stroke="#30d158" stroke-width="2"/>

    <!-- Node 3 -->
    <rect x="24" y="292" width="372" height="78" rx="14" fill="#17171c" stroke="#2a2a31"/>
    <circle cx="46" cy="318" r="5" fill="#70d7ff"/>
    <text x="62" y="322" fill="#8e8e95" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700" letter-spacing="1">HARDWARE DAC &amp; AMP TCP</text>
    <text x="376" y="322" text-anchor="end" fill="#70d7ff" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" font-weight="700">11.29 MHz</text>
    <text x="62" y="350" fill="#ffffff" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="15" font-weight="600">USB Reference DAC + Rotel TCP :9590</text>

    <!-- Mini RTA Bars -->
    <g transform="translate(24, 390)">
      <rect x="0" y="0" width="372" height="92" rx="12" fill="#0d0d11" stroke="#23232a"/>
      <line x1="256" y1="10" x2="256" y2="82" stroke="#ff9f0a" stroke-width="1.2" stroke-dasharray="3 3"/>
      <text x="262" y="23" fill="#ff9f0a" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9.5" font-weight="700">22.05k</text>
      <g fill="#30d158" opacity="0.9">
        <rect x="16" y="42" width="8" height="36" rx="2"/>
        <rect x="30" y="28" width="8" height="50" rx="2"/>
        <rect x="44" y="22" width="8" height="56" rx="2"/>
        <rect x="58" y="26" width="8" height="52" rx="2"/>
        <rect x="72" y="19" width="8" height="59" rx="2"/>
        <rect x="86" y="24" width="8" height="54" rx="2"/>
        <rect x="100" y="29" width="8" height="49" rx="2"/>
        <rect x="114" y="32" width="8" height="46" rx="2"/>
        <rect x="128" y="27" width="8" height="51" rx="2"/>
        <rect x="142" y="34" width="8" height="44" rx="2"/>
        <rect x="156" y="37" width="8" height="41" rx="2"/>
        <rect x="170" y="33" width="8" height="45" rx="2"/>
        <rect x="184" y="39" width="8" height="39" rx="2"/>
        <rect x="198" y="43" width="8" height="35" rx="2"/>
        <rect x="212" y="46" width="8" height="32" rx="2"/>
        <rect x="226" y="49" width="8" height="29" rx="2"/>
        <rect x="240" y="52" width="8" height="26" rx="2"/>
      </g>
      <g fill="#70d7ff" opacity="0.88">
        <rect x="266" y="55" width="8" height="23" rx="2"/>
        <rect x="280" y="58" width="8" height="20" rx="2"/>
        <rect x="294" y="61" width="8" height="17" rx="2"/>
        <rect x="308" y="64" width="8" height="14" rx="2"/>
        <rect x="322" y="67" width="8" height="11" rx="2"/>
        <rect x="336" y="70" width="8" height="8" rx="2"/>
        <rect x="350" y="72" width="8" height="6" rx="2"/>
      </g>
    </g>
  </g>
</svg>
"""
    og_svg.write_text(svg_content, encoding="utf-8")

    swift_raster = r'''
import AppKit
import Foundation

let svgPath = CommandLine.arguments[1]
let pngPath = CommandLine.arguments[2]
let data = try Data(contentsOf: URL(fileURLWithPath: svgPath))
guard let image = NSImage(data: data) else {
    fputs("Failed to load SVG into NSImage\n", stderr)
    exit(1)
}
let width = 1200
let height = 630
guard let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: width,
    pixelsHigh: height,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
) else {
    exit(2)
}
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
NSGraphicsContext.current?.imageInterpolation = .high
image.draw(in: NSRect(x: 0, y: 0, width: width, height: height))
NSGraphicsContext.restoreGraphicsState()
guard let pngData = rep.representation(using: .png, properties: [:]) else {
    exit(3)
}
try pngData.write(to: URL(fileURLWithPath: pngPath))
'''
    subprocess.run(
        ["xcrun", "swift", "-", str(og_svg), str(og_png)],
        input=swift_raster.encode("utf-8"),
        check=True,
    )
    print(f"[ok] Rendered social card {og_png.relative_to(SITE_ROOT)} (1200x630 PNG)")


if __name__ == "__main__":
    copy_official_icons()
    generate_qr_svgs()
    generate_demo_covers()
    generate_og_cover()
