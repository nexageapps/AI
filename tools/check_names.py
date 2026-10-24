#!/usr/bin/env python3
"""Enforce the naming convention. Exit 1 on violations.  python tools/check_names.py"""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from naming import FILE_RE, lesson_filename

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "tools/curriculum.json").read_text())
bad = []
for t in DATA["tiers"]:
    canon = {lid: lesson_filename(lid, title) for lid, title, *_ in t["lessons"]}
    for p in sorted((ROOT / t["key"]).glob("*.ipynb")):
        if not FILE_RE.match(p.name):
            bad.append(f"{p.relative_to(ROOT)}: not '<ID>-<kebab-title>.ipynb'")
        else:
            lid = p.name.split("-", 1)[0]
            if lid not in canon: bad.append(f"{p.relative_to(ROOT)}: id {lid} not in curriculum.json")
            elif canon[lid] != p.name: bad.append(f"{p.relative_to(ROOT)}: expected {canon[lid]}")
for p in sorted((ROOT / "Electives").rglob("*.ipynb")):
    if not FILE_RE.match(p.name): bad.append(f"{p.relative_to(ROOT)}: not '<ID>-<kebab-title>.ipynb'")
print("\n".join(bad) if bad else "naming OK")
sys.exit(1 if bad else 0)
