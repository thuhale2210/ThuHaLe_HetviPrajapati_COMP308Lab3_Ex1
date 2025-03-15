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
      remotes: {
        auth: 'http://localhost:5001/assets/remoteEntry.js',
        community: 'http://localhost:5002/assets/remoteEntry.js'
      }
    })
  ],
  server: {
    port: 5000,
  },
});
