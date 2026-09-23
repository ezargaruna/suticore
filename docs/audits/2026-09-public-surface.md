# аудит общего контура · 2026-09

дата: 2026-09-23

ветка: codex/suti-world-2026-09-23

## факт

GitHub Pages использует main:/

текущая публичная страница
отдавала старый index.html

домен suti.world
отдаёт ту же страницу
через Cloudflare

в Pages API:

status: building

cname: null

## классификация

| путь | назначение | статус | решение |
|---|---|---|---|
| index.html | вход SUTI.world | public | заменить лендингом |
| README.md | спецификация SUTIcore | public | связать через whitelist |
| LICENSE | лицензия | public | оставить |
| protocolla/verification.md | открытый протокол | public | связать через whitelist |
| docs/community/contributing.md | правила вклада | public | связать через whitelist |
| docs/limits/what_is_not_shared.md | границы публикации | public | связать через whitelist |
| docs/canon/fusion_passport.md | авторский паспорт | review | не связывать с лендингом |
| docs/visuals/fusion_passport_prompt.json | промпт и личные атрибуции | review | не связывать с лендингом |
| sreteniya_os_v2026 | внутренний слой | private | не связывать с лендингом |
| core/* | глубокие внутренние материалы | private/review | не связывать с лендингом |
| protocols/* | протоколы без отдельной публикационной отметки | review | не связывать автоматически |
| apps/suti-world/* | исходники приложения | review | не считать публичным подарком |

## whitelisted links

единственный источник ссылок лендинга:

config/public-links.yml

в текущем whitelist:

- 8 ссылок со статусом public
- 0 ссылок со статусом review
- 0 ссылок со статусом private

## ограничение

GitHub-репозиторий уже публичен

классификация private
не скрывает файл сама по себе

для фактического изъятия
нужны отдельные действия:

- перенос в private-репозиторий
- удаление из публичной истории
- или публикационный firewall

это не выполняется
автоматически по имени файла

## проверка перед публикацией

- git status снят до изменений
- root entrypoint заменён локально
- whitelist содержит проверенные пути
- приватные и review-материалы
  не рендерятся лендингом
- внешние ссылки ведут
  в ezargaruna/suticore
- GitHub Pages build требует
  отдельной проверки после push

## после публикации

commit bea0641 опубликован
в main

GitHub Pages:

build_type: workflow

status: built

live GitHub Pages
отдаёт новый index.html

suti.world пока отдаёт
старую Cloudflare-копию

это не кэш GitHub Pages:

Cloudflare отвечает DYNAMIC

Pages API не содержит
подтверждённого cname

нужна настройка Cloudflare origin
или custom domain для Pages
