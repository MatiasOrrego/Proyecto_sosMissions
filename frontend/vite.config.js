import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
build: {
    rollupOptions: {
    input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'public/contact.html'),
        aboutus: resolve(__dirname, 'public/aboutus.html'),
        registro: resolve(__dirname, 'public/registro.html'),
        registrom: resolve(__dirname, 'public/registrom.html'),
        sesion: resolve(__dirname, 'public/sesion.html'),
        foro: resolve(__dirname, 'public/Foro.html'),
    },
    },
},
});