#!/usr/bin/env python3
"""Build .ipynb from a percent-format .py file (the format VS Code / Jupytext use).

    # %% [markdown]        -> markdown cell (each line prefixed with '# ')
    # %%                   -> code cell
    # %% [setup]           -> the standard Agents/Applied setup cell (finds repo root, loads .env, prints LIVE/OFFLINE)

Usage: nbbuild.py lesson.py "Agents/AG02 - The Agent Loop.ipynb"
"""
import sys, re, pathlib
import nbformat
from nbformat.v4 import new_notebook, new_markdown_cell, new_code_cell

SETUP = '''# Setup: runs LIVE with ANTHROPIC_API_KEY, otherwise OFFLINE (scripted replay, free)
import sys, pathlib, subprocess
_find = lambda: next((p for p in [pathlib.Path.cwd(), *pathlib.Path.cwd().parents] if (p / "agentkit").is_dir()), None)
_root = _find()
if _root is None:                        # Colab / standalone download: fetch the repo helper package
    subprocess.run(["git", "clone", "-q", "--depth", "1", "https://github.com/nexageapps/AI.git", "_ai_repo"], check=False)
    _root = pathlib.Path("_ai_repo").resolve()
sys.path.insert(0, str(_root))
from agentkit import setup
setup()'''


def parse(src: str):
    cells, cur, kind = [], [], None
    def flush():
        nonlocal cur, kind
        if kind is None: return
        body = "\n".join(cur).strip("\n")
        if kind == "markdown":
            body = "\n".join(re.sub(r"^# ?", "", l) for l in body.split("\n"))
            cells.append(new_markdown_cell(body))
        elif kind == "setup":
            cells.append(new_code_cell(SETUP))
        elif body.strip():
            cells.append(new_code_cell(body))
        cur = []
    for line in src.split("\n"):
        m = re.match(r"^# %%\s*(\[(\w+)\])?\s*$", line)
        if m:
            flush(); kind = {"markdown": "markdown", "setup": "setup"}.get(m.group(2), "code"); continue
        if kind is not None:
            cur.append(line)
    flush()
    return cells


def build(src_path, out_path):
    nb = new_notebook(cells=parse(pathlib.Path(src_path).read_text()))
    nb.metadata["kernelspec"] = {"display_name": "Python 3", "language": "python", "name": "python3"}
    nb.metadata["language_info"] = {"name": "python"}
    nbformat.validate(nb)
    out = pathlib.Path(out_path); out.parent.mkdir(parents=True, exist_ok=True)
    nbformat.write(nb, out)
    return len(nb.cells)


if __name__ == "__main__":
    n = build(sys.argv[1], sys.argv[2])
    print(f"wrote {sys.argv[2]} ({n} cells)")
