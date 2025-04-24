import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      // Generates .d.ts files from your Typescript sources
      tsconfigPath: './tsconfig.app.json', // Adjust if your tsconfig is named differently
      outDir: 'dist/types' // Optional: Output directory for declarations
    })
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'), // Your library's entry point
      name: 'VChat', // The variable name to expose in UMD builds
      fileName: (format) => `v-chat.${format}.js`, // Naming scheme for build outputs
      formats: ['es', 'umd', 'cjs'] // Specify desired output formats (ES Module, Universal Module Definition, CommonJS)
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      // into your library (like Vue itself)
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue' // Map 'vue' import to global 'Vue' variable
        }
        // IMPORTANT: Ensure assetFileNames doesn't force CSS bundling if not intended.
        // Vite's default behavior with the plugin should handle CSS correctly for dev/app builds,
        // but for a library, we rely on the user's build. If Vite automatically extracts
        // CSS even in library mode (which it might), users would need to import it.
        // Double-check Vite's library mode CSS handling with the TW plugin.
        // If it *does* extract CSS (e.g., to dist/style.css), you MUST document this
        // and add it to package.json `exports` and `files`.
        // However, the goal is typically *not* to ship pre-compiled TW CSS.
        // assetFileNames: (assetInfo) => {
        //   if (assetInfo.name === 'style.css') {
        //     // Optional: Rename if you *do* intend to ship CSS,
        //     // but ideally, no Tailwind CSS is bundled here for the library.
        //     return 'my-library-styles.css'
        //   }
        //   return assetInfo.name
        // }
      }
    },
    sourcemap: true, // Optional: Generate source maps for debugging
    emptyOutDir: true // Recommended: Cleans the output directory before building
  }
})
