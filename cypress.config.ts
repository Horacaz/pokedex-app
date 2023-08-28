import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    integrationFolder: "cypress/e2e",
    video: false,
    screenshotOnRunFailure: false,
  },
});
