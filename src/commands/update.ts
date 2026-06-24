import { resolve } from "node:path";
import { existsSync } from "node:fs";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { AGENT_IDS, resolveAgents } from "../lib/agents.js";
import { copyTree, templatesRoot, type CopyResult } from "../lib/copy.js";
import { readManifest, writeManifest } from "../lib/manifest.js";

export interface UpdateOptions {
  agent?: string;
  all?: boolean;
}

/**
 * Atualiza apenas a "maquinaria" (views de agente + methodology canônica),
 * preservando o conteúdo autoral em specs/, docs/ e knowledge/.
 */
export async function runUpdate(
  dir: string | undefined,
  opts: UpdateOptions,
  ctx: { distDir: string; version: string; now: string }
): Promise<void> {
  const projectDir = resolve(process.cwd(), dir ?? ".");
  const templates = templatesRoot(ctx.distDir);

  // Descobrir agentes: flags > manifest existente.
  let agents: string[];
  if (opts.all) agents = [...AGENT_IDS];
  else if (opts.agent) agents = resolveAgents(opts.agent);
  else {
    const manifest = await readManifest(projectDir);
    if (!manifest) {
      throw new Error(
        "Nenhum .spec-okf/manifest.json encontrado. Rode `spec-okf init` primeiro " +
          "ou informe --agent=<...>."
      );
    }
    agents = manifest.agents;
  }

  p.log.step(`Atualizando maquinaria em ${pc.cyan(projectDir)} (${agents.join(", ")})`);

  const totals: CopyResult = { created: [], skipped: [], overwritten: [] };

  // Methodology canônica: sempre sobrescreve (é maquinaria).
  const methodology = `${templates}/base/methodology`;
  if (existsSync(methodology)) {
    merge(totals, await copyTree(methodology, `${projectDir}/methodology`, true));
  }

  // Views de agente: sempre sobrescreve.
  for (const id of agents) {
    merge(totals, await copyTree(`${templates}/agents/${id}`, projectDir, true));
  }

  await writeManifest(projectDir, { version: ctx.version, agents }, ctx.now);

  p.log.success(
    `${totals.created.length + totals.overwritten.length} arquivo(s) de maquinaria atualizado(s).`
  );
  p.outro(pc.green("Atualização concluída. ") + "specs/, docs/ e knowledge/ preservados.");
}

function merge(into: CopyResult, from: CopyResult): void {
  into.created.push(...from.created);
  into.skipped.push(...from.skipped);
  into.overwritten.push(...from.overwritten);
}
