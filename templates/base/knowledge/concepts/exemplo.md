---
type: Reference
title: Conceito de exemplo
description: Modelo de conceito OKF. Substitua pelo conhecimento real do seu domínio.
tags: [exemplo, getting-started]
timestamp: 2026-01-01T00:00:00Z
---

# O que é um conceito

Um conceito é uma unidade de conhecimento: uma tabela, uma API, uma métrica,
um runbook, um processo de negócio — qualquer coisa que valha registrar para
humanos e agentes.

# Estrutura

- **Frontmatter**: o campo `type` é obrigatório; `title`, `description`,
  `resource`, `tags` e `timestamp` são recomendados.
- **Corpo**: markdown estrutural. Headings como `# Schema`, `# Examples` e
  `# Citations` têm significado convencional.

# Exemplo de schema

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id`  | string | Identificador único. |

# Citations

[1] [OKF SPEC v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
