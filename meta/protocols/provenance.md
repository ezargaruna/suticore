∴ navigation
start :: [SUTI_START_HERE.md](../../SUTI_START_HERE.md)
houses :: [SUTI_HOUSES_SYSTEM.md](../framework/SUTI_HOUSES_SYSTEM.md)
root :: [README.md](../../README.md)
---
---
id: SUTI-provenance
type: provenance-policy
status: proposed
version: "2027"
visibility: internal
aliases:
  - provenance
  - происхождение
  - lineage
parent: _system
related:
  - "[[00 вход/модули/SUTIcore]]"
  - "[[_system/agents]]"
  - "[[_system/runtime]]"
  - "[[_system/permissions]]"
  - "[[_system/exchange/readme]]"
  - "[[01 ядро/эпистемические оси]]"
  - "[[01 ядро/след]]"
  - "[[05 исследование/историческая гигиена]]"
  - "[[05 исследование/исследовательский цикл]]"
tags:
  - SUTI
  - provenance
  - sources
  - trace
  - versioning
---
# ∴ provenance

`source · transformation · lineage · version`

provenance — слой происхождения и преобразования объекта

он позволяет различить ::

> откуда это появилось?  
> что произошло между источником и текущей формой?  
> что было сохранено, добавлено, преобразовано или утрачено?  
> какая версия находится перед нами сейчас?

главные инварианты ::

```text
source ≠ claim ≠ evidence

source ≠ transformation

derived ≠ original

known source ≠ evidence

citation ≠ support

traceable ≠ true

well-documented ≠ verified
```

provenance делает происхождение видимым

он не повышает эпистемический статус автоматически

> [!note]
> provenance отвечает прежде всего на вопрос `откуда и через какие преобразования?`  
> эпистемический слой — `на каком основании это утверждается?`  
> [[00 вход/модули/verenitya|verenitya]] — `выдерживает ли утверждение конкретную проверку?`

---

## 01 :: минимальная модель

базовая lineage-chain ::

```text
source
→ acquisition
→ atom?
→ transformation
→ current object
→ version?
```

где ::

`source /sɔːrs/ :: источник`  
откуда происходит материал

`acquisition /ˌæk.wɪˈzɪʃ.ən/ :: получение`  
как материал оказался в текущей среде

`atom /ˈæt.əm/ :: атом`  
минимальный фрагмент, происхождение которого материално отслеживать отдельно

`transformation /ˌtræns.fɚˈmeɪ.ʃən/ :: преобразование`  
что было сделано с материалом

`version /ˈvɝː.ʒən/ :: версия`  
какое состояние объекта используется сейчас

это lineage-chain,

не pipeline истины

### minimum sufficient provenance

для большинства объектов достаточно ::

```text
source?
→ what changed?
→ what is this now?
```

при необходимости ::

```text
→ what was added?
→ what was lost?
→ which version?
```

если эти различения уже достаточны для корректного использования —

остановиться

```text
minimum sufficient provenance
:: минимум происхождения,
   достаточный для текущей задачи
```

> [!tip]
> не строить полный provenance graph по умолчанию  
> глубина lineage должна расти только тогда, когда дополнительная история меняет понимание, проверку, перенос, права, границу или следующий достаточный шаг

### provenance economy

```text
more lineage
≠
better provenance
```

рабочая эвристика ::

```text
does additional lineage
change anything material?

no
→ keep collapsed

yes
→ reveal required layer
```

```text
provenance economy
:: достаточная прослеживаемость
   без документации ради документации
```

---

## 02 :: source · acquisition · atom

### source

источником может быть ::

```text
person
document
file
dataset
observation
measurement
self_report
external source
calculation
model output
another object
authorial construct
symbolic system
unknown
```

```text
source type
≠
source quality
```

если происхождение неизвестно ::

```text
source :: unknown
```

не реконструировать источник из правдоподобия

### acquisition

`acquisition` описывает путь материала в текущую среду

например ::

```text
user provided
local read
import
manual entry
observation
measurement
external retrieval
model output
derived
unknown
```

```text
source
≠
acquisition
```

один источник может быть получен разными путями

с разными ограничениями, permissions и условиями использования

### atom

атомизация нужна,

когда разные части объекта имеют разное происхождение или требуют отдельного отслеживания

например ::

```text
quote
claim
observation
definition
number
relation
distinction
example
rule
decision
symbol
```

```text
atom
≠
context-free truth
```

если отделение атома меняет смысл,

необходимый контекст сохраняется вместе с ним

### нулевые исходы

валидны ::

```text
no atom
:: отдельная атомизация не нужна

source only
:: достаточно указать источник

source :: unknown
:: происхождение действительно неизвестно
```

но ::

```text
no provenance
```

не следует автоматически выводить из того,

что объект локальный, собственный или эфемерный

для таких объектов provenance может быть просто **нематериален текущей задаче**

```text
not material
→ do not expand
→ return
```

---

## 03 :: transformations · derivation · generated material

канонический рабочий словарь преобразований ::

```text
quote
extract
summarize
translate
normalize
parse
map
merge
calculate
interpret
generate
revise
```

общая форма ::

```text
source / prior object
→ transformation
→ derived object
```

трансформация должна оставаться различимой,

если она материальна для понимания производного объекта

### границы

```text
quote ≠ whole source

extract ≠ interpret

summary ≠ source

translation ≠ original

translation ≠ semantic identity

normalization ≠ semantic revision

parse ≠ understanding

map ≠ identity

calculated ≠ directly observed

interpretation ≠ source content

generated ≠ retrieved

revision ≠ original version
```

### transformation chain

```text
source
→ extract
→ translate
→ summarize
→ map
→ revise
→ current object
```

если между исходным материалом и текущим объектом есть существенные преобразования,

текущий объект не приписывается источнику напрямую

рабочая эвристика ::

```text
transformation distance ↑
→ need for explicit lineage may ↑
```

это не мера истинности

и не автоматическое требование документировать каждый промежуточный шаг

### generated material

минимально различать ::

```text
source-derived
model-inferred
model-generated
```

```text
source
→ extract
→ source-derived object
```

```text
source-derived material
→ interpret
→ model-inferred claim
```

```text
context
→ generate
→ model-generated artifact
```

границы ::

```text
model output ≠ source

model inference ≠ observation

plausible ≠ source-supported

generated ≠ retrieved
```

связующий материал,

добавленный человеком, агентом или моделью,

не должен выглядеть как содержание исходного источника

### actor

при необходимости сохраняется исполнитель преобразования ::

```text
human
agent
model
script
importer
parser
unknown
```

```text
actor ≠ source
actor ≠ author
actor ≠ authority
```

`actor /ˈæk.tɚ/ :: исполнитель преобразования`

он отвечает на вопрос ::

> кто или что выполнило преобразование?

а не ::

> кто является источником исходного материала?

---

## 04 :: lineage · multiple sources · version · degradation

### lineage relations

рабочие отношения ::

```text
derived_from
quoted_from
extracted_from
translated_from
summarized_from
calculated_from
interpreted_from
generated_from
merged_from
revised_from
supersedes
```

предпочтительное направление ::

```text
current object
→ derived_from
→ prior object
```

пример ::

```text
source.md
↓ extracted_from
atom-01
↓ translated_from
atom-01-en
↓ summarized_from
pearl-07