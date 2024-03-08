// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/seo'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  app: {
    head: {
      script: [
        {
          src: 'https://analytics.mokkapps.de/mokkapps',
          async: true,
          defer: true,
          'data-website-id': 'f1f9818c-4cc1-4b7d-b491-5af2fcd328e9',
          'data-host-url': 'https://analytics.mokkapps.de',
          'data-domains': 'github-traffic-viewer.netlify.app',
          'data-do-not-track': true,
        },
      ],
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
    name: 'GitHub Traffic Viewer',
    description: 'Instant analytics for views of your repositories empowering you to optimize them effortlessly.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
})
