// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-04-24',
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          id: 'theme-script',
          innerHTML: `
            try {
              if (localStorage.theme === 'dark' || 
                  (!('theme' in localStorage) && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (_) {}
          `,
          type: 'text/javascript',
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  imports: {
    scan: true
  },
  css: ['assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    'nuxt-auth-utils',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
  tailwindcss: {
    editorSupport: true,
    config: {
      darkMode: 'class'
    }
  },
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
    adminMail: process.env.ADMIN_MAIL,
    adminPassword: process.env.ADMIN_PASSWORD
  }
})