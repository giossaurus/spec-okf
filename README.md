# spec-okf

CLI de scaffolding que configura um projeto com **Spec-Driven Development (SDD)**
e um bundle **Open Knowledge Format (OKF)** — compartilhando o mesmo contexto
`.md`/`.yaml` entre **Claude, Codex, Cursor, Gemini, Copilot e Windsurf**.

A metodologia (Lean Inception → DDD → TDD → SDD) vive uma única vez em
`methodology/sdd.md`; cada agente recebe um "view" que aponta para ela e para o
bundle de conhecimento em `knowledge/`.

## Uso

```bash
# interativo (escolhe os agentes num menu)
npx spec-okf init

# em um diretório específico, com todos os agentes
npx spec-okf init meu-projeto --all

# agentes específicos, não-interativo
npx spec-okf init . --agent=claude,codex,cursor --yes

# atualizar a "maquinaria" preservando specs/, docs/ e knowledge/
npx spec-okf update
```

### Flags do `init`

| Flag | Descrição |
|------|-----------|
| `--agent <lista>` | Agentes separados por vírgula: `claude,codex,cursor,gemini,copilot,windsurf` |
| `--all` | Configura todos os agentes |
| `--force` | Sobrescreve arquivos existentes |
| `--yes` | Modo não-interativo |

## O que é gerado

```
methodology/sdd.md            # processo (fonte canônica)
docs/{visao,glossario,arquitetura}.md
specs/0001-exemplo/spec.md    # uma pasta por feature
knowledge/                    # bundle OKF (index.md, log.md, concepts/)
.spec-okf/manifest.json       # agentes habilitados
+ arquivos do(s) agente(s): CLAUDE.md, AGENTS.md, .cursor/rules/, GEMINI.md,
  .github/copilot-instructions.md, .windsurf/rules/
```

## Referências

- Open Knowledge Format — [SPEC v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
- [Anúncio da OKF (Google Cloud)](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)

## Licença

MIT © Giovanni Della Dea
