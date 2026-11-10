#!/usr/bin/env python3
"""Build static SUTI.world language entry previews from reviewed-scope source Markdown."""
from __future__ import annotations
import hashlib, html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENTRY_DIR = ROOT / 'locales' / 'entries'
OUT_DIR = ROOT / 'locales' / 'built'
LANGS = ['ru','en','es','pt-br','zh-hans','hi','fr','ar','bn','eo','sa','la','yzh']
PAGE_META = {
 'ru': ('Русский','ltr','предпросмотр транскреации · независимая языковая, культурная и продуктовая сверка ещё нужна','открыть SUTI.world на русском'),
 'en': ('English','ltr','transcreation preview · independent language, cultural, accessibility, rights and product review pending','open SUTI.world in English'),
 'es': ('Español','ltr','vista previa de transcreación · falta una revisión independiente de lengua, cultura, accesibilidad, derechos y producto','abrir SUTI.world en español'),
 'pt-br': ('Português brasileiro','ltr','prévia de transcriação · ainda faltam revisão independente de idioma, cultura, acessibilidade, direitos e produto','abrir SUTI.world em português'),
 'zh-hans': ('简体中文','ltr','转创预览 · 语言、文化、无障碍、权利与产品审阅尚未完成','以简体中文打开 SUTI.world'),
 'hi': ('हिन्दी','ltr','रचनात्मक अनुवाद का पूर्वावलोकन · भाषा, संस्कृति, सुगम्यता, अधिकार और उत्पाद की स्वतंत्र समीक्षा बाकी है','SUTI.world हिन्दी में खोलें'),
 'fr': ('Français','ltr','aperçu de transcréation · relectures indépendantes linguistique, culturelle, accessibilité, droits et produit à effectuer','ouvrir SUTI.world en français'),
 'ar': ('العربية','rtl','معاينة تكييف إبداعي · ما زالت مراجعة اللغة والثقافة وإمكانية الوصول والحقوق والمنتج مطلوبة','افتح SUTI.world بالعربية'),
 'bn': ('বাংলা','ltr','রূপান্তরিত সৃজনশীল পাঠের প্রিভিউ · ভাষা, সংস্কৃতি, সহজপ্রাপ্যতা, অধিকার ও পণ্যের স্বাধীন পর্যালোচনা বাকি','SUTI.world বাংলায় খুলুন'),
 'eo': ('Esperanto','ltr','transkreada antaŭvido · sendependa lingva, kultura, alirebleca, jura kaj produkta revizio ankoraŭ necesas','malfermi SUTI.world en Esperanto'),
 'sa': ('संस्कृतम्','ltr','रचनात्मकानुवादस्य पूर्वावलोकनम् · भाषायाः संस्कृतेः सुलभतायाः अधिकाराणां उत्पादस्य च स्वतन्त्रसमीक्षा अपेक्षिता','SUTI.world संस्कृतेन उद्घाटय'),
 'la': ('Latina','ltr','transcreationis praevisio · recensiones linguae, culturae, accessibilitatis, iurium et operis adhuc necessariae','SUTI.world Latine aperi'),
 'yzh': ('язэхъ','ltr','авторская транскреация · язык, строй и звучание требуют сверки автором; это не историческая реконструкция','открыть SUTI.world через русскую основу'),
}
SOURCE_SHA = {
 'en':'69a059a2d9910525ea71798f1525f046a8e6cacf660db21ea42f8f321e390342',
 'es':'a68ca23ece37f9d47c7d98ff4b038d7a4d5b0925b118bc11fadc6b9668285ee1',
 'pt-br':'b855c2fb7654e8dfe6ce3bc8cf899ea1534a05da083c901f9741282a64656b59',
 'zh-hans':'315c45e77063ac99ee31a2a6b83c2835c68a4c2c6aad22e981af256651021f3c',
 'hi':'ef4c24848f210d3002f97fcb0d2f1ffa92dc7f22094f6574af0f823eaed76e4d',
 'fr':'2db7281f277f45628d55a336fecb57487896d8b7aafb268c943b9255dd44d298',
 'ar':'fb4679487b6fd626ba3323f212368834e33b355a0cd487ae71e6184743a0cd20',
 'bn':'db74de7a7efc536544c781eb961ecc966130450ee0f0951cbef8d203c69b90bd',
 'eo':'8fd599d5596197b957b681579bb4c18bcec021005420262add34c909a53c3a78',
 'sa':'25a34e9929bf1fd1caeab30c7a91aea4f49f9e1875b14f9ea242e78a03c9c757',
 'la':'1b9775ce60d91fcba3d21a8c485a3eb5e13bb9335b2dd2c10c6bb907b8c1fcdb',
 'yzh':'fcb578800a9c0564a8b3ff63f05a66a66d4686857405cf36310e17811aeda23a',
}
LANG_CHOICES = [(k, PAGE_META[k][0]) for k in LANGS]

def inline(text: str) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*([^*]+)\*', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    return text

def markdown_body(text: str) -> tuple[str,str]:
    lines=text.splitlines(); title='SUTI.world'; blocks=[]; para=[]; items=[]; list_open=False
    def close_para():
        nonlocal para
        if para:
            blocks.append('<p>'+inline(' '.join(x.strip() for x in para))+'</p>'); para=[]
    def close_list():
        nonlocal items,list_open
        if list_open:
            blocks.append('<ul>'+''.join('<li>'+inline(x)+'</li>' for x in items)+'</ul>'); items=[]; list_open=False
    for line in lines:
        s=line.strip()
        if not s:
            close_para(); close_list(); continue
        if s.startswith('# '):
            close_para(); close_list(); title=re.sub(r'^#\s*','',s); blocks.append('<h1>'+inline(title)+'</h1>')
        elif s.startswith('## '):
            close_para(); close_list(); blocks.append('<h2>'+inline(s[3:])+'</h2>')
        elif s.startswith('- '):
            close_para(); items.append(re.sub(r'^-\s*','',s)); list_open=True
        elif s.startswith('**') and s.endswith('**') and len(s)>4:
            close_para(); close_list(); blocks.append('<p class="route-line">'+inline(s)+'</p>')
        else:
            close_list(); para.append(s)
    close_para(); close_list()
    return title,'\n'.join(blocks)

