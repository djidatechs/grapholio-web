// vite.config.ts
import { defineConfig } from "file:///D:/Grapholiov2/grapholio_v2.1/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Grapholiov2/grapholio_v2.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "/",
  optimizeDeps: {
    include: ["react-codemirror2", "codemirror"]
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "retain-modules",
          transform(code, id) {
            if (id.includes("src/Logic/GraphlolioScriptLanguage/GCMrefactor.ts")) {
              return {
                code,
                moduleSideEffects: "no-treeshake"
                // Prevent treeshaking
              };
            }
          }
        }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHcmFwaG9saW92MlxcXFxncmFwaG9saW9fdjIuMVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR3JhcGhvbGlvdjJcXFxcZ3JhcGhvbGlvX3YyLjFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0dyYXBob2xpb3YyL2dyYXBob2xpb192Mi4xL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYmFzZTogJy8nLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0LWNvZGVtaXJyb3IyJywgJ2NvZGVtaXJyb3InXSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncmV0YWluLW1vZHVsZXMnLFxuICAgICAgICAgIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzcmMvTG9naWMvR3JhcGhsb2xpb1NjcmlwdExhbmd1YWdlL0dDTXJlZmFjdG9yLnRzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgICAgIG1vZHVsZVNpZGVFZmZlY3RzOiAnbm8tdHJlZXNoYWtlJywgLy8gUHJldmVudCB0cmVlc2hha2luZ1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1EsU0FBUyxvQkFBb0I7QUFDNVMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsRUFDTixjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMscUJBQXFCLFlBQVk7QUFBQSxFQUM3QztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFVBQVUsTUFBTSxJQUFJO0FBR2xCLGdCQUFJLEdBQUcsU0FBUyxtREFBbUQsR0FBRztBQUNwRSxxQkFBTztBQUFBLGdCQUNMO0FBQUEsZ0JBQ0EsbUJBQW1CO0FBQUE7QUFBQSxjQUNyQjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
