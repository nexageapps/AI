# Contributing

This is **open-source study material**: free to use, fork, translate and improve. Contributions of every size are welcome: typo fixes, clearer explanations, better exercises, new lessons, translations, bug reports.

## Ways to help
| You want to… | Do this |
|---|---|
| Fix a typo / unclear sentence | Edit the notebook or doc and open a PR |
| Report a broken cell or wrong claim | Open an issue with the lesson ID (`AG06`), the cell, and what you expected |
| Suggest or write a lesson | Open a *lesson proposal* issue first; specs live in [CURRICULUM.md](./CURRICULUM.md) |
| Improve an exercise or checkpoint | PR; keep the 3-tier Practice / Stretch / Challenge structure |
| Update something outdated (an API, a model, a library) | PR; say what changed and link the changelog |

## Ground rules for lessons
1. Follow the **template** and **naming convention** in [CURRICULUM.md](./CURRICULUM.md) (§2, §6): files are `<ID>-<kebab-title>.ipynb`.
2. The lesson must **run offline, free, on CPU** (`python tools/nbtest.py "<path>"` passes); LLM parts go through `agentkit` so they also run live.
3. Be **accurate**: cite only sources you have checked; label simulated results as simulated; never present toy numbers as benchmark results.
4. **No secrets, no personal data, no copyrighted material** you don't have the right to share. Synthetic data only.
5. Authoring details: [tools/LESSON_AUTHORING.md](./tools/LESSON_AUTHORING.md).

## Workflow
```bash
git checkout -b my-change
python tools/check_names.py          # naming convention
python -m pytest -q agentkit/tests   # helper library
python tools/nbtest.py "Agents/AG03*.ipynb"   # the lesson(s) you touched
python tools/gen_readmes.py          # refresh status tables
```
Open a PR using the template. Maintainers review for correctness, clarity and the quality bar, not for style trivia.

## Licence
By contributing you agree your contribution is released under the repository's [MIT License](./LICENSE).
