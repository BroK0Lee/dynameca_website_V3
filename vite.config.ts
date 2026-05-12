import { defineConfig, type PreviewServer } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Plugin qui sert les fichiers 3D (.glb, .gltf, .bin) AVANT le fallback SPA
// Nécessaire car Vite preview intercepte toutes les routes inconnues avec index.html
function pluginFichiers3D() {
  return {
    name: 'servir-fichiers-3d',
    configurePreviewServer(serveur: PreviewServer) {
      serveur.middlewares.use((req, res, next) => {
        const url = req.url ?? ''
        if (!url.endsWith('.glb') && !url.endsWith('.gltf') && !url.endsWith('.bin')) {
          return next()
        }
        const cheminFichier = path.join(process.cwd(), 'dist', decodeURIComponent(url.split('?')[0]))
        if (fs.existsSync(cheminFichier)) {
          const mimeType = url.endsWith('.glb')
            ? 'model/gltf-binary'
            : url.endsWith('.gltf')
              ? 'model/gltf+json'
              : 'application/octet-stream'
          res.setHeader('Content-Type', mimeType)
          res.statusCode = 200
          fs.createReadStream(cheminFichier).pipe(res as unknown as NodeJS.WritableStream)
        } else {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pluginFichiers3D()],
  // Reconnaître les fichiers 3D comme assets en mode dev
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.bin'],
})
