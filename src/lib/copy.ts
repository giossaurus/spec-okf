import { cp, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { readdir } from "node:fs/promises";

export interface CopyResult {
  created: string[];
  skipped: string[];
  overwritten: string[];
}

/**
 * Copia recursivamente `srcDir` para `destDir` de forma "merge-aware":
 * arquivos existentes só são sobrescritos quando `force` é true.
 *
 * Retorna a relação de arquivos criados / pulados / sobrescritos (caminhos
 * relativos a `destDir`) para feedback ao usuário.
 */
export async function copyTree(
  srcDir: string,
  destDir: string,
  force: boolean
): Promise<CopyResult> {
  const result: CopyResult = { created: [], skipped: [], overwritten: [] };

  if (!existsSync(srcDir)) {
    throw new Error(`Diretório de template não encontrado: ${srcDir}`);
  }

  for (const rel of await listFiles(srcDir)) {
    const from = join(srcDir, rel);
    const to = join(destDir, rel);
    const exists = existsSync(to);

    if (exists && !force) {
      result.skipped.push(rel);
      continue;
    }

    await mkdir(dirname(to), { recursive: true });
    await cp(from, to);

    if (exists) result.overwritten.push(rel);
    else result.created.push(rel);
  }

  return result;
}

/** Lista recursivamente os arquivos de um diretório (caminhos relativos). */
async function listFiles(dir: string, base = dir): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listFiles(full, base)));
    } else {
      out.push(relative(base, full));
    }
  }
  return out;
}

/** Resolve o diretório `templates/` empacotado, relativo ao `dist/cli.js`. */
export function templatesRoot(distDir: string): string {
  // dist/ e templates/ são irmãos dentro do pacote publicado.
  const candidate = join(distDir, "..", "templates");
  if (!existsSync(candidate)) {
    throw new Error(`Pasta de templates não encontrada em ${candidate}`);
  }
  return candidate;
}

export async function isDir(p: string): Promise<boolean> {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
}
