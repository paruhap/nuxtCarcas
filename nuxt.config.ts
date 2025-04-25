// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-04-24',
  devtools: { enabled: true },
  imports: {
    scan: true
  },
  css: ['assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['nuxt-auth-utils'], 
  routeRules: {
    '/login': { prerender: false }
  },
  nitro: {
    externals: {
      external: ['better-sqlite3'],
      inline: ['better-sqlite3']
    },
    esbuild: {
      options: {
        target: 'node14'
      }
    }
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    adminMail: process.env.ADMIN_MAIL,
    adminPassword: process.env.ADMIN_PASSWORD
  }
})