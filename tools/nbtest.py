#!/usr/bin/env python3
"""Execute notebooks end-to-end in OFFLINE mode (no API key, no cost) and report failures.

Usage: nbtest.py "Agents/AG02*.ipynb" [more globs...]     (run from repo root)
"""
import sys, os, glob, pathlib, time
import nbformat
from nbclient import NotebookClient

os.environ["AGENTKIT_OFFLINE"] = "1"
fails = 0
for pat in sys.argv[1:]:
    for f in sorted(glob.glob(pat)):
        p = pathlib.Path(f)
        nb = nbformat.read(p, as_version=4)
        t0 = time.time()
        try:
            NotebookClient(nb, timeout=180, kernel_name="python3", resources={"metadata": {"path": str(p.parent.resolve())}}).execute()
            print(f"PASS {f} ({time.time()-t0:.1f}s, {len(nb.cells)} cells)")
        except Exception as e:  # noqa: BLE001
            fails += 1
            print(f"FAIL {f}\n   {str(e)[-900:]}")
sys.exit(1 if fails else 0)
