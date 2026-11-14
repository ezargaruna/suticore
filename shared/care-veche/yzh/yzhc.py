#!/usr/bin/env python3
"""YZHC 0.1: bounded local validator of a PROPOSED controlled register.
Data only: no eval, shell, network, model calls, or imported corpus code.
Validity never establishes truth, consent, historical origin or author adoption.
"""
from __future__ import annotations
import argparse,hashlib,json,re,unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parent
HEADER='yzhc 0.1 controlled'
KINDS={'OBSERVED','HYPOTHESIS','PROPOSED','UNKNOWN'}
ROLES={'object','recipient','instrument','location','source','goal','quality','manner'}
PHASES={'intent','process','result'}
FORCES={'declare','ask','request'}
TIMES={'past','present','future','unknown'}
NUMBERS={'one','many','unknown'}
RELATIONS={'supports','contradicts','refines','requires_review','leads_to'}
BIDI={chr(i) for i in range(0x202a,0x202f)}|{chr(i) for i in range(0x2066,0x206a)}
TOKEN=re.compile(r'"(?:\\.|[^"\\])*"|->|=>|[A-Za-z][A-Za-z0-9_]*|[():~;,=.]')
IDENT=re.compile(r'^[A-Za-z][A-Za-z0-9_]*$')
class Invalid(ValueError):
 def __init__(self,code,message,line=None):
  self.code,self.message,self.line=code,message,line
  super().__init__(f'{code}: {message}'+(f' (line {line})' if line else ''))
def fail(code,message,line=None):raise Invalid(code,message,line)
def tokens(text,line):
 result=[];position=0
 while position<len(text):
  if text[position].isspace():position+=1;continue
  match=TOKEN.match(text,position)
  if not match:fail('E_TOKEN',f'unexpected character at column {position+1}',line)
  result.append(match.group());position=match.end()
 return result
class Reader:
 def __init__(self,text,line):self.ts=tokens(text,line);self.i=0;self.line=line
 def pop(self):
  if self.i>=len(self.ts):fail('E_SYNTAX','unexpected end of statement',self.line)
  value=self.ts[self.i];self.i+=1;return value
 def expect(self,value):
  got=self.pop()
  if got!=value:fail('E_SYNTAX',f'expected {value!r}, got {got!r}',self.line)
 def identifier(self):
  value=self.pop()
  if not IDENT.fullmatch(value):fail('E_SYNTAX','identifier required',self.line)
  return value
 def string(self):
  value=self.pop()
  if not value.startswith('"'):fail('E_SYNTAX','quoted JSON string required',self.line)
  try:result=json.loads(value)
  except json.JSONDecodeError:fail('E_STRING','invalid JSON string',self.line)
  if not result.strip():fail('E_STRING','empty scope/evidence text',self.line)
  if any(unicodedata.category(c) in {'Cc','Cs'} or c in BIDI for c in result):fail('E_STRING','control/surrogate in text',self.line)
  return result
 def evidence(self):
  if self.i<len(self.ts) and self.ts[self.i]=='none':self.i+=1;return None
  return self.string()
 def metadata(self,keys):
  result={}
  for index,key in enumerate(keys):
   if index:self.expect(';')
   self.expect(key);self.expect('=')
   result[key]=self.string() if key=='scope' else (self.evidence() if key=='evidence' else self.identifier())
  self.expect('.')
  if self.i!=len(self.ts):fail('E_SYNTAX','tokens after final period',self.line)
  return result
