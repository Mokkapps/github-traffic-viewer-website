// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/seo'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  devtools: {
    enabled: true,
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
