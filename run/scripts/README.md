# run/scripts

`vault hygiene · llm pipeline · crystallization tools`

scripts inherited from the former `ezargaruna/sreteniya-os` repository.
git history preserved via subtree merge.

---

## ∴ inventory

| script | function |
|---|---|
| `sreteniya_scan.sh` | walk vault · report structure |
| `sreteniya_filetypes.sh` | inventory by extension |
| `sreteniya_metadata.sh` | extract frontmatter · tags · timestamps |
| `sreteniya_duplicates.sh` | find content duplicates |
| `sreteniya_clean_duplicates.sh` | dedupe with confirmation |
| `sreteniya_similarity_scan.sh` | semantic similarity sweep |
| `sreteniya_llm_pipeline.py` | orchestrate llm passes over vault |
| `vault_crystallizer.py` | reduce vault → essential canon |
| `void_sweeper.sh` | clear empty / orphan nodes |

---

## ⟁ usage

```bash
cd run/scripts
bash sreteniya_scan.sh /path/to/vault
python3 sreteniya_llm_pipeline.py --config ../config.yml
```

---

## [ ! ] safety

```
01 · always run on a copy of the vault first
02 · destructive scripts (clean · sweeper) require explicit flag
03 · llm pipeline assumes local ollama · zero telemetry
04 · check ai-policy.md before sending vault content to external apis
```

---

## ⟐ origin

```
imported from   github.com/ezargaruna/sreteniya-os
import method   git subtree merge · history preserved
import date     2026
```

original repo archived (read-only) on github.
all future updates land in this directory.
