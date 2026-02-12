import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import fs from 'fs';
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [vue()],
    base: '/app/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      }
    },
    server: {
      middlewareMode: false,
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        });
      },
      // proxy: {
      //   '/getmaster-v2':{
      //         target: `https://api.jalanet.com/`,
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/getmaster-v2/, '/elibrary/master'),
      //         secure: false,
      //     },
      //     '/article-api-v2':{
      //         target: `https://api.jalaera.com/`,
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/article-api-v2/, '/elibrary'),
      //         secure: false,
      //     },
      //     '^/files-api-v2': {
      //         target: 'https://api.jalaera.com/',
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/files-api-v2/, '/elibrary/articles/files'),
      //     },
      //     '/pdf-api-v2': {
      //         target: 'https://jalaniagaelok.web.id',
      //         changeOrigin: true,
      //         secure: false,
      //         rewrite: (path) => path.replace(/^\/pdf-api-v2/, '/files/elibrary/Files'),
      //     },
      // },
      host: env.VITE_APP_ALLOWED_HOSTS,
      port: 443,
      // https: true,
      https: {
        key: fs.readFileSync('./crt/arc-dev.jalaera.com-key.pem'),
        cert: fs.readFileSync('./crt/arc-dev.jalaera.com.pem'),
      },
      hmr: {
        protocol: 'wss',
        host: 'arc-dev.jalaera.com',
        clientPort: 443,
      },
      cors: { 
        origin: '*'
      },
      strictPort: true,
    },
  })
}