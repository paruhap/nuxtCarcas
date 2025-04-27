// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-04-24',
  devtools: { enabled: true },
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
    preference: 'dark',
    storageKey: 'nuxt-color-mode',
    fallback: 'dark',
    classSuffix: ''
  },

  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  },

  // app: {
  //   head: {
  //     script: [
  //       {
  //         id: 'theme-init',
  //         innerHTML: `
  //         (function() {
  //           try {
  //             var savedTheme = localStorage.getItem('nuxt-color-mode');
  //             var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
  //             // Если нет сохраненной темы, форсируем dark
  //             if (!savedTheme) {
  //               document.documentElement.classList.add('dark');
  //               document.documentElement.setAttribute('data-theme', 'dark');
  //             }
  //           } catch(e) {}
  //         })()
  //       `,
  //         type: 'text/javascript'
  //       }
  //     ]
  //   }
  // },
  plugins: [
    '~/plugins/theme.listener.ts'
  ],
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