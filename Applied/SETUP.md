# Applied Track Setup

All Applied projects run **offline on synthetic data** with no API key. Add a key to run them against a live model.

```bash
# from the repo root
python -m venv .venv && source .venv/bin/activate
pip install -r Applied/requirements.txt
jupyter lab
```

## Live mode (optional)
```bash
export ANTHROPIC_API_KEY=sk-ant-...        # or copy Applied/.env.example to Applied/.env and fill it in
```
`Applied/.env` is git-ignored. **Never commit keys, never paste them into notebooks.** Rotate any key that was ever committed or shared.

| Variable | Used by | Required? |
|---|---|---|
| `ANTHROPIC_API_KEY` | LIVE mode in Advanced/Agents/Applied | no (OFFLINE works without) |
| `AGENTKIT_OFFLINE=1` | force OFFLINE even if a key exists (tests, CI) | no |
| `AGENTKIT_MODEL` | override the default model (e.g. a cheaper one while learning) | no |
| `PINECONE_API_KEY` | AP10 managed vector DB variant | only for that variant |

## Check your setup
```bash
python -m pytest -q agentkit/tests        # unit tests for the helper library
python tools/nbtest.py "Agents/AG02*.ipynb"   # run a lesson offline
```
Costs: LIVE runs bill per token. Start with `AGENTKIT_MODEL` set to a small model, use `max_turns` guards, and watch `tracer.cost_usd`.
