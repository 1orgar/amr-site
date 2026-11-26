/* ==========================================================================
   AMR Interactive Data Store — Authentic v3.0 Telemetry, DSP & Architecture
   ========================================================================== */

window.AMR_DATA = {
  demoTracks: [
    {
      id: "giorgio",
      title: "Giorgio by Moroder (Studio Master)",
      artist: "Analog Odyssey Ensemble",
      album: "Random Access Sessions • Columbia",
      cover: "./assets/covers/giorgio-hires.svg",
      durationSec: 544,
      elapsedSec: 186,
      codec: "ALAC Hi-Res Lossless",
      formatShort: "24-bit / 88.2 kHz",
      dacRate: "88.2 kHz",
      drBadge: "DR14",
      verdict: "TRUE HI-RES",
      verdictClass: "green",
      ultrasonicDb: "-39.4 dBFS",
      cutoffKhz: "41.8 kHz",
      lsbBits: "24 / 24 Active",
      ampInfo: "Rotel TCP :9590 • Vol 54% • iTunNORM -1.8 dB (Crest +0.0 dB)",
      dspPreset: "builtin_passthrough",
      declipMode: "off",
      deesserMode: "off",
      drcMode: "off",
      visionBlobs: ["rgba(250, 45, 72, 0.25)", "rgba(0, 210, 255, 0.18)", "rgba(255, 159, 10, 0.16)"],
      wledColors: ["#fa2d48", "#ff9f0a", "#00d2ff"],
      tvGlow: "rgba(250, 45, 72, 0.26)",
      isFakeHiRes: false,
      booklet: {
        essayTitle: "Recording Analog Multi-Track & Custom Modular Consoles",
        essayBody: "Captured simultaneously onto 2-inch Studer A827 analog tape at 30 ips and high-resolution 24-bit / 88.2 kHz converters at Henson Recording Studios. Three distinct vintage vocal microphones (1960s Neumann U67, 1970s Sony C-800, and modern tube condenser) were switched dynamically across each historical era of the monologue.",
        tracks: [
          "01. Give Life Back to Studio — 4:34 • 24/88.2 • DR13",
          "02. Giorgio by Moroder — 9:04 • 24/88.2 • DR14 (Playing)",
          "03. Within Chamber — 3:48 • 24/88.2 • DR13",
          "04. Touch (Tape Epilogue) — 8:18 • 24/88.2 • DR14"
        ],
        credits: [
          { role: "Modular Synthesizer", name: "Moog IIIp Custom Rack" },
          { role: "Drums & Percussion", name: "Omar Hakim & JR Robinson" },
          { role: "Electric Bass", name: "Nathan East" },
          { role: "Mastering Engineer", name: "Bob Ludwig • Gateway Mastering" }
        ]
      }
    },
    {
      id: "modal",
      title: "Blue in Green (1959 3-Track Transfer)",
      artist: "Midnight Modal Quartet",
      album: "30th Street Church Tapes",
      cover: "./assets/covers/modal-quartet.svg",
      durationSec: 337,
      elapsedSec: 112,
      codec: "ALAC 24/192 → DSD256 DoP",
      formatShort: "DSD256 • 11.29 MHz",
      dacRate: "705.6 kHz DoP",
      drBadge: "DR15",
      verdict: "TRUE HI-RES",
      verdictClass: "green",
      ultrasonicDb: "-44.1 dBFS",
      cutoffKhz: "62.4 kHz",
      lsbBits: "24 / 24 Active",
      ampInfo: "Hegel TCP :50001 • Vol 48% • iTunNORM +0.9 dB • Hog + Int 0x4c",
      dspPreset: "builtin_dsd256_super_metal",
      declipMode: "off",
      deesserMode: "off",
      drcMode: "off",
      visionBlobs: ["rgba(58, 134, 255, 0.25)", "rgba(0, 180, 216, 0.2)", "rgba(80, 60, 190, 0.16)"],
      wledColors: ["#3a86ff", "#00d2ff", "#5e5ce6"],
      tvGlow: "rgba(58, 134, 255, 0.28)",
      isFakeHiRes: false,
      booklet: {
        essayTitle: "30th Street Studio Acoustics & Pre-Echo Tape Preservation",
        essayBody: "Transferred directly from original 3-track half-inch Presto master reels without digital noise reduction. AMR's Metal GPU 262,144-tap linear-phase Kaiser convolution and 7EC-Super (OBG 1.62, Trellis M=16) DSD256 modulator preserve the vast cathedral ceiling decay of Columbia's legendary 30th Street Studio.",
        tracks: [
          "01. So What (Modal Opening) — 9:22 • DSD256 • DR15",
          "02. Freddie Freeloader — 9:46 • DSD256 • DR14",
          "03. Blue in Green — 5:37 • DSD256 • DR15 (Playing)",
          "04. Flamenco Sketches — 9:26 • DSD256 • DR16"
        ],
        credits: [
          { role: "Muted Trumpet", name: "Harmon Stemless Mute" },
          { role: "Grand Piano", name: "Bill Evans (Voicing Lead)" },
          { role: "Upright Bass", name: "Paul Chambers" },
          { role: "Recording Engineer", name: "Fred Plaut • 3-Track Ampex" }
        ]
      }
    },
    {
      id: "magnetic",
      title: "Magnetic Horizon (2008 Brickwall Remaster)",
      artist: "Heavy Riff Collective",
      album: "Loudness Era Archives",
      cover: "./assets/covers/magnetic-remaster.svg",
      durationSec: 468,
      elapsedSec: 214,
      codec: "ALAC 24/96 (Upsampled CD)",
      formatShort: "24-bit / 96.0 kHz",
      dacRate: "96.0 kHz",
      drBadge: "DR5",
      verdict: "FAKE HI-RES • 22K CUT",
      verdictClass: "amber",
      ultrasonicDb: "-98.2 dBFS",
      cutoffKhz: "22.05 kHz",
      lsbBits: "16 / 24 Padded",
      ampInfo: "Rotel TCP :9590 • iTunNORM -10.6 dB + Crest Comp +2.4 dB → -8.2 dB",
      dspPreset: "builtin_dsd128_transient",
      declipMode: "studio",
      deesserMode: "gentle",
      drcMode: "off",
      visionBlobs: ["rgba(255, 159, 10, 0.25)", "rgba(255, 69, 58, 0.2)", "rgba(180, 60, 20, 0.16)"],
      wledColors: ["#ff9f0a", "#ff453a", "#ffd60a"],
      tvGlow: "rgba(255, 159, 10, 0.26)",
      isFakeHiRes: true,
      booklet: {
        essayTitle: "Case Study: Fake Hi-Res Detection & C1 Hermite Peak Restoration",
        essayBody: "Delivered in a 24-bit / 96 kHz container, yet AMR's 4096-point vDSP FFT exposes a razor-sharp 22.05 kHz Red Book brickwall cutoff and clipped 0.0 dBFS snare plateaus (DR5). Enabling Studio De-Clipper reconstructs +3.8 dB of transient crest via cubic Hermite C1 splines while Crest Compensation prevents lifeless volume collapse.",
        tracks: [
          "01. That Was Just Your Limit — 7:08 • DR5 • De-Clip +3.9 dB",
          "02. Magnetic Horizon — 7:48 • DR5 • De-Clip +3.8 dB (Playing)",
          "03. Broken Beat & Scarred — 6:25 • DR5 • De-Clip +3.6 dB",
          "04. Cyanide Pulse — 6:39 • DR5 • De-Clip +4.1 dB"
        ],
        credits: [
          { role: "Spectral Verdict", name: "22.05 kHz Brickwall Detected" },
          { role: "De-Clipper Gain", name: "+3.8 dB C1 Hermite Restored" },
          { role: "Weiss De-Esser", name: "-2.9 dB Cymbal Harshness Tamed" },
          { role: "Amp Crest Guard", name: "+2.4 dB Subjective Punch Restored" }
        ]
      }
    },
    {
      id: "nocturne",
      title: "Nocturne Op. 27 & Symphonic Adagio (Live)",
      artist: "Nordic Chamber Philharmonia",
      album: "Oslo Concert Hall • DXD Master",
      cover: "./assets/covers/chamber-nocturne.svg",
      durationSec: 412,
      elapsedSec: 94,
      codec: "ALAC Hi-Res Lossless",
      formatShort: "24-bit / 96.0 kHz",
      dacRate: "96.0 kHz",
      drBadge: "DR18",
      verdict: "TRUE HI-RES",
      verdictClass: "green",
      ultrasonicDb: "-46.0 dBFS",
      cutoffKhz: "45.6 kHz",
      lsbBits: "24 / 24 Active",
      ampInfo: "Lyngdorf TCP :84 • Vol 32% • Night Concert DRC (+8.4 dB Lift)",
      dspPreset: "builtin_passthrough",
      declipMode: "auto",
      deesserMode: "off",
      drcMode: "concert",
      visionBlobs: ["rgba(191, 90, 242, 0.24)", "rgba(94, 92, 230, 0.2)", "rgba(112, 215, 255, 0.14)"],
      wledColors: ["#bf5af2", "#5e5ce6", "#70d7ff"],
      tvGlow: "rgba(191, 90, 242, 0.25)",
      isFakeHiRes: false,
      booklet: {
        essayTitle: "Wide-Dynamic Symphonic Listening at Midnight (DR18)",
        essayBody: "Minimalist Blumlein pair recording with a 36 dB span between -42 LUFS solo strings and -6 LUFS orchestral tutti. AMR's ITU-R BS.1770 K-Weighted Night Concert DRC gently lifts pianissimo whispers by +8.4 dB while engaging a -63 dBFS Hermite silence gate so hall pauses never pump background noise.",
        tracks: [
          "01. Prelude in E Minor — 4:18 • 24/96 • DR17",
          "02. Nocturne Op. 27 Adagio — 6:52 • 24/96 • DR18 (Playing)",
          "03. Cello Elegy in D — 5:44 • 24/96 • DR19",
          "04. Symphony No. 5 Adagietto — 9:58 • 24/96 • DR18"
        ],
        credits: [
          { role: "Main Stereo Array", name: "Schoeps MK2S Decca Tree" },
          { role: "A/D Conversion", name: "Merging Horus DXD 352.8 kHz" },
          { role: "Late-Night DRC", name: "+8.4 dB Upward • -1.0 dBTP Guard" },
          { role: "Smart De-Clipper", name: "Auto-Bypassed (DR18 Clean)" }
        ]
      }
    },
    {
      id: "solaris",
      title: "Solaris Arpeggio (Berlin Sequencer Session)",
      artist: "Kosmische Modular Lab",
      album: "Phaedra & Sub-Bass Studies",
      cover: "./assets/covers/solaris-r2r.svg",
      durationSec: 495,
      elapsedSec: 268,
      codec: "ALAC 16/44.1 → 705.6k LNS15 NOS",
      formatShort: "HQ PCM NOS 705.6k",
      dacRate: "705.6 kHz Int24",
      drBadge: "DR12",
      verdict: "CD LOSSLESS",
      verdictClass: "cyan",
      ultrasonicDb: "-84.0 dBFS",
      cutoffKhz: "22.05 kHz",
      lsbBits: "16 / 16 Red Book",
      ampInfo: "Holo Audio Spring 3 R2R NOS • AMX FP64 65k • LNS15 -168 dBFS",
      dspPreset: "builtin_hq_nos_r2r",
      declipMode: "off",
      deesserMode: "off",
      drcMode: "off",
      visionBlobs: ["rgba(48, 209, 88, 0.22)", "rgba(0, 199, 190, 0.19)", "rgba(58, 134, 255, 0.14)"],
      wledColors: ["#30d158", "#00c7be", "#70d7ff"],
      tvGlow: "rgba(48, 209, 88, 0.24)",
      isFakeHiRes: false,
      booklet: {
        essayTitle: "Driving Ladder R2R NOS DACs to 27+ Effective Bits",
        essayBody: "True R2R ladder DACs in Non-Oversampling (NOS) mode disable internal chip interpolators, exposing ultrasonic imaging aliases if fed raw 44.1 kHz. AMR's AMX FP64 65,536-tap minimum-phase filter upsamples 16x to 705.6 kHz and applies 15th-order Lipshitz LNS15 noise shaping—pushing audible quantization noise below -168 dBFS.",
        tracks: [
          "01. Tangram Sequence I — 8:02 • 705.6k NOS • DR12",
          "02. Solaris Arpeggio — 8:15 • 705.6k NOS • DR12 (Playing)",
          "03. Stratosfear Pulse — 7:12 • 705.6k NOS • DR13",
          "04. Rubycon Sub-Harmonic — 10:04 • 705.6k NOS • DR13"
        ],
        credits: [
          { role: "Target Hardware", name: "Holo Audio / Denafrips R2R NOS" },
          { role: "Oversampler Kernel", name: "Apple AMX FP64 (65,536 Taps)" },
          { role: "Noise Shaper", name: "LNS15 15th-Order (-168 dBFS)" },
          { role: "Phase Topology", name: "Kolmogorov Minimum-Phase (0% Pre)" }
        ]
      }
    }
  ],

  sonicBridges: [
    {
      label: "🎷 Miles Davis → 🤖 Daft Punk",
      from: "Miles Davis — Blue in Green",
      to: "Daft Punk — Veridis Quo",
      steps: [
        { step: "01 • Anchor A", track: "Miles Davis — Blue in Green", sim: "0.00 rad" },
        { step: "02 • SLERP 0.18", track: "Bill Evans — Peace Piece", sim: "0.94 cos" },
        { step: "03 • SLERP 0.36", track: "Bohren & der Club of Gore — Prowler", sim: "0.91 cos" },
        { step: "04 • SLERP 0.54", track: "Nils Frahm — My Friend the Forest", sim: "0.89 cos" },
        { step: "05 • SLERP 0.72", track: "Air — La Femme d'Argent", sim: "0.92 cos" },
        { step: "06 • Anchor B", track: "Daft Punk — Veridis Quo", sim: "1.00 target" }
      ]
    },
    {
      label: "🎹 Nils Frahm → 🔊 Massive Attack",
      from: "Nils Frahm — Says",
      to: "Massive Attack — Angel",
      steps: [
        { step: "01 • Anchor A", track: "Nils Frahm — Says", sim: "0.00 rad" },
        { step: "02 • SLERP 0.20", track: "Olafur Arnalds — Near Light", sim: "0.95 cos" },
        { step: "03 • SLERP 0.40", track: "Kiasmos — Looped", sim: "0.92 cos" },
        { step: "04 • SLERP 0.60", track: "Portishead — Roads", sim: "0.90 cos" },
        { step: "05 • SLERP 0.80", track: "Tricky — Overcome", sim: "0.93 cos" },
        { step: "06 • Anchor B", track: "Massive Attack — Angel", sim: "1.00 target" }
      ]
    },
    {
      label: "🎸 Pink Floyd → 🌧️ Burial",
      from: "Pink Floyd — Shine On You Crazy Diamond",
      to: "Burial — Archangel",
      steps: [
        { step: "01 • Anchor A", track: "Pink Floyd — Shine On", sim: "0.00 rad" },
        { step: "02 • SLERP 0.20", track: "Vangelis — Blush Response", sim: "0.91 cos" },
        { step: "03 • SLERP 0.40", track: "Brian Eno — An Ending (Ascent)", sim: "0.89 cos" },
        { step: "04 • SLERP 0.60", track: "Boards of Canada — Dayvan Cowboy", sim: "0.90 cos" },
        { step: "05 • SLERP 0.80", track: "Clubroot — Low Pressure Zone", sim: "0.93 cos" },
        { step: "06 • Anchor B", track: "Burial — Archangel", sim: "1.00 target" }
      ]
    }
  ],

  spectralProfiles: {
    true_hires: {
      badge: "TRUE HI-RES",
      badgeClass: "green",
      container: "24-bit / 192.0 kHz ALAC",
      cutoff: "68.4 kHz (-60 dB)",
      ultrasonic: "-38.6 dBFS (>22.05k)",
      activeBits: 24,
      note: "Continuous harmonic overtones extend smoothly past 22.05 kHz up to 70+ kHz with full 24-bit LSB thermal entropy.",
      curve: [86, 90, 88, 85, 83, 80, 77, 74, 71, 68, 64, 60, 56, 51, 46, 40, 35, 29, 23, 18, 13, 9]
    },
    fake_22k: {
      badge: "FAKE HI-RES • 22K CUT",
      badgeClass: "amber",
      container: "24-bit / 96.0 kHz ALAC",
      cutoff: "22.05 kHz Brickwall",
      ultrasonic: "-99.4 dBFS (Noise Floor)",
      activeBits: 24,
      note: "44.1 kHz Red Book master upsampled into a 96 kHz wrapper: energy plunges 65 dB vertically at the 22.05 kHz Nyquist wall.",
      curve: [86, 89, 87, 84, 82, 79, 75, 72, 68, 63, 58, 52, 9, 4, 3, 3, 2, 2, 2, 2, 2, 2]
    },
    upsampled_48k: {
      badge: "UPSAMPLED 48K",
      badgeClass: "amber",
      container: "24-bit / 192.0 kHz ALAC",
      cutoff: "24.00 kHz Brickwall",
      ultrasonic: "-95.1 dBFS (>24.0k)",
      activeBits: 24,
      note: "48 kHz studio stem resampled into 192 kHz: sharp brickwall filter cutoff detected precisely at 24.0 kHz.",
      curve: [85, 88, 86, 84, 81, 78, 75, 71, 67, 63, 59, 54, 48, 10, 4, 3, 3, 2, 2, 2, 2, 2]
    },
    padded_16bit: {
      badge: "16-BIT PADDED",
      badgeClass: "amber",
      container: "24-bit / 44.1 kHz ALAC",
      cutoff: "21.8 kHz",
      ultrasonic: "N/A (44.1 kHz Grid)",
      activeBits: 16,
      note: "Delivered as 24-bit, but bitwise LSB inspection reveals bits 17–24 (LSB 0..7) are permanently stuck at 0x00.",
      curve: [84, 88, 86, 83, 80, 77, 73, 69, 65, 60, 55, 49, 6, 3, 2, 2, 2, 2, 2, 2, 2, 2]
    },
    cd_lossless: {
      badge: "CD LOSSLESS",
      badgeClass: "cyan",
      container: "16-bit / 44.1 kHz ALAC",
      cutoff: "21.9 kHz Red Book",
      ultrasonic: "N/A (Native 44.1k)",
      activeBits: 16,
      note: "Honest 16-bit / 44.1 kHz Red Book lossless stream with DAC hardware locked to 44,100 Hz bit-for-bit.",
      curve: [85, 88, 87, 84, 81, 78, 74, 70, 66, 61, 56, 50, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    }
  },

  roomProfiles: {
    living_room: {
      name: "Living Room (48 Hz Concrete Mode)",
      preamp: "-3.6 dB FP64 Preamp",
      measured: [46, 20, 14, 52, 68, 42, 54, 49, 56, 53, 59, 64, 67, 72],
      target:   [43, 43, 44, 47, 50, 52, 52, 52, 54, 57, 60, 63, 66, 69],
      corrected:[44, 41, 42, 48, 53, 51, 52, 51, 54, 56, 60, 63, 66, 69],
      pills: [
        "48 Hz  -8.4 dB  Q 3.2",
        "118 Hz  +3.1 dB  Q 1.3",
        "245 Hz  -3.6 dB  Q 2.4",
        "3.4 kHz  -1.8 dB  Q 1.7",
        "Preamp  -3.6 dB (64-bit)"
      ]
    },
    desk_studio: {
      name: "Nearfield Desk (135 Hz Console Bounce)",
      preamp: "-2.8 dB FP64 Preamp",
      measured: [52, 48, 45, 22, 34, 64, 53, 46, 52, 58, 54, 62, 66, 70],
      target:   [43, 43, 44, 47, 50, 52, 52, 52, 54, 57, 60, 63, 66, 69],
      corrected:[45, 44, 44, 46, 49, 53, 52, 51, 54, 57, 59, 63, 66, 69],
      pills: [
        "135 Hz  -7.2 dB  Q 2.9",
        "290 Hz  +2.3 dB  Q 1.4",
        "1.1 kHz  -2.1 dB  Q 2.1",
        "Preamp  -2.8 dB (64-bit)"
      ]
    },
    open_loft: {
      name: "Asymmetric Loft (Glass Reflections)",
      preamp: "-3.9 dB FP64 Preamp",
      measured: [58, 34, 48, 56, 51, 49, 55, 44, 38, 43, 55, 61, 65, 71],
      target:   [43, 43, 44, 47, 50, 52, 52, 52, 54, 57, 60, 63, 66, 69],
      corrected:[46, 42, 45, 49, 50, 51, 53, 51, 53, 56, 59, 63, 66, 69],
      pills: [
        "38 Hz  +3.4 dB  Q 1.2",
        "62 Hz  -4.2 dB  Q 3.0",
        "2.8 kHz  -5.4 dB  Q 2.2",
        "6.2 kHz  -3.1 dB  Q 1.8",
        "Preamp  -3.9 dB (64-bit)"
      ]
    }
  },

  noiseProfiles: {
    lns15: {
      badge: "27.4 EFFECTIVE BITS • -168 dBFS",
      floor2k: "-168.4 dBFS",
      carrier: "705.6 / 768 kHz Int24",
      shaper: "15th-Order Lipshitz LNS15",
      points: [132, 136, 144, 158, 168, 164, 152, 134, 106, 82, 64, 52],
      color: "#70d7ff",
      desc: "Excavates quantization noise out of the 1–6 kHz human ear sensitivity zone and shifts energy safely past 100 kHz for R2R ladder NOS DACs."
    },
    dsd256: {
      badge: ">156 dB SNR • 1-BIT SDM",
      floor2k: "-157.2 dBFS",
      carrier: "11.2896 MHz (DoP 705.6k)",
      shaper: "7EC-Super (OBG 1.62) + Trellis M=16",
      points: [148, 150, 152, 155, 156, 153, 146, 130, 98, 68, 46, 36],
      color: "#fa2d48",
      desc: "7th-order Chebyshev NTF zeros with 16-state Viterbi trellis look-ahead and ISI regularization eliminate idle tones across 20 Hz – 20 kHz."
    },
    tpdf24: {
      badge: "24.0 BITS • FLAT WHITE FLOOR",
      floor2k: "-144.0 dBFS",
      carrier: "44.1 – 768 kHz PCM",
      shaper: "Linear 24-Bit TPDF PRNG",
      points: [122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122],
      color: "#30d158",
      desc: "Zero-distortion triangular probability density dither with a completely flat, analog-tape-like white noise floor and zero ultrasonic rise."
    },
    pcm16: {
      badge: "16.0 BITS • RED BOOK BASELINE",
      floor2k: "-96.3 dBFS",
      carrier: "44.1 kHz / 16-Bit",
      shaper: "Standard 16-Bit TPDF",
      points: [68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68],
      color: "#8e8e98",
      desc: "Classic CD 16-bit baseline (-96 dBFS). Shown as a reference against 24-bit TPDF (-144 dBFS) and 768 kHz LNS15 (-168 dBFS)."
    }
  },

  archNodes: {
    pwa: {
      title: "Zero-Install OLED PWA & Per-Device Auth",
      summary: "Persistent WebSocket remote for iPhone, iPad, Android, Desktop & 4K Smart TVs with triple-stored device UID (Cookie + localStorage + CacheStorage), per-device Lock Screen MediaSession toggles, and camera QR invites.",
      framework: "Network.framework + WebKit PWA",
      threading: "Async NWListener (:8080)",
      latency: "< 15 ms Optimistic IPC",
      protocol: "WS / HTTP • ?invite=<token>"
    },
    ane: {
      title: "Apple Neural Engine Curator & 512-D Sonic Bridge",
      summary: "100% on-device AI curation using FoundationModels, 512-dimensional NaturalLanguage NLEmbedding spherical SLERP trajectories, Infinite AI Wave auto-queuing, and Vision attention saliency palette extraction.",
      framework: "FoundationModels • NaturalLanguage • Vision",
      threading: "ANE Hardware Offload (0% RT impact)",
      latency: "512-D Cosine & SLERP",
      protocol: "Auto-hidden on Intel x86_64"
    },
    upnp_in: {
      title: "UPnP / DLNA MediaRenderer & Home Assistant Ducking",
      summary: "Exposes Mac Apple Music as a standard UPnP AVTransport / RenderingControl endpoint on LAN with SSDP auto-discovery and smooth /api/duck TTS voice-announcement attenuation.",
      framework: "SSDP + XML SOAP + REST",
      threading: "Dedicated Control Queue",
      latency: "Smooth Cosine Volume Ramp",
      protocol: "TCP :8090 & POST /api/duck"
    },
    bridge: {
      title: "MusicBridge, MusicKit JWT & iTunesLibrary",
      summary: "Hybrid control layer combining AppleEvents/ScriptingBridge, native iTunesLibrary framework catalog reads, Keychain-backed ES256 MusicKit tokens, and proactive MusicAppLifecycleManager hang recovery.",
      framework: "ScriptingBridge • iTunesLibrary • CryptoKit",
      threading: "Non-blocking Actor / Watchdog",
      latency: "Two-tier ~15 ms state poller",
      protocol: "Auto Storefront & PDFKit Booklets"
    },
    tap: {
      title: "AudioProcessTapService & C11 Lock-Free SPSC Ring",
      summary: "Taps Music.app PCM directly via macOS CoreAudio Process Tap without virtual audio cables. Uses C11 atomic SPSC ring buffers with zero heap allocations and zero locks inside the Real-Time IOProc.",
      framework: "CoreAudio AudioHardwareCreateProcessTap",
      threading: "RT IOProc + CAtomicPrimitives",
      latency: "Zero-Copy Planar Float32",
      protocol: "44.1 – 192 kHz Native PCM"
    },
    spectral: {
      title: "SpectralIntegrityAnalyzer (4096-pt vDSP FFT)",
      summary: "Runs continuous Hann-windowed real FFT and bitwise LSB 0..7 inspection to expose fake upsampled tracks, feeding 60fps 32-band RTA telemetry and persistent two-tier validation caches.",
      framework: "Accelerate / vDSP_fft_zrip",
      threading: "SIMD Vectorized Non-Blocking",
      latency: "60 FPS 32-Band 20 Hz – 96 kHz",
      protocol: "5 Verdicts + iCloud Cache Sync"
    },
    predsp: {
      title: "64-Bit Pre-DSP: De-Clipper, Weiss De-Esser, Auto-PEQ & DRC",
      summary: "Sequential Float64 studio chain: 256-sample look-ahead C1 Hermite De-Clipper, Sibilance-to-Body Weiss De-Esser, 8-band Harman Room Auto-PEQ (measured via iPhone mic), and BS.1770 K-Weighted Late-Night DRC.",
      framework: "64-Bit IEEE-754 Float64",
      threading: "Unified Zero-Copy Pass",
      latency: "100% Unloaded When Off",
      protocol: "USB DAC + Passthrough + DLNA"
    },
    hybrid_dsp: {
      title: "AMX FP64 / Metal GPU df64 → 7EC DSD256 & LNS15 NOS",
      summary: "65,536-tap AMX polyphase FIR or 262,144-tap Metal GPU Overlap-Save Kaiser convolution feeding a 7th-order 7EC Viterbi Trellis (M=16) DSD64–256 DoP modulator or 768 kHz LNS15 psychoacoustic shaper.",
      framework: "Accelerate AMX • Metal GPU Shaders",
      threading: "Dedicated High-Priority DSP Worker",
      latency: "> 155 dB Image Rejection",
      protocol: "DoP v1.1 (0x05/0xFA) & 768k NOS"
    },
    hal_dac: {
      title: "CoreAudio HAL Exclusive Hog + Integer 0x4c & Muting Guard",
      summary: "Locks USB/I2S/S/PDIF/Thunderbolt DAC sample rate bit-for-bit, bypasses coreaudiod float mixing via Non-Mixable Signed Integer (0x4c), and sequences 3-stage click-free relay muting during PLL lock.",
      framework: "CoreAudio HAL • AudioToolbox",
      threading: "Hardware Clock Driven",
      latency: "0.0 dBFS Bit-Perfect",
      protocol: "44.1 – 768 kHz PCM / DSD256 DoP"
    },
    amp_tcp: {
      title: "ExternalAmpTCPController & Hardware SoundCheck",
      summary: "Controls Rotel, Denon/Marantz, Hegel, NAD, and Lyngdorf attenuators over TCP while keeping Mac audio 100% Bit-Perfect, applying iTunNORM + BS.1770 loudness and psychoacoustic Crest Compensation.",
      framework: "NWConnection Persistent TCP",
      threading: "Bidirectional Hardware Poller",
      latency: "Zero-Jump & Max-Cap Guards",
      protocol: "Ports :9590 :23 :50001 :30000 :84"
    },
    bluos: {
      title: "BluOS & UPnP/DLNA 24-Bit / 192 kHz Stream Relay",
      summary: "Streams uncompressed 16/24-bit LPCM WAV up to 192 kHz with TPDF dithering directly to Bluesound NODE/POWERNODE, Eversolo, Wiim, and Volumio with bidirectional transport sync.",
      framework: "HTTP Chunked WAV + UPnP Control",
      threading: "Lock-Free Stream Drain Queue",
      latency: "Auto Hog-Mode Suspend/Resume",
      protocol: "GET /stream/live.wav (24/192)"
    },
    wled: {
      title: "16-Zone WLED DDP Hardware Ambilight",
      summary: "Streams 40 FPS gamma-corrected (γ = 2.4) 16-zone Vision Saliency album palettes and 5 real-time audio-reactive modes over Distributed Display Protocol with smooth 2.5s pause fade-out.",
      framework: "UDP Network.framework + vDSP",
      threading: "Real-Time Frame Tap Feed",
      latency: "< 2 ms LAN UDP Dispatch",
      protocol: "DDP UDP Port :4048 (40 FPS)"
    }
  },

  apiExamples: {
    status: `// GET http://mac-mini.local:8080/api/status
{
  "state": "playing",
  "track": {
    "title": "Giorgio by Moroder",
    "artist": "Daft Punk",
    "codec": "ALAC Hi-Res Lossless",
    "sampleRate": 88200,
    "bitDepth": 24,
    "dr": 14
  },
  "dac": {
    "device": "Holo Audio Spring 3 USB",
    "nominalRate": 705600,
    "mode": "HQ_PCM_NOS_LNS15",
    "hogMode": true,
    "integerMode": "0x4c"
  },
  "spectral": {
    "verdict": "TRUE_HI_RES",
    "cutoffHz": 41800,
    "ultrasonicDb": -39.4
  },
  "amplifier": {
    "model": "Rotel TCP :9590",
    "volume": 54,
    "soundCheckDb": -1.8
  }
}`,
    ws_bridge: `// WebSocket ws://mac-mini.local:8080
{
  "action": "build_sonic_bridge",
  "id": "req-bridge-42",
  "params": {
    "from": "Miles Davis — Blue in Green",
    "to": "Daft Punk — Veridis Quo",
    "steps": 12,
    "space": "NLEmbedding_512D_SLERP",
    "autoplay": true
  }
}`,
    ws_dsp: `// WebSocket ws://mac-mini.local:8080
{
  "action": "set_dsp_pipeline",
  "id": "req-dsp-07",
  "params": {
    "preset": "builtin_dsd256_super_metal",
    "deClipMode": "auto",
    "deEsserMode": "gentle",
    "roomEqEnabled": true,
    "roomProfile": "Living RoomHarman",
    "lateNightDrc": "off"
  }
}`,
    ha_duck: `// Home Assistant Automation -> REST Audio Ducking
POST http://mac-mini.local:8080/api/duck
Content-Type: application/json

{
  "targetAttenuationDb": -14.0,
  "rampMs": 280,
  "reason": "home_assistant_tts_announcement"
}
// Restores exact bit-perfect / TCP amp level via POST /api/unduck`
  }
};
