// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  devtools: {
    enabled: true,
  },
  imports: {
    dirs: ['./types/**'],
  },
  supabase: {
    redirect: false,
  },
})
