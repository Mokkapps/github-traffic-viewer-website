import siteMetadata from './app/siteMetadata'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro', 'nuxt-umami'],
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/seo', '@nuxt/eslint'],
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
    '/': { prerender: true },
    '/traffic-data': { ssr: false },
    '/login': { ssr: false },
    '/privacy-policy': { prerender: true },
  },
  supabase: {
    redirect: false,
  },
  site: {
    url: 'https://github-traffic-viewer.netlify.app',
    name: siteMetadata.projectName,
    description: siteMetadata.description,
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
})
