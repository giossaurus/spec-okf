import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  // templates/ NÃO é compilado: é copiado em runtime pelo CLI.
  // Mantemos o bundle pequeno e as dependências externas (resolvidas via node_modules do pacote).
  banner: {
    js: "#!/usr/bin/env node",
  },
});
