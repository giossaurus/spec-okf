# Metodologia — Spec-Driven Development (SDD) + Open Knowledge Format (OKF)

> **Fonte canônica.** Este arquivo é a referência única da metodologia deste
> projeto. Todos os agentes de IA (Claude, Codex, Cursor, Gemini, Copilot,
> Windsurf) apontam para cá. Ao editar o processo, edite **este** arquivo.

## Princípio

A especificação é o artefato primário; o código é uma consequência dela.
Antes de implementar, descrevemos **o quê** e **por quê** em specs versionadas,
e mantemos o contexto de domínio num **bundle de conhecimento OKF** legível por
humanos e agentes.

## Fluxo encadeado

```
Lean Inception  →  DDD        →  TDD          →  SDD
(descobrir)        (modelar)     (desenhar)      (especificar + implementar)
```

1. **Lean Inception — descobrir.** Visão de produto, personas, jornadas e o
   recorte do MVP. Saída em `docs/visao.md`.
2. **DDD — modelar.** Linguagem ubíqua, contextos delimitados e modelo de
   domínio. Saída em `docs/glossario.md` e `docs/arquitetura.md`.
3. **TDD — desenhar.** Decisões técnicas e contratos antes do código; testes
   guiam o design. Saída em `docs/arquitetura.md`.
4. **SDD — especificar e implementar.** Cada feature vira uma pasta em
   `specs/NNNN-nome/` com `spec.md` (objetivo, critérios de aceitação, escopo).
   O código só começa quando a spec está aprovada.

## Bundle de conhecimento (OKF)

A pasta `knowledge/` é um **bundle Open Knowledge Format v0.1**: um diretório de
markdown com frontmatter YAML, onde cada arquivo é um *conceito*.

- **Único campo obrigatório:** `type`. Recomendados: `title`, `description`,
  `resource`, `tags`, `timestamp` (ISO 8601).
- **Links** entre conceitos usam markdown bundle-relativo (começando com `/`),
  ex.: `[clientes](/concepts/clientes.md)`.
- `knowledge/index.md` lista os conceitos (divulgação progressiva, sem
  frontmatter). `knowledge/log.md` registra o histórico por data.
- Nomes reservados: `index.md` e `log.md` não são conceitos.

Spec da OKF: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

## Regras para o agente

1. **Antes de codar**, leia a spec relevante em `specs/` e o contexto em
   `knowledge/`. Se a spec não existir, crie-a primeiro.
2. **Ao aprender algo durável** sobre o domínio, dados ou decisões, registre
   como um conceito em `knowledge/concepts/` e acrescente uma linha em
   `knowledge/log.md`. Não deixe conhecimento só no código.
3. **Mantenha um campo `type`** em todo conceito novo e prefira markdown
   estrutural (tabelas, listas, headings) a prosa solta.
4. **Critérios de aceitação** da spec são a definição de pronto. Não considere
   uma feature concluída sem atendê-los.
5. Atualize `timestamp` ao alterar um conceito de forma significativa.

## Estrutura do projeto

```
.
├── methodology/sdd.md        # este arquivo (canônico)
├── docs/                     # visão, glossário, arquitetura
├── specs/NNNN-nome/spec.md   # uma pasta por feature
├── knowledge/                # bundle OKF (conceitos + index + log)
└── <arquivos dos agentes>    # CLAUDE.md, AGENTS.md, .cursor/rules/, ...
```
