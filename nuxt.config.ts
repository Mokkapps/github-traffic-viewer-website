import siteMetadata from './app/siteMetadata'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  compatibilityDate: '2024-08-12',

  future: {
    compatibilityVersion: 4,
  },

  devtools: {
    enabled: true,
  },

  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/eslint', 'nuxt-auth-utils', 'nuxt-umami'],

  app: {
    head: {
      noscript: [{ textContent: 'Javascript is required' }],
    },
  },

  devServer: {
    port: 4004,
  },

  imports: {
    dirs: ['./types/**'],
  },

  routeRules: {
    '/traffic-data': { ssr: false },
  },

  site: {
    url: 'https://github-traffic-viewer.netlify.app',
    name: siteMetadata.projectName,
    description: siteMetadata.description,
    defaultLocale: 'en',
  },

  umami: {
    domains: ['github-traffic-viewer.netlify.app'],
    ignoreLocalhost: true,
    proxy: 'cloak',
  },
})
