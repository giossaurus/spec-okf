import { resolve } from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { AGENTS, AGENT_IDS, resolveAgents } from "../lib/agents.js";
import { copyTree, templatesRoot, type CopyResult } from "../lib/copy.js";
import { writeManifest } from "../lib/manifest.js";

export interface InitOptions {
  agent?: string;
  all?: boolean;
  force?: boolean;
  yes?: boolean;
}

export async function runInit(
  dir: string | undefined,
  opts: InitOptions,
  ctx: { distDir: string; version: string; now: string }
): Promise<void> {
  const projectDir = resolve(process.cwd(), dir ?? ".");
  const templates = templatesRoot(ctx.distDir);

  // 1) Resolver agentes (flags têm prioridade; senão, menu interativo).
  let agents: string[];
  if (opts.all) {
    agents = [...AGENT_IDS];
  } else if (opts.agent) {
    agents = resolveAgents(opts.agent);
  } else if (opts.yes) {
    agents = [...AGENT_IDS];
  } else {
    const picked = await p.multiselect({
      message: "Quais agentes de IA configurar?",
      options: AGENTS.map((a) => ({ value: a.id, label: a.label, hint: a.hint })),
      initialValues: ["claude"],
      required: true,
    });
    if (p.isCancel(picked)) {
      p.cancel("Cancelado.");
      return;
    }
    agents = picked as string[];
  }

  if (!agents.length) {
    throw new Error("Nenhum agente selecionado. Use --agent=<...> ou --all.");
  }

  p.log.step(
    `Configurando ${pc.cyan(projectDir)} com: ${pc.cyan(agents.join(", "))}`
  );

  // 2) Copiar base (specs, docs, methodology, knowledge/OKF).
  const totals: CopyResult = { created: [], skipped: [], overwritten: [] };
  merge(totals, await copyTree(`${templates}/base`, projectDir, !!opts.force));

  // 3) Copiar cada view de agente.
  for (const id of agents) {
    merge(
      totals,
      await copyTree(`${templates}/agents/${id}`, projectDir, !!opts.force)
    );
  }

  // 4) Escrever manifest.
  await writeManifest(projectDir, { version: ctx.version, agents }, ctx.now);

  // 5) Relatório.
  report(totals, !!opts.force);
  p.outro(
    pc.green("Pronto! ") +
      "Abra o projeto no seu agente e comece pelo arquivo " +
      pc.cyan("methodology/sdd.md") +
      "."
  );
}

function merge(into: CopyResult, from: CopyResult): void {
  into.created.push(...from.created);
  into.skipped.push(...from.skipped);
  into.overwritten.push(...from.overwritten);
}

function report(r: CopyResult, force: boolean): void {
  if (r.created.length) p.log.success(`${r.created.length} arquivo(s) criado(s).`);
  if (r.overwritten.length)
    p.log.warn(`${r.overwritten.length} arquivo(s) sobrescrito(s) (--force).`);
  if (r.skipped.length) {
    p.log.info(
      `${r.skipped.length} arquivo(s) já existiam e foram preservados` +
        (force ? "." : " (use --force para sobrescrever).")
    );
  }
}
