#!/usr/bin/env python3
"""Add the atlas to the current homepage without replacing its practice/source slots."""
import argparse,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
START='<!-- suti-world-atlas-entry:start -->'
END='<!-- suti-world-atlas-entry:end -->'
NAV='<a id="world-atlas-nav" href="https://ezargaruna.github.io/suticore/world-atlas.html?lang=ru" data-standalone>атлас сути мира</a>'
SCRIPT='''<script id="suti-world-atlas-entry-sync">(()=>{const editions=@@DATA@@;const sync=()=>{let c=(document.documentElement.dataset.languageLayer||document.documentElement.lang||'ru').toLowerCase();if(c==='pt')c='pt-br';if(c==='es-419')c='es';if(!editions[c])c='ru';const text=editions[c];const a=document.getElementById('world-atlas-nav');a.textContent=text.title;const u=new URL(a.href);u.searchParams.set('lang',c);u.searchParams.set('theme',document.documentElement.dataset.theme||'day');a.href=u.href;};sync();document.addEventListener('suti:locale-change',sync);new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-language-layer','data-theme']})})();</script>'''
def output():
 p=ROOT/'index.html';s=p.read_text()
 s=re.sub(re.escape(START)+'.*?'+re.escape(END),'',s,flags=re.S)
 nav=re.search(r'<nav class="site-nav"[^>]*>',s)
 if not nav:raise ValueError('Homepage navigation slot absent')
 s=s[:nav.end()]+START+NAV+END+s[nav.end():]
 s=re.sub(r'<script id="suti-world-atlas-entry-sync">.*?</script>','',s,flags=re.S)
 editions={p.stem:{'title':json.loads(p.read_text())['ui']['title']} for p in (ROOT/'locales/world-atlas').glob('*.json') if p.stem in ['ru','en','es','pt-br','zh-hans','hi','fr','ar','bn','eo','sa','la','yzh']}
 script=SCRIPT.replace('@@DATA@@',json.dumps(editions,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c'))
 s=s.replace('</body>',script+'</body>')
 prefix="location.pathname.startsWith('/entry/')"
 addition="location.pathname.startsWith('/shared/care-veche/') || location.pathname.startsWith('/locales/world-atlas/') || location.pathname.startsWith('/locales/world-foundry/') || location.pathname.startsWith('/locales/text-studio/') || ['/world-atlas.html','/text-studio.html','/world-foundry.html'].includes(location.pathname) || "
 if addition not in s:
  if s.count(prefix)!=1:raise ValueError('Custom-domain route guard drift')
  s=s.replace(prefix,addition+prefix,1)
 return s
def main():
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();s=output();path=ROOT/'index.html'
 if a.check:
  if path.read_text()!=s:raise SystemExit('Stale atlas entry/navigation')
 else:path.write_text(s)
 print('Homepage atlas entry: 13 labels, canonical published route fallback, original practice slots retained')
if __name__=='__main__':main()
