/* Copyright (c) 2026 Ezar Garuna. MIT License; see LICENSE.
 * Local text studio controls. User text never enters preferences, URLs or requests. */
(function () {
  'use strict';
  const data=JSON.parse(document.getElementById('text-studio-data').textContent);
  const Core=globalThis.SutiTextStudioCore;
  const $=id=>document.getElementById(id);
  const editions=data.editions,codes=Object.keys(editions);
  const profiles=['synaura','syntaxium','clear','message','compact','poetry','faithful'];
  const rules=[['lowercase','lowercase'],['shortDashes','dashes'],['lightEndings','endings'],['cleanSpacing','spacing'],['protectQuotes','protectQuotes'],['protectMarkup','protectMarkup']];
  const names={ru:'Русский',en:'English',es:'Español','pt-br':'Português brasileiro','zh-hans':'简体中文',hi:'हिन्दी',fr:'Français',ar:'العربية',bn:'বাংলা',eo:'Esperanto',sa:'संस्कृतम्',la:'Latina',yzh:'язэхъ · RU gloss'};
  function normalize(value){const key=typeof value==='string'?value.trim().toLowerCase():'';const next=key==='es-419'?'es':key;return codes.includes(next)?next:null;}
  function stored(key){try{return localStorage.getItem(key);}catch{return null;}}
  function savePreference(key,value){try{localStorage.setItem(key,value);}catch{/* Display choice is optional. */}}
  const query=new URLSearchParams(location.search),themes=['day','night','contrast'];
  let language=normalize(query.get('lang'))||normalize(stored('suti-locale'))||'ru';
  let theme=themes.includes(query.get('theme'))?query.get('theme'):themes.includes(stored('suti-theme'))?stored('suti-theme'):'day';
  let profile='synaura',overrides={},copyEpoch=0,copyTimer=null,copyState='',formatFailed=false;
  const source=$('studio-source'),result=$('studio-result'),protectedTerms=$('studio-protected');
  const t=()=>editions[language].strings;
  function element(tag,text){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;}
  function setURL(){try{const url=new URL(location.href);url.searchParams.set('lang',language);url.searchParams.set('theme',theme);history.replaceState(history.state,'',url);}catch{/* The tool also works without history access. */}}
  function currentOptions(){return {...Core.profileOptions[profile],...overrides,protectedTerms:protectedTerms.value.split('\n').map(term=>term.trim()).filter(Boolean)};}
  function clearCopy(){copyEpoch++;if(copyTimer!==null){clearTimeout(copyTimer);copyTimer=null;}copyState='';}
  function status(){const text=t();$('studio-copy').textContent=copyState==='copied'?text.copied:text.copy;$('studio-copy').disabled=!result.value;$('studio-manual').disabled=!result.value;$('studio-feedback').textContent=formatFailed?'FORMAT_ERROR · '+text.caseNote:(copyState==='failed'?text.copyFailed:(source.value===result.value?text.noChanges:text.previewReady));}
  function structure(){const text=t(),summary=Core.inspectTextStructure(source.value),root=$('studio-structure');root.replaceChildren();for(const [key,count]of Object.entries(summary)){const item=element('span');item.append(element('strong',String(count)),document.createTextNode(' '+text.structureLabels[key]));root.append(item);}$('studio-structure-section').hidden=!source.value;}
  function counters(){const text=t();$('studio-source-count').textContent=text.countTemplate.replace('{count}',String(source.value.length));$('studio-result-count').textContent=text.countTemplate.replace('{count}',String(result.value.length));}
  function syncRules(){const options=currentOptions();for(const [key]of rules)$('rule-'+key).checked=options[key];$('studio-profile-description').textContent=editions[language].profiles[profile];}
  function update(){clearCopy();formatFailed=false;try{result.value=Core.formatText(source.value,currentOptions());}catch{formatFailed=true;result.value=source.value;}syncRules();structure();counters();status();}
  function renderLabels(){const edition=editions[language],text=t();document.documentElement.lang=edition.contentLanguage;document.documentElement.dir=edition.direction;document.title=text.title+' · SUTI.world';document.querySelectorAll('[data-studio-ui]').forEach(node=>node.textContent=text[node.dataset.studioUi]);$('studio-language-label').textContent=edition.languageLabel;$('studio-language').value=language;$('studio-review-note').textContent=edition.reviewNote;$('studio-review-status').textContent=edition.status+' · native review HOLD';$('studio-back').href='world-atlas.html?lang='+encodeURIComponent(language);$('studio-catalog').href='modules.html?lang='+encodeURIComponent(language);$('studio-profile').replaceChildren();for(const id of profiles){const option=element('option',text[id]);option.value=id;$('studio-profile').append(option);}$('studio-profile').value=profile;source.placeholder=text.prompt;result.placeholder=text.empty;result.setAttribute('aria-label',text.result);protectedTerms.placeholder=text.protectHint+'\nSUTI.world';syncRules();structure();counters();status();setURL();}
  function setLanguage(next){const value=normalize(next);if(!value)return;language=value;renderLabels();savePreference('suti-locale',language);}
  function setTheme(next,persist=true){if(!themes.includes(next))return;theme=next;document.documentElement.dataset.theme=theme;document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===theme)));setURL();if(persist)savePreference('suti-theme',theme);}
  for(const code of codes){const option=element('option',names[code]);option.value=code;$('studio-language').append(option);}
  $('studio-language').addEventListener('change',event=>setLanguage(event.target.value));
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>setTheme(button.dataset.themeChoice)));
  source.addEventListener('input',update);protectedTerms.addEventListener('input',update);
  $('studio-profile').addEventListener('change',event=>{if(!profiles.includes(event.target.value))return;profile=event.target.value;overrides={};update();});
  for(const [key]of rules)$('rule-'+key).addEventListener('change',event=>{overrides={...overrides,[key]:event.target.checked};update();});
  $('studio-copy').addEventListener('click',async()=>{clearCopy();status();const request=copyEpoch,value=result.value;if(!value)return;const current=()=>request===copyEpoch&&value===result.value;try{if(!navigator.clipboard?.writeText)throw new Error('CLIPBOARD_UNAVAILABLE');await navigator.clipboard.writeText(value);if(!current())return;copyState='copied';status();copyTimer=setTimeout(()=>{if(!current())return;copyTimer=null;copyState='';status();},1800);}catch{if(current()){copyState='failed';status();}}});
  $('studio-manual').addEventListener('click',()=>{result.focus();result.select();});
  $('studio-reset').addEventListener('click',()=>{clearCopy();source.value='';protectedTerms.value='';overrides={};update();source.focus();});
  window.addEventListener('storage',event=>{if(event.key==='suti-theme')setTheme(event.newValue,false);if(event.key==='suti-locale'&&normalize(event.newValue))setLanguage(event.newValue);});
  window.addEventListener('pagehide',clearCopy);
  renderLabels();setTheme(theme,false);update();
})();
