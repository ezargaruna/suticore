# SUTI.world · карта модулей

Версия записи :: 2026.11-r5 · публикация описания

## English master specifications

These three documents form the English master set for this release candidate:

- [SUTIcore · principles and system contract](suticore-2026.11.en.html) · [Markdown source](suticore-2026.11.en.md)
- [synaura · interaction and expression protocol](synaura-2026.11.en.html) · [Markdown source](synaura-2026.11.en.md)
- [Syntaxium · notation and grammar proposal](syntaxium-2026.11.en.html) · [Markdown source](syntaxium-2026.11.en.md)

The Russian synaura 00–12 file is an earlier draft. Its alignment with the English master has not been checked; it is not presented as a verified translation or a 13-language release.

## Статус и границы

Это авторский каталог функций и спецификаций. Он описывает названия, роли и связи, но не заявляет, что каждый модуль реализован, подключён или прошёл независимую проверку.

Статус всего каталога :: `PROPOSED / AUTHORIAL ARCHITECTURE`

- `COMMIT` этого описания не подтверждает эффективность модулей.
- Перечень не является общепринятой научной классификацией.
- Операторы, метрики, схемы и parser-процессы остаются предложениями, пока нет реализации и результатов проверки.
- Статусы реализации задаются отдельно для каждой поверхности.
- Материалы Angels of Care на 13 языках и анкета сюда не включены: их отдельный пакет остаётся на редакционной проверке.

## Слои системы

| Слой | Модули | Функция в авторской архитектуре |
|---|---|---|
| ядро и ценность | SUTIcore, SUTI 8D | принципы, ограничения, проектирование ценности |
| двигатели | Psychonetica, Eidographica, Lingvaetica, Actica | заметить, связать, назвать, сделать |
| координация и структура | synaura, SRETENIYA_OS, Syntaxium, Rhetorica | взаимодействие, рабочий цикл, отношения, речевое действие |
| доменные адаптеры | Pro.Yazyk, LinguaFUSION, SONOGENESIS | регистры, языковая практика, звук и мультимодальность |
| компиляция | Style Law Compiler | переход от смысла и ограничений к форме |
| проверки | VereNITYA, Accessibility, Semantic Security, Sufficiency Gate | основания, доступность, границы данных, достаточность модулей |
| управление утверждениями | Market Evidence, Claim Ceiling, Copy Protocol, Human Choice | свидетельства, пределы обещаний, текст, выбор человека |
| пересмотр и наблюдаемость | Trickster Red Team, SUTI Observatory, RAD | проверка альтернатив, видимый след, пересмотр |
| среды | SUTIspace, SUTI.world | интерфейсные воплощения и общий проектный контекст |
| прикладные проекты | VereNium, NITYA, Samurai Dharma, Neuro-Veche, SUTI.angels | отдельные инструменты, игры, рабочие листы и care-материалы со своими статусами |

Имена `Lingvaetica` / `Lingvetica` и `Pro.Yazyk` / `Pro_Yazyk` встречаются в разных редакциях. Этот каталог сохраняет выбранные здесь названия; варианты не объявляются эквивалентными без отдельного решения.

## Документные модули synaura · 00–12

Это разделы спецификации, а не исполняемые сервисы.

| ID | Раздел | Содержание |
|---|---|---|
| 00 | Activation manifest | область, статус, задача и включённые модули |
| 01 | Core principles | авторские проектные принципы и ограничения |
| 02 | Style canon | ритм, выразительность и адаптация под носитель |
| 03 | Syntaxium grammar | предлагаемые классы операторов и правила группировки |
| 04 | Operator registry | реестр и поля паспорта оператора |
| 05 | Eidographics & visual DNA | отношения формы, материала и контекста |
| 06 | Parser & canonical AST | план грамматики и представления структуры |
| 07 | Token economy | гипотеза оценки стоимости и полезности символов |
| 08 | Runtime | желаемый цикл агента и разделение состояний |
| 09 | Research protocol | план воспроизводимого исследования |
| 10 | Validation & metrics | предлагаемые показатели и требования к тестам |
| 11 | Reference architecture | связь спецификации, реализации и сред |
| 12 | ASCII design system | текстовое представление схем и примеров |

English master :: [synaura · 00–12 · 2026.11 draft](synaura-2026.11.en.html) · [source](synaura-2026.11.en.md)

Earlier Russian draft :: [synaura · 00–12 · 2026.9](synaura-2026.9.md)

Отдельный редакционный адаптер `.synaura` :: [предпочтительный стиль выражения](../synaura/README.md). Он опубликован как самостоятельный публичный кандидат и не подменяет формальную спецификацию ниже.

Машиночитаемая карта :: [catalog.v1.json](catalog.v1.json)

## Условия корректного прочтения

- `proposed` не означает `approved` или `deployed`.
- Наличие оператора в списке не устанавливает его семантику.
- Порог метрики без методики и измерений не является результатом.
- Публикация файла не равна публикации сервиса или активации runtime.
- Человек сохраняет право уточнить, изменить, отклонить или остановить использование.
