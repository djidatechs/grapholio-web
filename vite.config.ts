import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    include: ['react-codemirror2', 'codemirror'],
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'retain-modules',
          transform(code, id) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (id.includes('src/Logic/GraphlolioScriptLanguage/GCMrefactor.ts')) {
              return {
                code,
                moduleSideEffects: 'no-treeshake', // Prevent treeshaking
              };
            }
          },
        },
      ],
    }
  }
})