def parse_line(text,line):
 r=Reader(text,line);type_=r.identifier();ident=r.identifier();r.expect(':')
 if type_=='claim':
  actor=r.identifier();r.expect('->');predicate=r.identifier();r.expect('~');phase=r.identifier();r.expect('(');args={}
  if r.i<len(r.ts) and r.ts[r.i]!=')':
   while True:
    role=r.identifier();r.expect('=');value=r.identifier()
    if role in args:fail('E_ROLE_DUPLICATE','duplicate role: '+role,line)
    args[role]=value
    if r.i<len(r.ts) and r.ts[r.i]==',':r.i+=1;continue
    break
  r.expect(')');r.expect(';');meta=r.metadata(['force','neg','kind','evidence','scope','time','number'])
  return dict(type='claim',id=ident,actor=actor,predicate=predicate,phase=phase,args=args,**meta)
 if type_=='link':
  source=r.identifier();r.expect('=>');target=r.identifier();r.expect(';');meta=r.metadata(['rel','kind','evidence','scope'])
  return dict(type='link',id=ident,source=source,target=target,**meta)
 fail('E_SYNTAX','only claim/link statements allowed',line)
def lexical_index(lexicon):
 entries=lexicon.get('entries',[])
 if not isinstance(entries,list) or len(entries)>256:fail('E_LEXICON','invalid/oversized lexicon')
 result={}
 for entry in entries:
  ident=entry.get('term_id')
  if not isinstance(ident,str) or not IDENT.fullmatch(ident) or ident in result:fail('E_LEXICON','bad/duplicate lexical ID')
  if entry.get('pos') not in {'noun','verb','adjective','adverb','particle'} or entry.get('definition_ru') is None:continue
  result[ident]=entry
 return result
def evidence_check(s,sources,line):
 evidence=s['evidence'];kind=s['kind']
 if kind not in KINDS:fail('E_KIND','unsupported knowledge kind',line)
 if kind=='OBSERVED' and evidence is None:fail('E_EVIDENCE_REQUIRED','OBSERVED needs evidence reference',line)
 if evidence is None:return
 match=re.fullmatch(r'([^#]+)#L([1-9][0-9]*)-L([1-9][0-9]*)',evidence)
 if not match:fail('E_EVIDENCE_FORMAT','expected SOURCE-ID#Lfirst-Llast',line)
 ident,first,last=match.group(1),int(match.group(2)),int(match.group(3))
 if ident not in sources:fail('E_EVIDENCE_UNKNOWN','source ID absent from registry',line)
 if first>last or last>sources[ident].get('line_count',0):fail('E_EVIDENCE_RANGE','lines outside registered source',line)
def validate(s,lex,sources,claims,line):
 evidence_check(s,sources,line)
 if s['type']=='link':
  if s['rel'] not in RELATIONS:fail('E_RELATION','unsupported relation',line)
  if s['source'] not in claims or s['target'] not in claims:fail('E_LINK_TARGET','endpoint is not a claim ID',line)
  return
 if s['phase'] not in PHASES:fail('E_PHASE','unsupported phase',line)
 if s['force'] not in FORCES or s['neg'] not in {'yes','no'} or s['time'] not in TIMES or s['number'] not in NUMBERS:fail('E_FEATURE','unsupported feature',line)
 if s['force']=='ask' and s['kind']!='UNKNOWN':fail('E_QUESTION_KIND','question requires UNKNOWN',line)
 if s['force']=='request' and (s['kind']!='PROPOSED' or s['phase']!='intent'):fail('E_REQUEST_FEATURE','request requires PROPOSED+intent',line)
 actor=lex.get(s['actor']);verb=lex.get(s['predicate'])
 if not actor or not verb:fail('E_LEXEME','unknown actor/predicate',line)
 if actor.get('pos')!='noun' or actor.get('semantic_type')!='actor':fail('E_ACTOR_TYPE','actor noun required',line)
 if verb.get('pos')!='verb':fail('E_PREDICATE_TYPE','verb required',line)
 if not set(verb.get('required_roles',[])).issubset(s['args']):fail('E_ROLE_REQUIRED','required role missing',line)
 if not set(s['args']).issubset(verb.get('allowed_roles',[])):fail('E_ROLE_NOT_ALLOWED','role absent from signature',line)
 for role,ident in s['args'].items():
  if role not in ROLES:fail('E_ROLE_UNKNOWN','unknown role',line)
  value=lex.get(ident)
  if value is None:fail('E_LEXEME','unknown argument: '+ident,line)
  expected='adjective' if role=='quality' else ('adverb' if role=='manner' else 'noun')
  if value.get('pos')!=expected:fail('E_ARGUMENT_TYPE','wrong lexical type for '+role,line)
  if role=='recipient' and value.get('semantic_type')!='actor':fail('E_RECIPIENT_TYPE','recipient actor required',line)
