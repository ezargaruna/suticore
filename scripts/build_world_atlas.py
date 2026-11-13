#!/usr/bin/env python3
"""Build a source-linked, local-first atlas. No private source discovery or network."""
import argparse
import hashlib
import json
from pathlib import Path
from urllib.parse import quote

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'locales/world-atlas'
CODES=['ru','en','es','pt-br','zh-hans','hi','fr','ar','bn','eo','sa','la','yzh']
def read(p):return json.loads(p.read_text())
def encoded(x):return json.dumps(x,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()

def build():
 source=read(SOURCE/'source.ru.json');editions={c:read(SOURCE/(c+'.json')) for c in CODES}
 for c,e in editions.items():
  if set(e['ui'])!=set(source) or not all(isinstance(x,str) and x.strip() for x in e['ui'].values()):raise ValueError('Incomplete edition '+c)
  if e['source_sha256']!=digest(SOURCE/'source.ru.json'):raise ValueError('Edition source drift '+c)
 routes=read(SOURCE/'routes.v1.json')['routes']
 records=[];used=set()
 primary=[
  ('question','questions','questions','index.html',None),
  ('studio','tools','tools','text-studio.html',None),
  ('practice','practices','practices','nitya-practice.html',None),
  ('worlds','worlds','worlds','world-foundry.html',None),
  ('care','care','care','care-constellation.html','care'),
  ('veche','governance','careVeche','shared/care-veche/portal.html',None),
  ('library','library','library','modules.html',None),
  ('system','learning','commonSystem','system/index.html',None),
  ('language','language','language','clear-water.html','language'),
  ('fund','governance','fund90days','system/_techne/human/collective-living-system-v1/fund-plan/plan.ru.html','fund'),
 ]
 suffix={'ru':'ru','en':'','es':'es','pt-br':'pt','zh-hans':'zh-Hans','hi':'hi','fr':'fr','ar':'ar','bn':'bn','eo':'eo','sa':'sa','la':'la','yzh':'ru'}
 for ident,category,key,path,family in primary:
  variants={};langs={}
  for c in CODES:
   target=path
   if family in ['care','language']:
    stem='care-constellation' if family=='care' else 'clear-water'
    tail=suffix[c];target=stem+('-'+tail if tail else '')+'.html'
   if family=='fund':target=path.replace('.ru.html','.'+('ru' if c=='yzh' else c)+'.html')
   variants[c]=target;langs[c]='ru' if c=='yzh' else 'es' if c=='es' and ident in ['studio','language','fund'] else editions[c]['contentLanguage'];used.add(target)
  records.append({'id':'entry:'+ident,'category':category,'status':'runtime' if ident in ['studio','worlds'] else 'local' if ident=='veche' else 'source','path':path,'routes':variants,'sourceLanguages':langs,'titles':{c:e['ui'][key] for c,e in editions.items()},'texts':{c:e['ui']['missionIntegration' if ident=='veche' else 'missionChoose'] for c,e in editions.items()},'featured':True,'tags':[ident]})
 for r in routes:
  if r['path'] in used:continue
  records.append({'id':r['id'],'category':r['category'],'status':'source','path':r['path'],'title':r['title'],'sourceLanguage':r['language'],'tags':[r['path']]})
 inventory=read(ROOT/'locales/module-catalog/records.json');titles=read(ROOT/'locales/module-catalog/titles.json')
 for i,r in enumerate(inventory['cards']):
  records.append({'id':'source:'+r['path'],'category':'library','status':'specification','path':'https://github.com/ezargaruna/suticore/blob/'+inventory['sourceRevision']+'/'+quote(r['path']),
   'external':True,'titles':{c:titles[{'pt-br':'pt-BR','zh-hans':'zh-Hans'}.get(c,c)][i] for c in CODES},'sourceLanguage':r['sourceLanguage'],'declaredLicense':r.get('declaredLicense'),'tags':[r['path'],r['group']]})
 care={c:read(ROOT/'shared/care-veche/locales'/(c+'.json')) for c in CODES}
 for i,m in enumerate(care['ru']['modules']):
  records.append({'id':'module:'+m['id'],'category':{'SUTI.angels':'care','SUTI.care':'care','SUTI.veche':'governance','SUTI.verenium':'care','SUTI.uni':'learning','SUTI.game':'worlds','SUTI.logos':'language'}.get(m['id'],'tools'),'status':'specification','path':'shared/care-veche/portal.html#'+quote(m['id']),
   'titles':{c:care[c]['modules'][i]['title'] for c in CODES},'texts':{c:care[c]['modules'][i]['function'] for c in CODES},'tags':[m['id'],m['alias']]})
 contracts=read(SOURCE/'integration-contracts.v1.json')
 for r in contracts['adapters']:
  records.append({'id':r['id'],'category':'tools','status':'local','path':r['entry'],'titles':{c:e['ui'][r['label_key']] for c,e in editions.items()},'texts':{c:e['ui'][r['summary_key']] for c,e in editions.items()},'tags':[r['id'],'integration',*r['capabilities']]})
 if len({r['id'] for r in records})!=len(records):raise ValueError('Duplicate atlas record id')
 data={'schema':'suti.world-atlas.v1','editions':editions,'records':records,'scope':'published static route inventory, 74 public source references, 15 care-veche module methods; no private record projection','access_contours':['open','plus','pro','private'],'projected_contour':'open','runtime_scope':'per-entry; no external platform gateway'}
 shared=(ROOT/'assets/css/suti-angels-editorial.css').read_text().replace('../fonts/','https://ezargaruna.github.io/suticore/assets/fonts/')
 html=(SOURCE/'page.template.html').read_text().replace('@@SHARED_CSS@@',shared).replace('@@CSS@@',(ROOT/'assets/css/world-atlas.css').read_text()).replace('@@DATA@@',encoded(data)).replace('@@JS@@',(ROOT/'assets/js/world-atlas.js').read_text())
 coverage={'schema':'suti.world-atlas.coverage.v1','source_locale':'ru','source_sha256':digest(SOURCE/'source.ru.json'),'route_inventory':len(routes),'source_records':len(inventory['cards']),'module_methods':len(care['ru']['modules']),'atlas_records':len(records),'routes':{c:{'href':'world-atlas.html?lang='+c,'contentLanguage':e['contentLanguage'],'direction':e['direction'],'fields':len(e['ui']),'status':e['status'],'native_review':'HOLD'} for c,e in editions.items()},'whole_legacy':'not implied','scope':data['scope'],'published_text_inputs':'own project labels and already-public catalog/path metadata; private stories and case identities excluded'}
 return {'world-atlas.html':html,'locales/world-atlas/coverage.json':json.dumps(coverage,ensure_ascii=False,indent=2)+'\n','locales/world-atlas/atlas.v1.json':json.dumps(data,ensure_ascii=False,indent=2)+'\n'}

def main():
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args()
 for rel,text in build().items():
  path=ROOT/rel
  if a.check:
   if not path.exists() or path.read_text()!=text:raise SystemExit('Stale atlas output '+rel)
  else:path.write_text(text)
 print('World atlas: 13 complete UI routes; exact declared route/source/module inputs; '+('verified' if a.check else 'rendered'))
if __name__=='__main__':main()
