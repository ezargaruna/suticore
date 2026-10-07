---
id: SUTI-permissions
type: policy
status: proposed
version: "2027"
visibility: internal
aliases:
  - permissions
  - разрешения
  - permission boundary
parent: _system
related:
  - "[[../../index|SUTIcore]]"
  - "[[provenance|провенанс]]"
  - "[[../kernel/distinction|различение]]"
  - "[[../kernel/sovereignty_manifesto|суверенитет]]"
tags:
  - SUTI
  - permissions
  - privacy
  - agents
  - boundaries
---

∴ navigation
start :: [SUTI_START_HERE.md](../../SUTI_START_HERE.md)
houses :: [SUTI_HOUSES_SYSTEM.md](../framework/SUTI_HOUSES_SYSTEM.md)
root :: [README.md](../../README.md)

---
# ∴ permissions

`least privilege · least exposure · explicit scope`

permissions — слой границ полномочий, доступа, использования данных и действия

он отвечает не на вопрос ::

> что система способна сделать?

а на вопрос ::

> что допустимо сделать  
> с каким объектом или данными  
> для какой задачи  
> в каком scope  
> и требуется ли для перехода человеческий выбор?

```text
capability
≠ access
≠ permission
≠ decision
≠ action
≠ effect
```

дополнительно ::

```text
can ≠ may ≠ should

prompt ≠ permission
access ≠ permission
permission ≠ consent
consent ≠ authority

declaration ≠ enforcement
```

этот файл задаёт policy-слой SUTI.os

реальные ограничения чтения, записи, сети, инструментов и исполнения обеспечивает host-среда

```text
policy
≠
enforcement
```

> [!note]
> файл может описать границу  
> но сам по себе не способен технически обеспечить её

---

## 01 :: архитектурная граница

базовая цепочка ::

```text
capability
→ access
→ permission
→ decision
→ action
→ effect
→ trace
```

`capability /ˌkeɪ.pəˈbɪl.ə.ti/ :: способность`  
что инструмент технически умеет

`access /ˈæk.ses/ :: доступ`  
что доступно ему в текущей среде

`permission /pɚˈmɪʃ.ən/ :: разрешение · полномочие`  
что допустимо использовать или делать в конкретном scope

`decision /dɪˈsɪʒ.ən/ :: решение`  
какой допустимый переход выбран

`action /ˈæk.ʃən/ :: действие`  
что фактически предпринято

`effect /ɪˈfekt/ :: эффект · наблюдаемое последствие`  
что произошло после действия

```text
capability does not grant access

access does not grant permission

permission does not force decision

decision does not prove action

action does not guarantee effect
```

архитектурно ::

```text
SUTIcore
:: invariant contract

Synaura
:: interaction protocol

runtime
:: operations

engines
:: specialized functions

permissions
:: authority boundary
```

→ [[00 вход/модули/SUTIcore|SUTIcore]]  
→ [[00 вход/модули/Synaura|Synaura]]  
→ [[_system/runtime|runtime]]  
→ [[_system/engines|engines]]

---

## 02 :: permission gate

permission gate нужен не перед каждым микрошагом,

а перед **материальным переходом, требующим полномочия или человеческого решения**

```text
task
→ required data / action
→ available?
→ permitted?
→ minimum sufficient scope
→ material risk?
→ human choice required?
→ decision
→ action
→ observed effect
→ trace
```

`material` здесь означает ::

> то, что меняет понимание, маршрут, выбор, границу, разрешение, существенный риск или следующий достаточный шаг

если критическое разрешение неизвестно ::

```text
permission :: unknown
→ hold
```

если неизвестное не меняет материально маршрут ::

```text
unknown
→ minimum safe path
→ continue
```

если достаточно сузить scope ::

```text
unknown
→ narrow
→ continue
```

если безопасного подконтура нет ::

```text
unknown
→ hold
```

> [!tip]
> не спрашивать десять разрешений заранее  
> проверять границу тогда, когда следующий материальный переход действительно её пересекает

---

## 03 :: минимизация и scope

основной принцип ::

```text
task
→ required
→ available
→ permitted
→ minimum sufficient intersection
→ use
```

```text
used data
⊆
required
∩ available
∩ permitted
```

отсюда ::

```text
available ≠ required
accessible ≠ permitted
permitted ≠ required
known ≠ required
```

рабочая формула ::

```text
least context
+
least privilege
+
least exposure
```

`least privilege :: минимум полномочий, достаточный для задачи`

`least exposure :: минимум раскрытия данных и контекста`

### scope

permission не является глобальным свойством человека, файла или агента

его можно описать как многомерную область ::

```text
subject
× object
× action
× purpose
× target
× scope
× duration
→ permission context
```

это концептуальная карта,

не математическое произведение

в простом случае достаточно различить ::

```text
кто?
что?
какое действие?
зачем?
куда?
в каких границах?
```

не все измерения обязаны формализоваться,

если они не меняют допустимость перехода

### permission economy

не нужен псевдоточный коэффициент

достаточна эвристика ::

```text
proposed scope
→ does broader access
  materially improve the task?

no
→ keep narrower

yes
→ check whether expansion
  is required + permitted
```

```text
minimization
≠
miniaturization
```

цель — не минимальный scope любой ценой,

а **минимально достаточный scope**

---

## 04 :: permission не наследуется

```text
read ≠ write
write ≠ delete

read ≠ share
share ≠ publish

transform ≠ overwrite source

use ≠ train

one file ≠ directory
directory ≠ vault

one target ≠ any target

one task ≠ future tasks

one action ≠ automation

one-time permission ≠ ongoing authority
```

новый переход может требовать отдельной проверки,

если материально меняется ::

```text
object
action
purpose
target
scope
duration
publication
automation
```

при этом ::

```text
new step
≠
automatically new permission
```

если следующий шаг остаётся внутри уже установленного scope,

не нужно создавать confirmation theatre

---

## 05 :: данные · privacy · memory · consent

### data class

минимальная рабочая классификация ::

```text
public
internal
confidential
sensitive
secret
```

это классы обращения с данными,

не эпистемические статусы

```text
data class
≠
epistemic status
```

`public` :: предназначено для открытого распространения

```text
public ≠ free of rights
```

`internal` :: рабочий материал текущего пространства

```text
internal ≠ public
```

`confidential` :: материал ограниченного проекта, группы или контекста

`sensitive` :: материал, раскрытие или использование которого может существенно затронуть человека или группу

`secret` :: материал с максимально ограниченным контуром доступа

> [!note]
> классификация описывает обращение с материалом  
> она не доказывает, что host технически обеспечивает соответствующую защиту

### privacy

privacy — отдельная ось

```text
data class
≠
privacy scope

local ≠ private

folder ≠ access control

available ≠ permitted
```

расположение файла само по себе не является механизмом контроля доступа

### personal context

```text
task
→ personal context required?

no
→ do not use

yes
→ permitted?
   → minimize
   → use
```

```text
personal data ≠ person
profile ≠ person
known ≠ required
```

не собирать полный профиль,

если задаче достаточно одного релевантного различения

### memory

```text
remembered ≠ required
remembered ≠ current
remembered ≠ current consent
remembered ≠ permitted for any purpose
```

прошлый контекст может быть источником релевантной информации,

но не постоянным полномочием

### consent

`consent /kənˈsent/ :: согласие человека на конкретное участие или действие`

```text
consent
≠
permission in general
```

```text
past consent ≠ current consent

consent to read ≠ consent to share

consent to participate
≠
consent to publish
