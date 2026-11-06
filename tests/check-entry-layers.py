from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os
layers=json.loads(Path('modules/verenium/entry-locales.json').read_text())
with sync_playwright() as w:
 b=w.chromium.launch(executable_path=os.getenv('CHROME_BIN') or None,headless=True);p=b.new_page(viewport={'width':360,'height':800});p.route('https://**/*',lambda r:r.abort());home=Path('index.html').resolve().as_uri();app=Path('verenium.html').resolve().as_uri()
 for k,r in layers.items():
  p.goto(home+'?lang='+k);assert p.locator('.gate-0 strong').inner_text()==r[0],k;assert p.locator('.gate-1 small').inner_text()==r[2];assert p.locator('.gate-2 strong').inner_text()==r[3];assert p.locator('#triad-language-note').inner_text()
  for ix,frag in [(1,'activate'),(2,'council')]:
   href=p.locator('.gate-'+str(ix)).get_attribute('href');assert href.endswith('?lang='+k+'#'+frag);p.goto(app+href[href.index('?'):]);assert p.locator('#reflection-title').inner_text()==r[8 if ix==2 else 6];p.goto(home+'?lang='+k)
 print('verified 13 locales and 26 routed reflections');b.close()
