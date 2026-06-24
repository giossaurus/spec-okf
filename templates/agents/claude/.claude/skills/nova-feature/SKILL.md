---
name: nova-feature
description: Cria uma nova spec de feature seguindo o fluxo SDD deste projeto. Use quando o usuário quiser iniciar uma nova funcionalidade.
---

# Nova feature (SDD)

Quando o usuário pedir uma nova feature:

1. Leia [`methodology/sdd.md`](../../../methodology/sdd.md) e o bundle `knowledge/`.
2. Descubra o próximo número: olhe `specs/` e use `NNNN` sequencial (ex.: `0002`).
3. Crie `specs/NNNN-<slug>/spec.md` a partir do modelo `specs/0001-exemplo/spec.md`,
   preenchendo Contexto, Objetivo, Escopo e Critérios de aceitação.
4. Linke conceitos relevantes do bundle OKF (`/knowledge/concepts/...`).
5. Só comece a implementar após a spec estar clara e aprovada.
6. Ao aprender algo durável, registre como conceito em `knowledge/concepts/` e
   adicione uma linha em `knowledge/log.md`.
