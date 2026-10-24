#!/usr/bin/env python3
"""Rename notebooks to the convention '<ID>-<kebab-title>.ipynb' and rewrite every link to them.

    python tools/rename_notebooks.py          # dry run: prints the plan
    python tools/rename_notebooks.py --apply  # git mv + rewrite links

Core lessons are named from tools/curriculum.json (canonical titles). Electives are slugified from their current names.
Stubs (files in core tiers whose title does not match the curriculum) are left alone for tools/prune_legacy.sh.
"""
import json, os, pathlib, subprocess, sys, urllib.parse
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from naming import LEGACY_RE, FILE_RE, lesson_filename, slugify

ROOT = pathlib.Path(__file__).resolve().parent.parent
APPLY = "--apply" in sys.argv
DATA = json.loads((ROOT / "tools/curriculum.json").read_text())

plan, skipped = [], []
for t in DATA["tiers"]:
    want = {lid: title for lid, title, *_ in t["lessons"]}
    for p in sorted((ROOT / t["key"]).glob("*.ipynb")):
        m = LEGACY_RE.match(p.name)
        if not m:
            continue
        lid, title = m.groups()
        if lid in want and slugify(title) == slugify(want[lid]):
            new = lesson_filename(lid, want[lid])
            if new != p.name: plan.append((p, p.with_name(new)))
        else:
            skipped.append(p)
for p in sorted((ROOT / "Electives").rglob("*.ipynb")):
    m = LEGACY_RE.match(p.name)
    if m:
        plan.append((p, p.with_name(f"{m.group(1)}-{slugify(m.group(2))}.ipynb")))

names = [n for _, n in plan]
assert len(set(names)) == len(names), "collision in plan"
for o, n in plan:
    print(f"{o.relative_to(ROOT)}\n   -> {n.relative_to(ROOT)}")
print(f"\n{len(plan)} renames; {len(skipped)} legacy stubs left for prune_legacy.sh:")
for s in skipped: print("   skip", s.relative_to(ROOT))
if not APPLY:
    sys.exit(0)

def variants(rel):  # all spellings a link may use
    a = rel
    b = rel.replace(" ", "%20")
    c = b.replace("(", "%28").replace(")", "%29")
    return [a, b, c]

rewrite = {}
for o, n in plan:
    ro, rn = str(o.relative_to(ROOT)), str(n.relative_to(ROOT))
    for vo in variants(ro): rewrite[vo] = rn
    # same-folder / relative-by-basename links inside notebooks and docs
    for vo in variants(o.name): rewrite.setdefault("/" + vo, "/" + n.name)
    for vo in variants("../" + ro.split("/", 1)[0] + "/" + o.name): pass

for o, n in plan:
    tracked = subprocess.run(["git", "ls-files", "--error-unmatch", str(o)], capture_output=True, cwd=ROOT).returncode == 0
    if tracked: subprocess.run(["git", "mv", str(o), str(n)], check=True, cwd=ROOT)
    else: o.rename(n)

exts = {".md", ".html", ".yml", ".yaml", ".ipynb", ".txt", ".sh", ".json", ".py"}
skip = {".git", ".venv", "node_modules", "archive"}
changed = 0
items = sorted(rewrite.items(), key=lambda kv: -len(kv[0]))
for dp, dn, fn in os.walk(ROOT):
    dn[:] = [d for d in dn if d not in skip]
    for f in fn:
        p = pathlib.Path(dp) / f
        if p.suffix not in exts or p.name == "rename_notebooks.py": continue
        try: s = p.read_text()
        except Exception: continue
        t = s
        for a, b in items:
            if a in t: t = t.replace(a, b)
        if t != s: p.write_text(t); changed += 1
print(f"renamed {len(plan)} files; rewrote links in {changed} files")
