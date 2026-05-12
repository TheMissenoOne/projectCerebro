# cerebro-crawler

Crawler + LLM tag processor for the Cérebro NPC seed.

Fetches Earth-616 character data from marvel.fandom.com, converts the power
grid to MEGS stats, and uses a local LLM via transformers.js to produce
clean Portuguese tag names.

---

## Setup

```bash
cd cerebro-crawler
ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm install
```

---

## Step 1 — Crawl the wiki

```bash
# All ~80 characters (takes ~2 min at 1.2s/request to avoid rate limits)
node crawl.js

# Single character test
node crawl.js --char "Wolverine"

# First 20 characters only
node crawl.js --limit 20

# Faster (risky — may get rate-limited)
node crawl.js --delay 600
```

Data is saved to `raw-data/<wiki_name>.json`.  
Already-crawled characters are **skipped** on re-run (safe to retry).

---

## Step 2 — Process with LLM

```bash
# Default: Qwen 2.5 1.5B (fast, CPU-friendly, ~1GB download)
node process.js

# Gemma 3 4B (better quality, ~4GB download, needs 8GB RAM)
node process.js --model=gemma

# Phi-3.5 mini (middle ground, ~2GB)
node process.js --model=phi

# No LLM — rule-based translation only (instant)
node process.js --no-llm

# Preview without writing files
node process.js --dry-run --no-llm

# Single character
node process.js --char "Wolverine"
```

Output: `output/seed-crawled.sql` and `output/sheets.json`

---

## Step 3 — Seed the database

**Option A — psql**
```bash
psql $DATABASE_URL -f output/seed-crawled.sql
```

**Option B — Supabase SQL Editor**  
Open the Supabase dashboard → SQL Editor → paste `output/seed-crawled.sql`.

**Option C — via npm script (if DATABASE_URL is set)**
```bash
npm run seed
```

---

## Power Grid → MEGS Conversion

Marvel wiki uses a 1–7 scale per category.  
MEGS uses a variable scale where ~6 = peak human, ~12 = major superhero.

| Wiki | MEGS | Example |
|------|------|---------|
| 1 | 2 | Civilian / impaired |
| 2 | 4 | Average human |
| 3 | 6 | Peak human |
| 4 | 8 | Low superhuman |
| 5 | 10 | Solid superhuman |
| 6 | 13 | High superhuman |
| 7 | 17 | Cosmic / absolute |

The 7 wiki attributes map to the 9 MEGS stats:

```
wiki Intelligence  → inteligência, vontade (vontade = int -1 tier)
wiki Strength      → força
wiki Strength+Durability → corpo (averaged, +1 if durability ≥ 6)
wiki Agility+Fighting → destreza (max of both)
wiki Speed         → destreza modifier + iniciativa
wiki Energy        → influência, aura
wiki Fighting+Durability → espírito (averaged)
```

---

## LLM Models

All models run locally via ONNX (CPU, no GPU required).

| Flag | Model | Size | Quality | RAM |
|------|-------|------|---------|-----|
| `--model=qwen` | Qwen2.5-1.5B-Instruct | ~1GB | Good | 4GB |
| `--model=gemma` | Gemma 3 4B | ~4GB | Best | 8GB |
| `--model=phi` | Phi-3.5-mini | ~2GB | Very good | 6GB |

First run downloads the model to `~/.cache/huggingface/`.  
Subsequent runs use the cache.

The LLM only converts tag text to Portuguese — all numeric grades are
computed by the rule-based `inferGrade()` function in `process.js`.

---

## Folder structure

```
cerebro-crawler/
├── crawl.js          — Marvel wiki crawler
├── process.js        — LLM tag cleaner + SQL writer
├── package.json
├── raw-data/         — Per-character JSON (created by crawl.js)
│   ├── Wolverine.json
│   └── ...
└── output/           — Final SQL + JSON (created by process.js)
    ├── seed-crawled.sql
    └── sheets.json
```
