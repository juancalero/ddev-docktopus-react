// frontend_react/vite.config.js
// #ddev-generated: If you want to edit and own this file, remove this line.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const projectName = process.env.DDEV_PROJECT_NAME || 'localhost'

export default defineConfig({
  define: {
    'process.env.DDEV_PROJECT': JSON.stringify(projectName),
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Drupal JSON:API through the Vite dev server.
      '/jsonapi': {
        target: `http://${projectName}.ddev.site`,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
          })
        },
      },
      // Node API from ddev-docktopus-node-api, if installed.
      '/api': {
        target: 'http://node:3000',
        changeOrigin: true,
      },
      '/hello': {
        target: 'http://node:3000',
        changeOrigin: true,
      },
    },
    origin: `http://${projectName}.ddev.site`,
    allowedHosts: [`${projectName}.ddev.site`],
    watch: {
      usePolling: true,
    },
  },
})