def render(statements):
 q=lambda v:json.dumps(v,ensure_ascii=False);lines=[HEADER]
 for s in statements:
  evidence='none' if s['evidence'] is None else q(s['evidence'])
  if s['type']=='claim':
   args=','.join(k+'='+v for k,v in s['args'].items())
   lines.append(f"claim {s['id']}: {s['actor']} -> {s['predicate']}~{s['phase']}({args}); force={s['force']}; neg={s['neg']}; kind={s['kind']}; evidence={evidence}; scope={q(s['scope'])}; time={s['time']}; number={s['number']}.")
  else:lines.append(f"link {s['id']}: {s['source']} => {s['target']}; rel={s['rel']}; kind={s['kind']}; evidence={evidence}; scope={q(s['scope'])}.")
 return '\n'.join(lines)+'\n'
def backbrief(s,lex):
 phase={'intent':'намерение','process':'процесс','result':'завершение в содержании, не доказательство'}
 label=lambda key:lex[key]['definition_ru'];evidence=s['evidence'] or 'не задано'
 if s['type']=='link':return f"Связь {s['id']}: {s['source']} {s['rel']} {s['target']}; тип {s['kind']}; основание {evidence}; область {s['scope']}. Связь не доказывает истинность узлов."
 roles='; '.join(k+'='+label(v) for k,v in s['args'].items()) or 'нет'
 return f"Запись {s['id']}: {label(s['actor'])}; предикат {label(s['predicate'])}; фаза {phase[s['phase']]}; роли {roles}; force={s['force']}; neg={s['neg']}; тип {s['kind']}; основание {evidence}; область {s['scope']}; time={s['time']}; number={s['number']}. Развёртка структуры не подтверждает истинность, согласие или выполнение."
def compile_text(text,lexicon,sources=None):
 if len(text.encode('utf-8'))>65536:fail('E_LIMIT','source exceeds 64 KiB')
 if not text.split('\n') or text.split('\n')[0].rstrip('\r')!=HEADER:
  return {'schema':'yzhc.compile-result.v0.1','register_status':'OUTSIDE_CONTROLLED_REGISTER','validation':'NOT_APPLICABLE','reason':'no explicit YZHC controlled header; poetic and opaque originals are preserved','original_source':text,'original_sha256':hashlib.sha256(text.encode()).hexdigest(),'normalization':'NONE','truth_status':'NOT_EVALUATED','semantic_support':'UNKNOWN','execution':'NONE'}
 if unicodedata.normalize('NFC',text)!=text:fail('E_NFC','controlled input must be NFC; original source never rewritten')
 if any(c in BIDI or c in '\u2028\u2029' or (unicodedata.category(c)=='Cc' and c not in '\r\n\t') for c in text):fail('E_CONTROL','hidden/control character')
 lines=text.splitlines()
 if not lines or lines[0]!=HEADER:fail('E_HEADER','exact YZHC header required',1)
 lex=lexical_index(lexicon);registry={s.get('source_id',s.get('id')):s for s in (sources or {}).get('sources',[])}
 statements=[];line_numbers=[];ids=set()
 for n,line in enumerate(lines[1:],2):
  if not line.strip() or line.lstrip().startswith('#'):continue
  if len(statements)>=256:fail('E_LIMIT','more than 256 statements',n)
  s=parse_line(line,n)
  if s['id'] in ids:fail('E_ID_DUPLICATE','statement IDs must be unique',n)
  ids.add(s['id']);statements.append(s);line_numbers.append(n)
 if not statements:fail('E_EMPTY','at least one statement required')
 claims={s['id'] for s in statements if s['type']=='claim'}
 for s,n in zip(statements,line_numbers):validate(s,lex,registry,claims,n)
 return {'schema':'yzhc.compile-result.v0.1','register_status':'PROPOSED_PROTOTYPE','validation':'VALID_CONTROLLED_SYNTAX_AND_TYPES','truth_status':'NOT_EVALUATED','semantic_support':'UNKNOWN','consent':'NOT_INFERRED','execution':'NONE','original_source':text,'original_sha256':hashlib.sha256(text.encode()).hexdigest(),'ast':statements,'canonical':render(statements),'backbrief_ru':[backbrief(s,lex) for s in statements],'source_map':[{'id':s['id'],'line':n} for s,n in zip(statements,line_numbers)],'limits':{'bytes':65536,'statements':256},'warnings':['phase result is not proof','evidence registration is not semantic verification','no natural/poetic grammar validation','no corpus code imported or executed']}
