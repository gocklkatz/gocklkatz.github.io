import { defineConfig } from "astro/config";

// User site at https://gocklkatz.github.io — served from the domain root, so no `base`.
export default defineConfig({
  site: "https://gocklkatz.github.io",
  output: "static",
  trailingSlash: "ignore",
});
