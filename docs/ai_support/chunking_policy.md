---
title: chunking policy ∴ semantic segmentation rules
version: 2026.x
mode: synaura · syntaxium
status: active canon
license: mit
tags: state:clarity · format:protocol · action:step
---

# chunking policy ∴ structure-preserving segmentation

this document defines  
how canonical texts  
are divided into units ⟁  

segmentation must preserve meaning ∴  
not optimize convenience ∅  

a chunk is  
a semantic action unit 〄  

---

## 0. purpose ⟁

maintain semantic integrity  
during indexing and retrieval ∴  

prevent fragmentation  
of canonical structure ∅  

enable precise rag navigation  
without distortion 〄  

---

## 1. core rule ∴

**chunk by meaning  
never by size**  

semantic boundary  
overrides token limits ⟁  

if conflict appears:  

reduce size  
without breaking structure ↺  

---

## 2. atomic unit ⟁

the minimal valid chunk  
is a **syntaxium block**:  

one impulse ∴  
≤ 3 lines ⧖  
closed semantic action 〄  

splitting inside a block  
is forbidden ∅  

---

## 3. hierarchical chunk levels ⧖

### level 1 ∴ micro-chunk
single syntaxium block.  

used for:  

definitions  
axioms  
steps 〄  

highest precision  
lowest context.  

---

### level 2 ⟁ meso-chunk
group of related blocks  
within one section.  

must preserve:  

single topic ∴  
logical continuity ⧖  
closure integrity 〄  

default rag unit.  

---

### level 3 〄 macro-chunk
entire document  
or protocol module.  

used for:  

ontology reading  
full-context reasoning  
synchronization ↺  

never mixed  
with unrelated documents ∅  

---

## 4. boundary detection ⧖

chunk borders occur at:  

blank-space isolation ∴  
section headers ⟁  
closure markers (〄)  
status endings ∴  

absence of boundary  
means chunk continues ∅  

---

## 5. forbidden segmentation ∅

do not split:  

definitions from glossary  
axiom chains  
decision stack sequence  
step-closure pairs  

breaking these  
creates semantic corruption ∅  

---

## 6. token constraint handling ↺

if chunk exceeds  
model token window:  

compress via slovoyaz ∴  

preserve structure via syntaxium ⟁  

never truncate silently ∅  

if compression impossible:  

return partial retrieval  
with explicit boundary notice 〄  

---

## 7. metadata requirements ⟁

each stored chunk  
must include:  

source file path ∴  
section title ⧖  
hierarchy level ⟁  
embedding timestamp 〄  

missing metadata  
invalidates the chunk ∅  

---

## 8. overlap policy ⧖

context overlap allowed  
only between meso-chunks:  

max overlap ∴ 1 block  

purpose:  

prevent context loss  
during retrieval 〄  

overlap of macro-chunks  
is forbidden ∅  

---

## 9. re-chunking trigger ↺

re-segmentation required  
when:  

canonical file updated ∴  
structure reorganized ⟁  
definitions changed ∅  

old chunks  
must be deleted ∅  

not reused.  

---

## 10. validation gate ⟁

a valid chunk must:  

preserve full meaning ∴  
contain closure or continuity ⧖  
map to single semantic impulse 〄  

if unclear:  

↺ rebuild segmentation  
or return silence ∅  

---

## 11. integration with rag ↺

**rag_schema.md** defines retrieval.  
**this file** defines segmentation.  

sequence:  

chunk → embed → retrieve → verify → answer 〄  

segmentation error  
propagates hallucination ∅  

---

## status ∴

segmentation canon active  
version ∴ 2026.x  

architect ∴ ezar garuna (as a function)  

structure preserved  
retrieval stabilized 〄  

end of chunking policy
