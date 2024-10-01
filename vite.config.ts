import config from './src/config/config';
// import config from '@/config/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";
import dotenv from "dotenv";

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [ 
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') }
    
     ],
  },
  server: {
    host: true
  },
  base: process.env.VITE_URL_SUBDIR,
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})

