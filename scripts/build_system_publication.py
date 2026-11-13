#!/usr/bin/env python3
"""Build static HTML from the selected 222-file public system source manifest.

Verify source hashes, render escaped Markdown, localize publication UI and preserve
review/runtime boundaries. This does not build or deploy the React application.
"""
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit
import os
import hashlib
import html
import json
import re

PACKAGE = Path(__file__).resolve().parents[1]
SYSTEM = PACKAGE / 'system'
SOURCE_MANIFEST = SYSTEM / 'candidate-source-manifest.json'
ESC = html.escape
BT = chr(96)
INLINE = re.compile(
    re.escape(BT) + r"([^" + re.escape(BT) + r"]+)" + re.escape(BT)
    + r"|\[([^\]]+)\]\(([^)]+)\)"
    + r"|\*\*([^*]+)\*\*"
    + r"|(?<!\*)\*([^*\n]+)\*(?!\*)"
)
HEADING = re.compile(r"^(#{1,6})\s+(.+?)\s*#*\s*$")
ORDERED = re.compile(r"^\s*(\d+)[.)]\s+(.+)$")
UNORDERED = re.compile(r"^\s*[-+*]\s+(.+)$")


def local_target(target, guide, package=PACKAGE):
    raw = unquote(target.strip())
    if not raw or any(ord(ch) < 32 for ch in raw):
        return None
    parsed = urlsplit(raw)
    if parsed.scheme:
        return raw if parsed.scheme in ('http','https') else None
    if parsed.netloc or raw.startswith(('/', '\\\\')):
        return None
    if raw.startswith('#'):
        return raw
    dest = (guide.parent / parsed.path).resolve()
    try:
        dest.relative_to(SYSTEM.resolve())
    except ValueError:
        return None
    if not dest.exists():
        return None
    if dest.suffix.lower() == '.md':
        dest=dest.with_suffix('.html')
    relative=os.path.relpath(dest,guide.parent)
    return urlunsplit(('', '', relative, parsed.query, parsed.fragment))

def inline(text, guide, package=PACKAGE):
    """Escape source text before emitting a few safe inline elements."""
    result = []
    at = 0
    for match in INLINE.finditer(text):
        result.append(ESC(text[at:match.start()]))
        code, label, target, strong, emphasis = match.groups()
        if code is not None:
            result.append('<code dir="ltr">' + ESC(code) + "</code>")
        elif label is not None:
            href = local_target(target, guide, package)
            if href:
                result.append('<a href="' + ESC(href, quote=True) + '">' + ESC(label) + "</a>")
            else:
                result.append(ESC(label) + ' <span class="plain-target">(' + ESC(target) + ")</span>")
        elif strong is not None:
            result.append("<strong>" + ESC(strong) + "</strong>")
        else:
            result.append("<em>" + ESC(emphasis) + "</em>")
        at = match.end()
    result.append(ESC(text[at:]))
    return "".join(result)


