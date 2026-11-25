#!/bin/bash
set -euo pipefail

# Updates canonical, Open Graph, JSON-LD, sitemap.xml, robots.txt, llms.txt, and writes CNAME.
# Accepts either a bare domain (e.g. amraudio.app) or full https URL (e.g. https://amraudio.app).
# Usage: ./scripts/set-domain.sh amraudio.app

if [ $# -lt 1 ]; then
  echo "Usage: $0 <domain-or-https-url>   (e.g. ./scripts/set-domain.sh amraudio.app)"
  exit 1
fi

RAW_INPUT="${1%/}"
if [[ "$RAW_INPUT" == http://* || "$RAW_INPUT" == https://* ]]; then
  NEW_BASE="$RAW_INPUT"
  HOST_ONLY="${RAW_INPUT#https://}"
  HOST_ONLY="${HOST_ONLY#http://}"
  HOST_ONLY="${HOST_ONLY%%/*}"
else
  HOST_ONLY="${RAW_INPUT%%/*}"
  NEW_BASE="https://$HOST_ONLY"
fi

SITE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# Detect current base URL from <link rel="canonical" href="...">
CURRENT_CANONICAL="$(sed -n 's/.*rel="canonical" href="\([^"]*\)".*/\1/p' "$SITE_DIR/index.html" | head -n 1)"
OLD_BASE="${CURRENT_CANONICAL%/}"

if [ -z "$OLD_BASE" ]; then
  OLD_BASE="https://1orgar.github.io/amr-site"
fi

for file in "$SITE_DIR/index.html" "$SITE_DIR/robots.txt" "$SITE_DIR/sitemap.xml" "$SITE_DIR/llms.txt" "$SITE_DIR/llms-full.txt"; do
  if [ -f "$file" ]; then
    OLD_BASE="$OLD_BASE" NEW_BASE="$NEW_BASE" python3 - "$file" << 'PY'
import os, pathlib, sys
p = pathlib.Path(sys.argv[1])
txt = p.read_text(encoding="utf-8")
txt = txt.replace(os.environ["OLD_BASE"], os.environ["NEW_BASE"])
p.write_text(txt, encoding="utf-8")
PY
    echo "[ok] Updated $(basename "$file"): $OLD_BASE -> $NEW_BASE"
  fi
done

if [[ "$HOST_ONLY" != *.github.io ]]; then
  printf "%s\n" "$HOST_ONLY" > "$SITE_DIR/CNAME"
  echo "[ok] Wrote CNAME -> $HOST_ONLY"
fi
