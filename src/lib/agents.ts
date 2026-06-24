/**
 * Registry de agentes suportados.
 *
 * Cada agente mapeia para uma pasta em `templates/agents/<id>/` cujo conteúdo
 * é copiado para a raiz do projeto alvo. São "views" finos que apontam para a
 * fonte canônica em `templates/base/methodology/sdd.md` e para o bundle OKF
 * em `knowledge/`.
 */

export interface AgentDef {
  /** Identificador usado em --agent e no manifest. */
  id: string;
  /** Nome legível exibido no menu interativo. */
  label: string;
  /** Arquivo/pasta principal gerado (apenas informativo, para logs). */
  hint: string;
}

export const AGENTS: AgentDef[] = [
  { id: "claude", label: "Claude Code", hint: "CLAUDE.md + .claude/skills/" },
  { id: "codex", label: "Codex", hint: "AGENTS.md + .agents/" },
  { id: "cursor", label: "Cursor", hint: ".cursor/rules/" },
  { id: "gemini", label: "Gemini CLI", hint: "GEMINI.md + .gemini/" },
  { id: "copilot", label: "GitHub Copilot", hint: ".github/copilot-instructions.md" },
  { id: "windsurf", label: "Windsurf", hint: ".windsurf/rules/" },
];

export const AGENT_IDS = AGENTS.map((a) => a.id);

/** Resolve uma lista de ids (string CSV ou array) para ids válidos. */
export function resolveAgents(input: string | string[] | undefined): string[] {
  if (!input) return [];
  const raw = Array.isArray(input) ? input : input.split(",");
  const wanted = raw.map((s) => s.trim().toLowerCase()).filter(Boolean);
  const invalid = wanted.filter((id) => !AGENT_IDS.includes(id));
  if (invalid.length) {
    throw new Error(
      `Agente(s) desconhecido(s): ${invalid.join(", ")}. Válidos: ${AGENT_IDS.join(", ")}`
    );
  }
  // Remove duplicatas preservando ordem.
  return [...new Set(wanted)];
}
