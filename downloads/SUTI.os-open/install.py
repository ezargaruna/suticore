#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
from pathlib import Path
import hashlib,shutil,sys
ROOT=Path(__file__).resolve().parent
def main():
 for line in (ROOT/'MANIFEST.sha256').read_text().splitlines():
  digest,rel=line.split('  ',1);p=ROOT/rel
  if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=digest: raise SystemExit('checksum mismatch: '+rel)
 target=Path(sys.argv[1]).expanduser() if len(sys.argv)>1 else Path.home()/'Documents'/'SUTI.os-open'
 if target.exists(): raise SystemExit('target exists; unchanged: '+str(target))
 target.parent.mkdir(parents=True,exist_ok=True);shutil.copytree(ROOT/'vault',target)
 print('Installed:',target);print('Open this folder as a vault in Obsidian, or read its Markdown directly.')
if __name__=='__main__':main()
