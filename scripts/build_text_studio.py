#!/usr/bin/env python3
"""Build the local standalone text studio from selected public sources only.

Uses an already installed TypeScript package; no install or network is used.
Use --typescript /path/to/typescript.js to reproduce compilation explicitly.
Without a compiler, --check validates the pinned compiled hash and source binding.
"""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'locales/text-studio'
CODES = ['ru', 'en', 'es', 'pt-br', 'zh-hans', 'hi', 'fr', 'ar', 'bn', 'eo', 'sa', 'la', 'yzh']
PROFILES = ['synaura', 'syntaxium', 'clear', 'message', 'compact', 'poetry', 'faithful']
STRUCTURE = ['lines', 'headings', 'paragraphs', 'listItems', 'quotes', 'codeBlocks', 'tableRows']


def digest(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    return json.loads(path.read_text())


def encoded(data):
    return json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')


def compile_core(typescript):
    source = (SOURCE / 'formatter-source.ts').read_bytes()
    script = r'''
const fs=require('node:fs');
const ts=require(process.argv[1]||'typescript');
const source=fs.readFileSync(0,'utf8');
const syntax=ts.createSourceFile('formatter-source.ts',source,ts.ScriptTarget.Latest,true);
if(syntax.statements.some(n=>ts.isImportDeclaration(n)||ts.isImportEqualsDeclaration(n)||ts.isExportDeclaration(n)))throw new Error('Pure formatter must have no imports or re-exports');
const result=ts.transpileModule(source,{fileName:'formatter-source.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,newLine:ts.NewLineKind.LineFeed,removeComments:false}});
const errors=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
if(errors.length)throw new Error(ts.formatDiagnosticsWithColorAndContext(errors,{getCanonicalFileName:x=>x,getCurrentDirectory:()=>'.',getNewLine:()=> '\n'}));
process.stdout.write(JSON.stringify({version:ts.version,code:result.outputText}));
'''
    process = subprocess.run(['node', '-e', script, typescript or 'typescript'], input=source, capture_output=True)
    if process.returncode:
        # A static Pages checkout need not carry TypeScript or node_modules.
        # Keep the already reproduced compiler output only when its public hash,
        # source fingerprint and license text all match the pinned provenance.
        if not typescript:
            target = ROOT / 'assets/js/text-studio-core.js'
            provenance = read_json(SOURCE / 'provenance.v1.json')
            if target.exists():
                cached = target.read_bytes()
                license_prefix = '/*!\n' + (ROOT / 'LICENSE').read_text().strip().replace('*/', '* /')
                if (digest(cached) == provenance.get('classic_core_sha256')
                        and digest(source) == provenance.get('formatter_source_sha256')
                        and cached.decode().startswith(license_prefix)
                        and ('Source SHA-256: ' + digest(source)) in cached.decode()):
                    return cached.decode()
        raise SystemExit('Local TypeScript compilation failed; supply --typescript if needed:\n' + process.stderr.decode())
    compiled = json.loads(process.stdout)
    license_text = (ROOT / 'LICENSE').read_text().strip()
    banner = '/*!\n' + license_text.replace('*/', '* /') + '\n\nSource: apps/suti-world/src/services/text-studio.ts\nSource SHA-256: ' + digest(source) + '\nTypeScript: ' + compiled['version'] + '\n*/\n'
    wrapper = "(function(root){'use strict';const exports={};\n" + compiled['code'] + "\nconst api=Object.freeze({profileOptions:exports.profileOptions,formatText:exports.formatText,inspectTextStructure:exports.inspectTextStructure});root.SutiTextStudioCore=api;if(typeof module==='object'&&module&&module.exports)module.exports=api;})(typeof globalThis==='object'?globalThis:this);\n"
    return banner + wrapper


def build(typescript):
    source = read_json(SOURCE / 'source.ru.json')
    source_sha = digest((SOURCE / 'source.ru.json').read_bytes())
    formatter_sha = digest((SOURCE / 'formatter-source.ts').read_bytes())
    editions = {code: read_json(SOURCE / (code + '.json')) for code in CODES}
    for code, edition in editions.items():
        strings = edition['strings']
        if set(strings) != set(source['strings']) or set(edition['profiles']) != set(PROFILES):
            raise ValueError('Incomplete text studio edition ' + code)
        for key, value in strings.items():
            if key == 'structureLabels':
                if set(value) != set(STRUCTURE) or not all(isinstance(s, str) and s.strip() for s in value.values()):
                    raise ValueError('Incomplete structure labels ' + code)
            elif not isinstance(value, str) or not value.strip():
                raise ValueError('Empty text studio label ' + code + ':' + key)
        if strings['countTemplate'].count('{count}') != 1:
            raise ValueError('Invalid count template ' + code)
        if not all(isinstance(s, str) and s.strip() for s in edition['profiles'].values()):
            raise ValueError('Incomplete profile descriptions ' + code)
        if edition['source_sha256'] != source_sha or edition['formatter_source_sha256'] != formatter_sha:
            raise ValueError('Text studio source drift ' + code)
        if code == 'yzh' and (edition['contentLanguage'] != 'ru' or edition['status'] != 'RU_GLOSS_EXPERIMENTAL'):
            raise ValueError('Yzh must remain an explicit Russian gloss')
    core = compile_core(typescript)
    provenance = read_json(SOURCE / 'provenance.v1.json')
    provenance['classic_core_sha256'] = digest(core.encode())
    provenance['build_check'] = 'Full recompilation with --typescript or a locally resolved compiler; otherwise pinned core hash, source/license binding and deterministic standalone output check'
    # Inline CSS/JS works for both the standalone URL and the site's local embedded route.
    # Fonts stay same-origin; no user text enters a URL or request.
    shared_css = (ROOT / 'assets/css/suti-angels-editorial.css').read_text().replace('../fonts/', 'assets/fonts/')
    data = {'schema': 'suti.text-studio.runtime.v1', 'editions': editions, 'formatter_source_sha256': formatter_sha}
    html = (SOURCE / 'page.template.html').read_text().replace('@@SHARED_CSS@@', shared_css).replace('@@ATLAS_CSS@@', (ROOT / 'assets/css/world-atlas.css').read_text()).replace('@@FORMATTER_SHA@@', formatter_sha).replace('@@DATA@@', encoded(data)).replace('@@CORE@@', core.replace('</script', '<\\/script')).replace('@@UI@@', (ROOT / 'assets/js/text-studio.js').read_text())
    if any(token in html for token in ['@@SHARED_CSS@@', '@@ATLAS_CSS@@', '@@FORMATTER_SHA@@', '@@DATA@@', '@@CORE@@', '@@UI@@']):
        raise ValueError('Unresolved template token')
    coverage = {'schema': 'suti.text-studio.coverage.v1', 'source_sha256': source_sha, 'formatter_source_sha256': formatter_sha, 'profiles': PROFILES, 'routes': {code: {'href': 'text-studio.html?lang=' + code, 'contentLanguage': e['contentLanguage'], 'direction': e['direction'], 'status': e['status'], 'native_review': 'HOLD', 'string_fields': len(e['strings']), 'human_leaf_strings': len(e['strings']) - 1 + len(STRUCTURE), 'profile_descriptions': len(e['profiles'])} for code, e in editions.items()}, 'runtime': 'deterministic mechanical formatter; no model/network/text storage', 'scope': '13 complete selected UI editions; full-site/native review not implied'}
    return {'assets/js/text-studio-core.js': core, 'text-studio.html': html, 'locales/text-studio/coverage.v1.json': json.dumps(coverage, ensure_ascii=False, indent=2) + '\n', 'locales/text-studio/provenance.v1.json': json.dumps(provenance, ensure_ascii=False, indent=2) + '\n'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--typescript', help='Existing TypeScript module path; no install is attempted')
    args = parser.parse_args()
    outputs = build(args.typescript)
    for relative, text in outputs.items():
        target = ROOT / relative
        if args.check:
            if not target.exists() or target.read_text() != text:
                raise SystemExit('Stale text studio output ' + relative)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(text)
    print('Text studio: 13 complete UI routes, 7 profiles; ' + ('verified' if args.check else 'rendered'))


if __name__ == '__main__':
    main()
