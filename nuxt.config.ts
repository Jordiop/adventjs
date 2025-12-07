// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    },
    publicAssets: [
      {
        dir: 'content',
        maxAge: 60 * 60 * 24 * 365,
        baseURL: '_content'
      }
    ],
    serverAssets: [
      {
        baseName: 'content',
        dir: './content'
      }
    ]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://adventjs-solutions.dev/',
    title: 'AdventJS Solutions',
    description: 'My solutions to AdventJS challenges - JavaScript programming exercises for the holiday season.',
    full: {
      title: 'AdventJS Solutions - All Challenges',
      description: 'Complete collection of AdventJS solutions organized by year and day.'
    },
    sections: [
      {
        title: 'AdventJS',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/adventjs%' }
        ]
      }
    ]
  }
})