def read_bounded(path,limit):
 with Path(path).open('rb') as stream:raw=stream.read(limit+1)
 if len(raw)>limit:fail('E_LIMIT','input exceeds bounded byte allowance')
 return raw
def read_json(path):
 raw=read_bounded(path,1048576)
 try:obj=json.loads(raw)
 except (json.JSONDecodeError,RecursionError,UnicodeDecodeError):fail('E_JSON','invalid/deep JSON data')
 if not isinstance(obj,dict):fail('E_JSON','JSON object required')
 return obj
def self_test():
 lex=read_json(ROOT/'glossary-seed.proposed.v1.json');fixtures=read_json(ROOT/'fixtures.synthetic.v1.json');results=[]
 for case in fixtures['cases']:
  try:
   result=compile_text(case['source'],lex,fixtures['sources'])
   if case.get('expected_validation')=='NOT_APPLICABLE':
    assert result['validation']=='NOT_APPLICABLE' and result['original_source']==case['source']
    assert result['normalization']=='NONE'
    results.append({'id':case['id'],'status':'PASS','criterion':'outside controlled register; exact original preserved'})
    continue
   if not case['valid']:raise AssertionError(case['id']+': invalid fixture accepted')
   second=compile_text(result['canonical'],lex,fixtures['sources'])
   assert second['ast']==result['ast'],case['id']+': AST roundtrip mismatch'
   assert result['truth_status']=='NOT_EVALUATED' and result['execution']=='NONE'
   results.append({'id':case['id'],'status':'PASS','criterion':'typed parse and AST roundtrip; no truth/execution inference'})
  except Invalid as error:
   if case['valid'] or error.code!=case.get('error'):raise AssertionError(f"{case['id']}: unexpected {error}") from error
   results.append({'id':case['id'],'status':'PASS','criterion':'reject '+error.code})
 return {'schema':'yzhc.synthetic-fixture-check.v0.1','scope':'proposed controlled-register prototype only; not corpus/native grammar','cases':results,'passed':len(results),'failed':0,'native_review':'HOLD','publication':'HOLD'}
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('source',nargs='?');p.add_argument('--lexicon',default=str(ROOT/'glossary-seed.proposed.v1.json'));p.add_argument('--sources');p.add_argument('--output');p.add_argument('--self-test',action='store_true');args=p.parse_args()
 try:
  if args.self_test:
   import sys
   if sys.flags.optimize:p.error('self-test requires validation enabled; omit -O')
   result=self_test()
  else:
   if not args.source:p.error('source path or --self-test required')
   raw=read_bounded(args.source,65536)
   result=compile_text(raw.decode('utf-8'),read_json(args.lexicon),read_json(args.sources) if args.sources else None)
  output=json.dumps(result,ensure_ascii=False,indent=2)+'\n'
  if args.output:Path(args.output).write_text(output)
  else:print(output,end='')
 except Invalid as error:
  print(json.dumps({'validation':'INVALID','error':error.code,'message':error.message,'line':error.line},ensure_ascii=False));raise SystemExit(2)
if __name__=='__main__':main()
