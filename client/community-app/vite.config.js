// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "community",
      filename: "remoteEntry.js",
      exposes: {
        "./Posts": "./src/PostComponent.jsx",
        "./HelpRequests": "./src/HelpRequestComponent.jsx",
      }
    })
  ],
  server: {
    port: 5002,
  }
});
