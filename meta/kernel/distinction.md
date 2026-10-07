---
id: distinction
type: core-object
status: proposed
version: 2026.10-r2

aliases:
  - различение
  - distinction
  - distinction

related:
  - "[[clarity_discipline|дисциплина ясности]]"
  - "[[sovereignty_manifesto|суверенитет]]"
  - "[[consciousness_algorithms|алгоритмы сознания]]"
  - "[[01 ядро/эпистемические оси]]"
  - "[[02 язык/рабочее значение]]"
  - "[[_system/runtime]]"
  - "[[_system/provenance]]"

tags:
  - SUTI
  - object/distinction
---

∴ navigation
start :: [SUTI_START_HERE.md](../../SUTI_START_HERE.md)
houses :: [SUTI_HOUSES_SYSTEM.md](../framework/SUTI_HOUSES_SYSTEM.md)
root :: [README.md](../../README.md)

---

# ∴ различение

`distinction`

**минимальная рабочая единица SUTI.os — различимость двух или более вещей в определённом контексте.**

базовая запись ::

```text
a ≠ b
```

она означает ::

> в данном контексте полезно не обращаться с a и b как с одним и тем же

она не означает ::

> a и b абсолютно разделены во всех возможных отношениях и контекстах

```text
distinct
≠
unrelated
```

различение не разрывает связь

оно делает её точнее видимой

---

## 01 · минимальная форма

для локальной работы может быть достаточно ::

```yaml
distinction:
  a:
  b:
  context:
```

если без этого теряется смысл ::

```yaml
  boundary:
```

при переносе, исследовании или проверке могут понадобиться ::

```yaml
  source:
  status:
```

принцип ::

```text
minimum sufficient representation
```

поле добавляется только тогда,

когда без него теряется существенное различие

---

## 02 · что можно различать

`a` и `b` могут быть ::

```text
concepts
observations
states
actions
roles
claims
objects
relations
time frames
language forms
models
```

например ::

```text
feeling ≠ external fact

request ≠ obligation

word ≠ concept

action ≠ effect

state ≠ identity

verification ≠ decision
```

тип различаемых элементов имеет значение

```text
a ≠ b
```

не утверждает,

что между ними нет отношений

---

## 03 · различение → отношение

после различения можно спросить ::

> как a и b связаны?

например ::

```text
a ≠ b

a ↔ b

a → b?

a ⊂ b

a overlaps b

a precedes b

a derived_from b
```

важно не подменять один тип отношения другим

```text
relation ≠ causality

sequence ≠ causality
```

если заявляется причинность —

она требует отдельного основания

в runtime это переход ::

```text
distinguish
→ relate
```

`name` также остаётся внутри `relate`

→ [[_system/runtime]]

---

## 04 · context + boundary

различение существует не в пустоте

```text
distinction
×
context
```

`context` отвечает ::

> где это различение сейчас полезно?

`boundary` ::

> где его уже недостаточно?

пример ::

```text
различение ::
feeling ≠ external fact

граница ::
переживание остаётся фактом
собственного переживания человека
```

или ::

```text
различение ::
model ≠ person

граница ::
модель может описывать
некоторые наблюдаемые аспекты
в определённом контексте
```

граница не отменяет различение

она защищает его от чрезмерного расширения

```text
useful here
≠
universal
```

→ [[01 ядро/границы]]

---

## 05 · различение ≠ онтология

SUTI.os использует различения прежде всего операционально

```text
a ≠ b
```

означает ::

> сейчас полезно различать a и b

не обязательно ::

> реальность фундаментально состоит из двух отдельных сущностей a и b

поэтому ::

```text
distinction
≠
ontological law
```

различение может быть уточнено,

разделено,

объединено

или ограничено при изменении задачи

```text
useful now
≠
final forever
```

например ::

```text
a ≠ b
```

позднее может уточниться до ::

```text
a₁ ≠ a₂ ≠ b
```

или ::

```text
a ≠ b

a and b ⊂ c
```

это не делает первое различение автоматически ошибочным

оно могло быть достаточным для предыдущей задачи

---

## 06 · source + status

если происхождение существенно,

сохраняется `source`

например ::

```text
observation
source material
conversation
research
trace
authorial construction
existing crystal
unknown
```

но ::

```text
source ≠ support
```

известное происхождение

не доказывает корректность утверждения

→ [[_system/provenance]]

если эпистемический статус существенен,

он хранится отдельно

например ::

```text
observation
hypothesis
model
authorial
symbolic
unknown
```

```text
distinction
≠
fact automatically
```

полная эпистемическая конфигурация —

в [[01 ядро/эпистемические оси]]

---

## 07 · различение и язык

язык может ::

```text
name
contrast
relate
refine
compress
transfer
```

различение

но ::

```text
word ≠ concept

word ≠ object

name ≠ explanation
```

дать чему-либо имя —

значит сделать возможной определённую работу с ним

это ещё не означает объяснить ::

```text
mechanism
cause
origin
function
consequence
```

наличие слова также не является необходимым или достаточным условием освоенного различения

```text
no word
≠
no distinction possible

has word
≠
has mastered distinction
```

→ [[02 язык/рабочее значение]]

---

## 08 · созвучие ≠ происхождение

для языковой и символической работы особенно важно ::

```text
sound similarity
≠
etymological relation
```

созвучие может быть ::

```text
poetic
mnemonic
associative
symbolic
```

но этимологическое утверждение требует отдельного историко-лингвистического основания

```text
resonance
≠
etymological evidence
```

так поэтическая или символическая связь может сохранять собственную ценность,

не выдаваясь за историческую лингвистику

---

## 09 · различение ↔ перспектива

то, что становится различимым,

может зависеть от позиции, контекста и задачи

```text
perspective a
→ distinction x

perspective b
→ distinction y
```

новая перспектива может открыть различение

новое различение может открыть перспективу

```text
distinction
↔
perspective
```

но ни одно не определяет другое полностью

→ [[01 ядро/перспектива]]

---

## 10 · доступность различения · research lens

для исследования можно различать ::

```text
unavailable
latent
prompted
available
usable
transferable
```

это рабочая исследовательская модель,

а не универсальная шкала развития человека