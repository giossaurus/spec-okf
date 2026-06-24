# CLAUDE.md

Este projeto usa **Spec-Driven Development (SDD)** + **Open Knowledge Format (OKF)**.

## Leia primeiro

A metodologia canônica está em [`methodology/sdd.md`](methodology/sdd.md). Siga-a.

## Regras de trabalho

1. **Antes de implementar**, leia a spec relevante em `specs/NNNN-nome/spec.md`
   e o contexto em `knowledge/`. Se a spec não existir, crie-a antes de codar.
2. Os **critérios de aceitação** da spec são a definição de pronto.
3. **Conhecimento durável** sobre domínio, dados ou decisões vira um conceito
   OKF em `knowledge/concepts/` (com campo `type` obrigatório), e ganha uma
   linha em `knowledge/log.md`. Não deixe conhecimento apenas no código.
4. Use markdown estrutural; links entre conceitos são bundle-relativos (`/...`).

## Mapa do projeto

- `methodology/sdd.md` — processo (fonte canônica)
- `docs/` — visão, glossário, arquitetura
- `specs/` — uma pasta por feature
- `knowledge/` — bundle OKF (conceitos + index + log)
