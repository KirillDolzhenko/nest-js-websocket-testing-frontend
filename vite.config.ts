// import config from './src/config/config';
// import config from '@/config/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";
import dotenv from "dotenv";
import svgr from 'vite-plugin-svgr';
import svgLoader from 'vite-svg-loader'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [ 
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') }
    
     ],
  },
  server: {
    cors: true,
    host: true,
    fs: {
      strict: false,  // чтобы избежать проблем с доступом к файлам

    allow: [
      // Укажите пути к директориям, которые нужно разрешить
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'public'), // если у вас есть публичная директория
    ],
    },

    // proxy: {
    //   '/firechat': {
    //     target: 'http://localhost:4173/', // Здесь укажите ваш реальный бэкенд
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  base: process.env.VITE_URL_SUBDIR,
  build: {
    outDir: 'dist/firechat',
    // rollupOptions: {
    //   input: {
    //     main: path.resolve(__dirname, 'index.html')
    //   }
    // }
  }
})