def cells(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [value.strip().replace(r"\|", "|") for value in re.split(r"(?<!\\)\|", line)]


def is_separator(line):
    values = cells(line)
    return bool(values) and all(re.fullmatch(r":?-{3,}:?", value.replace(" ", "")) for value in values)


def prepare_markdown(text):
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    if text.startswith("---\n"):
        split = text.find("\n---", 4)
        if split >= 0:
            text = text[split + 4:].lstrip("\n")
    text = re.sub(r"<!--\s*suti:section:[a-z-]+\s*-->", "", text)
    # The viewer supplies trusted lang/dir attributes itself. Source HTML is never executed.
    text = re.sub(r"^\s*<div\s+(?=[^>]*\bdir=)[^>]*>\s*$", "", text, flags=re.M)
    text = re.sub(r"^\s*</div>\s*$", "", text, flags=re.M)
    return text


def render_markdown(text, guide, package=PACKAGE):
    lines = prepare_markdown(text).splitlines()
    blocks = []
    i = 0
    fence = BT * 3
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.lstrip().startswith(fence):
            values = []
            i += 1
            while i < len(lines) and not lines[i].lstrip().startswith(fence):
                values.append(lines[i])
                i += 1
            i += i < len(lines)
            blocks.append('<pre dir="ltr"><code>' + ESC("\n".join(values)) + "</code></pre>")
            continue
        heading = HEADING.match(line)
        if heading:
            level = len(heading[1])
            slug = re.sub(r"[^\w\s-]", "", heading[2].lower()); slug = re.sub(r"\s+", "-", slug.strip())
            blocks.append('<h' + str(level) + ' id="' + ESC(slug, quote=True) + '">' + inline(heading[2], guide, package) + '</h' + str(level) + '>')
            i += 1
            continue
        if re.fullmatch(r"\s*(?:-{3,}|\*{3,}|_{3,})\s*", line):
            blocks.append("<hr>")
            i += 1
            continue
        if i + 1 < len(lines) and "|" in line and is_separator(lines[i + 1]):
            headers = cells(line)
            align_cells = cells(lines[i + 1])
            table = ['<div class="table-scroll" tabindex="0" role="region" aria-label="' + ESC(headers[0], quote=True) + '"><table><thead><tr>']
            table.extend("<th scope=\"col\">" + inline(value, guide, package) + "</th>" for value in headers)
            table.append("</tr></thead><tbody>")
            i += 2
            while i < len(lines) and "|" in lines[i] and lines[i].strip():
                row = cells(lines[i])
                row = (row + [""] * len(headers))[:len(headers)]
                table.append("<tr>" + "".join("<td>" + inline(value, guide, package) + "</td>" for value in row) + "</tr>")
                i += 1
            table.append("</tbody></table></div>")
            blocks.append("".join(table))
            continue
        ordered = ORDERED.match(line)
        unordered = UNORDERED.match(line)
        if ordered or unordered:
            tag = "ol" if ordered else "ul"
            pattern = ORDERED if ordered else UNORDERED
            items = []
            while i < len(lines):
                item = pattern.match(lines[i])
                if not item:
                    break
                value = item[2] if ordered else item[1]
                items.append("<li>" + inline(value, guide, package) + "</li>")
                i += 1
            blocks.append("<" + tag + ">" + "".join(items) + "</" + tag + ">")
            continue
        if line.startswith(">"):
            values = []
            while i < len(lines) and lines[i].startswith(">"):
                values.append(lines[i][1:].lstrip())
                i += 1
            blocks.append("<blockquote>" + "<br>".join(inline(value, guide, package) for value in values) + "</blockquote>")
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip():
            upcoming = lines[i]
            if HEADING.match(upcoming) or ORDERED.match(upcoming) or UNORDERED.match(upcoming) or upcoming.startswith(">") or re.fullmatch(r"\s*-{3,}\s*", upcoming):
                break
            if i + 1 < len(lines) and "|" in upcoming and is_separator(lines[i + 1]):
                break
            paragraph.append(upcoming)
            i += 1
        blocks.append("<p>" + "<br>".join(inline(value, guide, package) for value in paragraph) + "</p>")
    return "\n".join(blocks)

LABELS={
'ru':'публичный редакционный черновик · фонд, выплаты, бот и сеть участников не запущены',
'en':'public editorial draft · no active fund, payouts, bot or participant network',
'es':'borrador editorial público · sin fondo, pagos, bot ni red de participantes activos',
'pt-br':'rascunho editorial público · fundo, pagamentos, bot e rede de participantes não estão ativos',
'zh-hans':'公开编辑草稿 · 基金、付款、机器人与参与者网络尚未启动',
'hi':'सार्वजनिक संपादकीय मसौदा · निधि, भुगतान, बॉट या प्रतिभागी नेटवर्क सक्रिय नहीं हैं',
'fr':'brouillon éditorial public · fonds, versements, bot et réseau de participants non activés',
'ar':'مسودة تحريرية عامة · الصندوق والمدفوعات والبوت وشبكة المشاركين غير مفعلة',
'bn':'প্রকাশ্য সম্পাদকীয় খসড়া · তহবিল, অর্থপ্রদান, বট বা অংশগ্রহণকারী নেটওয়ার্ক চালু নয়',
'eo':'publika redakcia malneto · fonduso, pagoj, roboto kaj partoprenanta reto ne estas aktivaj',
'sa':'सार्वजनिकं सम्पादकीयप्रारूपम् · निधिः, धनप्रदानं, बॉट्, सहभागिजालं च न प्रवर्तितम्',
'la':'adumbratio editorialis publica · fundus, solutiones, robotum et rete participantium nondum activa sunt',
'yzh':'публичный редакционный черновик · авторская глосса Язэхъ ожидается · фонд и сеть не запущены'
}
UI={'ru': ['сведения о публикации', 'подробный план', 'основные страницы и краткий маршрут доступны на русском; подробный план — RU/EN, полное ТЗ бота — RU', 'публикация и права', 'редакция опубликована по решению автора. исходные статусы проверки сохранены. открытый доступ не назначает лицензию CC/MIT; действуют условия каждого материала. независимая языковая проверка ожидается'], 'en': ['publication information', 'detailed plan', 'core pages and the short route are available in English; the detailed plan is RU/EN and the full bot specification is RU', 'publication and rights', 'published by the author’s decision. original review states are retained. public access does not grant a CC/MIT licence; each material keeps its own terms. independent language review is pending'], 'es': ['información de publicación', 'plan detallado', 'las páginas principales y el recorrido breve están en español; el plan detallado está en RU/EN y la especificación completa del bot en RU', 'publicación y derechos', 'publicado por decisión del autor. se conservan los estados originales de revisión. el acceso público no concede una licencia CC/MIT; cada material mantiene sus condiciones. la revisión lingüística independiente está pendiente'], 'pt-br': ['informações de publicação', 'plano detalhado', 'as páginas principais e o percurso breve estão em português; o plano detalhado está em RU/EN e a especificação completa do bot em RU', 'publicação e direitos', 'publicado por decisão do autor. os status originais de revisão são mantidos. o acesso público não concede uma licença CC/MIT; cada material mantém seus próprios termos. a revisão linguística independente está pendente'], 'zh-hans': ['发布信息', '详细计划', '核心页面和简要路径已有简体中文版；详细计划仅有俄语和英语版，完整机器人规范仅有俄语版', '发布与权利', '本版本经作者决定公开。保留原有审阅状态。公开访问不代表授予 CC/MIT 许可；各材料仍适用各自条款。独立语言审阅尚未完成'], 'hi': ['प्रकाशन की जानकारी', 'विस्तृत योजना', 'मुख्य पृष्ठ और संक्षिप्त मार्ग हिन्दी में उपलब्ध हैं; विस्तृत योजना RU/EN में और बॉट का पूरा विनिर्देश RU में है', 'प्रकाशन और अधिकार', 'लेखक के निर्णय से प्रकाशित। मूल समीक्षा-स्थितियाँ सुरक्षित हैं। सार्वजनिक पहुँच CC/MIT लाइसेंस नहीं देती; प्रत्येक सामग्री की अपनी शर्तें लागू हैं। स्वतंत्र भाषाई समीक्षा लंबित है'], 'fr': ['informations de publication', 'plan détaillé', 'les pages principales et le parcours court sont disponibles en français ; le plan détaillé est en RU/EN et la spécification complète du bot en RU', 'publication et droits', 'publication décidée par l’auteur. les statuts de révision d’origine sont conservés. l’accès public n’accorde pas de licence CC/MIT ; chaque document conserve ses conditions. la révision linguistique indépendante reste en attente'], 'ar': ['معلومات النشر', 'الخطة التفصيلية', 'الصفحات الأساسية والمسار المختصر متاحان بالعربية؛ الخطة التفصيلية بالروسية والإنجليزية، والمواصفات الكاملة للبوت بالروسية فقط', 'النشر والحقوق', 'نُشرت هذه النسخة بقرار المؤلف مع الاحتفاظ بحالات المراجعة الأصلية. لا يمنح الوصول العام ترخيص CC/MIT؛ تبقى لكل مادة شروطها. المراجعة اللغوية المستقلة لم تكتمل بعد'], 'bn': ['প্রকাশনার তথ্য', 'বিস্তারিত পরিকল্পনা', 'মূল পৃষ্ঠা ও সংক্ষিপ্ত পথ বাংলায় আছে; বিস্তারিত পরিকল্পনা RU/EN-এ এবং বটের পূর্ণ বিবরণ RU-এ আছে', 'প্রকাশনা ও অধিকার', 'লেখকের সিদ্ধান্তে প্রকাশিত। মূল পর্যালোচনার অবস্থা অক্ষুণ্ণ আছে। প্রকাশ্য প্রবেশাধিকার CC/MIT লাইসেন্স দেয় না; প্রতিটি উপকরণের নিজস্ব শর্ত বহাল। স্বাধীন ভাষাগত পর্যালোচনা বাকি'], 'eo': ['publikigaj informoj', 'detala plano', 'la kernaj paĝoj kaj mallonga vojo disponeblas en Esperanto; la detala plano estas en RU/EN, kaj la plena robotspecifo en RU', 'publikigo kaj rajtoj', 'publikigita laŭ la decido de la aŭtoro. originaj reviziaj statoj restas. publika aliro ne donas CC/MIT-permesilon; ĉiu materialo konservas siajn kondiĉojn. sendependa lingva revizio ankoraŭ necesas'], 'sa': ['प्रकाशनविवरणम्', 'विस्तृतयोजना', 'मुख्यपृष्ठानि संक्षिप्तमार्गश्च संस्कृते उपलब्धाः; विस्तृतयोजना RU/EN-भाषयोः, बॉट्-सम्पूर्णविशिष्टता च RU-भाषायामेव', 'प्रकाशनम् अधिकाराश्च', 'लेखकस्य निर्णयेन प्रकाशितम्। मूलपरीक्षणस्थितयः रक्षिताः। सार्वजनिकप्रवेशेन CC/MIT-अनुज्ञा न दीयते; प्रत्येकसामग्र्याः स्वकीयाः शर्ताः प्रवर्तन्ते। स्वतन्त्रभाषापरीक्षा अपेक्षिता'], 'la': ['notitia publicationis', 'consilium explicatum', 'paginae principales et iter breve Latine praesto sunt; consilium explicatum RU/EN, plena robotis specificatio RU tantum', 'publicatio et iura', 'ex auctoris sententia publicatum. status pristini recognitionis servantur. accessus publicus licentiam CC/MIT non confert; cuiusque materiae condiciones manent. recognitio linguae independens adhuc exspectatur'], 'yzh': ['сведения о публикации · русский глосс', 'подробный план', 'Язэхъ: здесь русский смысловой глосс, не готовый перевод; подробный план — RU/EN, полное ТЗ бота — RU', 'публикация и права · русский глосс', 'опубликовано по решению автора. Язэхъ остаётся экспериментальным маршрутом с русской развёрткой и требует авторского принятия. независимая языковая проверка ожидается; открытый доступ не назначает CC/MIT']}
LANGS=list(LABELS)
TAGS={'pt-br':'pt-BR','zh-hans':'zh-Hans','yzh':'ru'}
EXTRA_CSS="""
main{max-width:74ch;margin:auto;padding:2rem 1.2rem 4rem}pre{white-space:pre-wrap;overflow-wrap:anywhere}
table{border-collapse:collapse;min-width:32rem;width:100%}th,td{padding:.6rem;text-align:start;border:1px solid #b9c5b3}.table-scroll{overflow-x:auto}
.publication-note{padding:1rem;border-inline-start:4px solid #996200;background:#fffdf8;color:#20392f}
nav{display:flex;gap:1rem;flex-wrap:wrap}a:focus-visible{outline:3px solid #996200;outline-offset:3px}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
"""
def relpath(target,base):return Path(os.path.relpath(target,base)).as_posix()
def main():
    manifest=json.loads(SOURCE_MANIFEST.read_text())
    assert len(manifest['files'])==222
    source_rows=manifest['files']
    for row in source_rows:
        path=SYSTEM/row['path'];data=path.read_bytes()
        assert len(data)==row['bytes'] and hashlib.sha256(data).hexdigest()==row['sha256'],row['path']
    derived=[]
    for row in source_rows:
        path=SYSTEM/row['path']
        if path.suffix.lower()!='.md':continue
        text=path.read_text()
        parts=Path(row['path']).parts
        loc=next((x for x in parts if x in LANGS),'ru')
        declared=re.search(r'^locale\s*::\s*([a-z-]+)',text,re.M)
        if declared and declared.group(1) in LANGS:loc=declared.group(1)
        elif path.name.endswith('.en.md'):loc='en'
        target=path.with_suffix('.html')
        heading=next((x[2:].strip() for x in prepare_markdown(text).splitlines() if x.startswith('# ')),path.stem)
        css=relpath(PACKAGE/'assets/css/suti-angels-editorial.css',target.parent)
        home=relpath(SYSTEM/'index.html',target.parent)+'?lang='+loc
        note=relpath(SYSTEM/('publication-note.'+loc+'.html'),target.parent)
        body=render_markdown(text,path)
        html='<!doctype html><html lang="'+TAGS.get(loc,loc)+'" dir="'+('rtl' if loc=='ar' else 'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+ESC(heading)+'</title><link rel="stylesheet" href="'+ESC(css,quote=True)+'"><style>'+EXTRA_CSS+'</style></head><body><main><nav><a href="'+ESC(home,quote=True)+'">SUTI · '+loc+'</a><a href="'+ESC(path.name,quote=True)+'">Markdown</a><a href="'+ESC(note,quote=True)+'">'+ESC(UI[loc][0])+'</a></nav><p class="publication-note">'+ESC(LABELS[loc])+'</p>'+body+'</main></body></html>'
        target.write_text(html)
        derived.append(target)
    original=SYSTEM/'_techne/site/collective-living-system-v1/index.html'
    text=original.read_text()
    match=re.search(r'const data=(.*?),langLabels=',text,re.S);assert match
    data=json.loads(match.group(1))
    portal=original.with_name('portal.html')
    for loc,row in data.items():
        for key in ['home_href','fund_href']:row[key]=row[key].removesuffix('.md')+'.html'
        row['contour_hrefs']={key:value.removesuffix('.md')+'.html' for key,value in row['contour_hrefs'].items()}
    text=text[:match.start(1)]+json.dumps(data,ensure_ascii=False,separators=(',',':'))+text[match.end(1):]
    css=relpath(PACKAGE/'assets/css/suti-angels-editorial.css',portal.parent)
    text=text.replace('<style>','<link rel="stylesheet" href="'+css+'"><style>',1)
    text=text.replace('<main><nav','<main><p class="status" id="publication-overlay"></p><nav',1)
    text=text.replace('function render(locale){const d=data[locale]||data.ru;','const publicationLabels='+json.dumps(LABELS,ensure_ascii=False,separators=(',',':'))+';function render(locale){const d=data[locale]||data.ru;text("publication-overlay",publicationLabels[locale]||publicationLabels.ru);',1)
    text=text.replace('</footer>','<p><a id="publication-note-link"></a></p><p class="quiet" id="language-coverage-note"></p></footer>',1)
    text=text.replace('<p><a id="fund-link"></a></p>', '<p><a id="fund-link"></a></p><p class="quiet"><span id="detailed-plan-label"></span> · <a href="../../human/collective-living-system-v1/fund-plan/plan.ru.html">RU</a> · <a href="../../human/collective-living-system-v1/fund-plan/plan.en.html">EN</a></p>', 1)
    localized_ui='const localeUI='+json.dumps(UI,ensure_ascii=False,separators=(',',':'))+';'
    text=text.replace('const publicationLabels=',localized_ui+'const publicationLabels=',1)
    text=text.replace('text("publication-overlay",publicationLabels[locale]||publicationLabels.ru);','text("publication-overlay",publicationLabels[locale]||publicationLabels.ru);const u=localeUI[locale]||localeUI.ru;const n=document.getElementById("publication-note-link");n.href="../../../publication-note."+locale+".html";n.textContent=u[0];text("language-coverage-note",u[2]);text("detailed-plan-label",u[1]);',1)
    text=text.replace("const chosen=new URLSearchParams(location.search).get('lang')||'ru';render(data[chosen]?chosen:'ru');", "const aliases={'es-419':'es','pt':'pt-br','zh-cn':'zh-hans','zh':'zh-hans'};const raw=(new URLSearchParams(location.search).get('lang')||'ru').toLowerCase().replaceAll('_','-');const chosen=aliases[raw]||raw;render(data[chosen]?chosen:'ru');")
    text=text.replace("document.getElementById('language').addEventListener('change',e=>render(e.target.value));", "document.getElementById('language').addEventListener('change',e=>{render(e.target.value);const q=new URL(location.href);q.searchParams.set('lang',e.target.value);history.replaceState(null,'',q)});")
    portal.write_text(text);derived.append(portal)
    entry=SYSTEM/'index.html'
    entry.write_text('''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SUTI · общественная редакционная система</title></head><body><main><h1>SUTI · редакционный preview</h1><p>фонд, выплаты, бот и сеть участников не запущены</p><p><a href="_techne/site/collective-living-system-v1/portal.html?lang=ru">открыть систему</a> · <a href="publication-note.html">источник и границы</a></p></main><script>const langs='''+json.dumps(LANGS)+''';const next=new URL('_techne/site/collective-living-system-v1/portal.html',location.href);const raw=(new URLSearchParams(location.search).get('lang')||'ru').toLowerCase().replaceAll('_','-');const aliases={'es-419':'es','pt':'pt-br','zh-cn':'zh-hans','zh':'zh-hans'};const lang=aliases[raw]||raw;if(langs.includes(lang))next.searchParams.set('lang',lang);if(location.hash)next.hash=location.hash;location.replace(next.href);</script></body></html>''')
    derived.append(entry)
    for loc,u in UI.items():
        notice=SYSTEM/('publication-note.'+loc+'.html')
        notice.write_text('<!doctype html><html lang="'+TAGS.get(loc,loc)+'" dir="'+('rtl' if loc=='ar' else 'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+ESC(u[3])+'</title><style>'+EXTRA_CSS+'</style></head><body><main><nav><a href="index.html?lang='+loc+'">SUTI · '+loc+'</a></nav><h1>'+ESC(u[3])+'</h1><p>'+ESC(u[4])+'</p><p>'+ESC(LABELS[loc])+'</p><p>'+ESC(u[2])+'</p></main></body></html>')
        derived.append(notice)
    rows=[]
    for path in derived:
        b=path.read_bytes();rows.append({'path':path.relative_to(SYSTEM).as_posix(),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
    (SYSTEM/'derivative-manifest.json').write_text(json.dumps({'schema':'suti.public-static-derivative.v1','date':'2026-11-13','source_allowlist_entries':222,'source_files_unchanged':True,'generated_files':rows,'transformation':'escaped HTML counterparts; public portal hrefs rebased; publication overlay added; no source review/runtime/financial/youth gate upgrades','publication':'owner-authorized draft display; no automatic license grant'},ensure_ascii=False,indent=2)+'\n')
    print('source222 exact; generated HTML',len(derived))
if __name__=='__main__':main()
