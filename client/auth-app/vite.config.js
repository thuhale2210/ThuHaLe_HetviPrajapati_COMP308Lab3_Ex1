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
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/LoginComponent.jsx",
        "./Signup": "./src/SignupComponent.jsx",
      }
    })
  ],
  server: {
    port: 5001,
  },
  build: {
    target: "esnext",
  },
});
