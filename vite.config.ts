import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Conditional import for development environment
function loadDevPlugins() {
  // Only load the react-router dev plugin in development mode
  if (process.env.NODE_ENV === "development") {
    try {
      const { reactRouter } = require("@react-router/dev/vite");
      return [reactRouter()];
    } catch (e) {
      console.warn(
        "@react-router/dev not available, skipping reactRouter plugin"
      );
      return [];
    }
  }
  return [];
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), ...loadDevPlugins()],
});
