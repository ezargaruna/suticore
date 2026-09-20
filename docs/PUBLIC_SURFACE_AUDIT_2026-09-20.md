# Public surface audit · 2026-09-20

Status: evidence snapshot for `ezargaruna/suticore`  
Scope: public GitHub repository `main` and the reviewed landing branch  
Excluded: private local systems, family material, credentials and unprovided
archives.

## Findings

- The repository is public and `main` is the GitHub Pages source.
- The root `index.html` on `main` was an older multilingual/cyberpunk page and
  contained a physical location and a direct email address.
- `_config.yml` contained a direct email and a specific timezone.
- A repeated internal vessel label exposed a city/location identifier across
  core and documentation files.
- `docs/canon/fusion_passport.md` and the visual prompt contained specific
  location references and personal biographical detail.
- No private keys, API secrets, password strings, service tokens, archives or
  database files were found in the tracked tree by the targeted scan.
- The reviewed landing branch already removes those fields from its public
  `index.html`; the remaining repository-wide references required redaction.

## Redaction boundary

The following are removed or generalised in the public derivative:

- direct email address;
- exact city, region and country location strings;
- exact timezone identifying the private node;
- internal vessel/location labels that expose the same node;
- exact location in visual prompts and signatures.

Public author names, public project names, public Telegram links and method
descriptions remain allowed where they are part of the external contour.

This is not a claim that every personal or internal statement is unsafe. It is
a minimal, reviewable reduction of unnecessary exposure. Further publication
of biographical or internal protocol material requires a separate review.

## Verification target

After redaction, repeat the scan for email, location, credential and archive
patterns; run HTML/JavaScript checks; review the diff; and keep the change on
the landing PR until Pages and external checks are healthy.