def page(lang: str, body: str) -> str:
    name, direction, status, cta = PAGE_META[lang]
    title, rendered = markdown_body(body)
    options=''.join(f'<a lang="{html.escape(k)}" href="../{k}/"'+(' aria-current="page"' if k==lang else '')+'>'+html.escape(label)+'</a>' for k,label in LANG_CHOICES)
    app_lang = 'pt-BR' if lang=='pt-br' else ('ru' if lang=='yzh' else lang)
    return f'''<!doctype html>
<html lang="{html.escape(app_lang)}" dir="{direction}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow"><meta name="theme-color" content="#f4f0e8">
<title>{html.escape(title)} · SUTI.world</title>
<style>
:root{{--ivory:#f4f0e8;--ink:#25342f;--petrol:#365958;--turquoise:#57b8b0;--sunlight:#d6ad58;--line:#d8d5cc;--muted:#58635d;--surface:#fffdf8;color-scheme:light}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--ivory);color:var(--ink);font:1rem/1.72 Manrope,"Segoe UI",system-ui,sans-serif}}
main{{width:min(100% - 32px,780px);margin:clamp(24px,7vw,72px) auto}}.brand{{font:700 .84rem/1.2 system-ui,sans-serif;letter-spacing:.12em;color:var(--petrol)}}
article{{margin-top:20px;padding:clamp(22px,5vw,48px);background:var(--surface);border:1px solid var(--line);border-radius:24px;box-shadow:0 12px 42px #25342f0b}}
h1,h2{{font-family:"Nunito Sans",Manrope,system-ui,sans-serif;line-height:1.2;color:var(--petrol)}}h1{{font-size:clamp(1.8rem,5vw,3rem);margin:0 0 22px}}h2{{font-size:1.2rem;margin:34px 0 12px}}p{{margin:0 0 18px}}ul{{padding-inline-start:1.4rem;display:grid;gap:10px}}li::marker{{color:var(--turquoise)}}strong{{color:var(--petrol)}}.route-line{{padding:16px;border-inline-start:4px solid var(--turquoise);background:#ddf2ef;border-radius:8px}}
.status{{margin:18px 0;padding:14px 16px;border:1px solid #c5d8d2;border-radius:12px;background:#f2f8f5;color:#344740;font-size:.88rem}}.actions{{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}}.button{{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:10px 18px;border-radius:12px;background:var(--petrol);color:#fff;text-decoration:none;font-weight:700}}.button:focus-visible,a:focus-visible{{outline:3px solid var(--sunlight);outline-offset:3px}}nav{{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}}nav a{{padding:6px 10px;border:1px solid var(--line);border-radius:999px;color:var(--petrol);text-decoration:none;font-size:.82rem}}nav a[aria-current]{{background:var(--light-aqua,#ddf2ef);border-color:var(--turquoise)}}footer{{margin-top:18px;color:var(--muted);font-size:.82rem}}@media(prefers-reduced-motion:reduce){{*,*::before,*::after{{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}}}@media(prefers-color-scheme:dark){{:root{{--ivory:#15221e;--ink:#eef1eb;--petrol:#cce5dc;--line:#42534c;--surface:#1d2b26;--muted:#bac6bd;color-scheme:dark}}.route-line{{background:#243d37}}.status{{background:#22332d;color:#e7eee9}}nav a[aria-current]{{background:#29423c}}}}
</style></head><body><main><div class="brand">∴ SUTI.world · {html.escape(name)}</div><article>{rendered}
<div class="status" role="note">{html.escape(status)}</div>
<div class="actions"><a class="button" href="../../?lang={html.escape(app_lang)}#care">{html.escape(cta)}</a></div>
<nav aria-label="language">{options}</nav></article><footer>SUTI.world · preview route · page text is kept in this browser; this route does not collect answers</footer></main></body></html>'''

def main():
    OUT_DIR.mkdir(parents=True,exist_ok=True)
    records=[]
    for lang in LANGS:
        src=ENTRY_DIR/f'{lang}.md'
        raw=src.read_bytes(); text=raw.decode('utf-8')
        rendered=page(lang,text)
        out=OUT_DIR/lang/'index.html'; out.parent.mkdir(parents=True,exist_ok=True); out.write_text(rendered,encoding='utf-8')
        records.append({'locale':lang,'source_file':str(src.relative_to(ROOT)),'source_sha256':hashlib.sha256(raw).hexdigest(),'upstream_source_sha256':SOURCE_SHA.get(lang),'source_origin':'author-provided local language draft; private source path withheld' if lang in SOURCE_SHA else 'author-created Russian entry for this site candidate','page_file':str(out.relative_to(ROOT)),'page_sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'transcreation_status':'DRAFT_REVIEW_REQUIRED','runtime_interface_status':'ACTIVE' if lang in ['ru','en','es','pt-br'] else 'RUSSIAN_FALLBACK','publication_status':'DRAFT_PR_ONLY','note':'Yazekh is an authorial language experiment, not a historical reconstruction' if lang=='yzh' else None})
    (OUT_DIR/'manifest.json').write_text(json.dumps({'schema':'suti.locale-entry-pages.v1','default_locale':'ru','locales':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'generated {len(records)} language entry pages')

if __name__=='__main__': main()
