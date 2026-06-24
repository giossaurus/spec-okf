---
trigger: always_on
---

Este projeto usa **Spec-Driven Development (SDD)** + **Open Knowledge Format (OKF)**.

A metodologia canônica está em `methodology/sdd.md`. Siga-a.

Regras:

1. Antes de implementar, leia a spec relevante em `specs/NNNN-nome/spec.md` e o
   contexto em `knowledge/`. Se a spec não existir, crie-a antes de codar.
2. Os critérios de aceitação da spec são a definição de pronto.
3. Conhecimento durável vira conceito OKF em `knowledge/concepts/` (campo `type`
   obrigatório) e ganha uma linha em `knowledge/log.md`.
4. Use markdown estrutural; links entre conceitos são bundle-relativos (`/...`).

Mapa: `methodology/sdd.md`, `docs/`, `specs/`, `knowledge/`.
