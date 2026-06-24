import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { Command } from "commander";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { runInit } from "./commands/init.js";
import { runUpdate } from "./commands/update.js";

const distDir = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(distDir, "..", "package.json"), "utf8")
) as { version: string };

function ctx() {
  return { distDir, version: pkg.version, now: new Date().toISOString() };
}

const program = new Command();

program
  .name("spec-okf")
  .description(
    "Configura projetos com Spec-Driven Development + Open Knowledge Format (OKF)."
  )
  .version(pkg.version, "-v, --version");

program
  .command("init", { isDefault: true })
  .argument("[dir]", "diretório alvo (padrão: diretório atual)")
  .description("Cria a estrutura SDD + bundle OKF e os arquivos dos agentes.")
  .option("--agent <lista>", "agentes separados por vírgula (claude,codex,cursor,gemini,copilot,windsurf)")
  .option("--all", "configura todos os agentes")
  .option("--force", "sobrescreve arquivos existentes")
  .option("--yes", "modo não-interativo (assume todos os agentes se nada for informado)")
  .action(async (dir, opts) => {
    p.intro(pc.bgCyan(pc.black(" spec-okf ")));
    try {
      await runInit(dir, opts, ctx());
    } catch (err) {
      fail(err);
    }
  });

program
  .command("update")
  .argument("[dir]", "diretório alvo (padrão: diretório atual)")
  .description("Atualiza a maquinaria (agentes + methodology), preservando seu conteúdo.")
  .option("--agent <lista>", "sobrescreve os agentes do manifest")
  .option("--all", "atualiza todos os agentes")
  .action(async (dir, opts) => {
    p.intro(pc.bgCyan(pc.black(" spec-okf update ")));
    try {
      await runUpdate(dir, opts, ctx());
    } catch (err) {
      fail(err);
    }
  });

function fail(err: unknown): never {
  const msg = err instanceof Error ? err.message : String(err);
  p.log.error(pc.red(msg));
  process.exit(1);
}

program.parseAsync();
