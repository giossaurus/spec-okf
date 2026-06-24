import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

export interface Manifest {
  /** Versão do CLI que gerou/atualizou o projeto. */
  generator: string;
  version: string;
  /** Agentes habilitados neste projeto. */
  agents: string[];
  /** Timestamp ISO 8601 da última escrita. */
  updatedAt: string;
}

const MANIFEST_PATH = ".spec-okf/manifest.json";

export function manifestPath(projectDir: string): string {
  return join(projectDir, MANIFEST_PATH);
}

export async function readManifest(projectDir: string): Promise<Manifest | null> {
  const p = manifestPath(projectDir);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(await readFile(p, "utf8")) as Manifest;
  } catch {
    return null;
  }
}

export async function writeManifest(
  projectDir: string,
  data: Omit<Manifest, "generator">,
  now: string
): Promise<void> {
  const p = manifestPath(projectDir);
  await mkdir(dirname(p), { recursive: true });
  const manifest: Manifest = {
    generator: "@giossaurus/spec-okf",
    version: data.version,
    agents: data.agents,
    updatedAt: now,
  };
  await writeFile(p, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}
