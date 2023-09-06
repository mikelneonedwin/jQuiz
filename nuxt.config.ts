// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  imports:{
    presets: [
      {
        from: 'pinia',
        imports: ['storeToRefs', 'defineStore']
      }
    ]
  },
  app: {
    head: {
      title: 'jQuiz',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel:"icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png" },
        { rel:"manifest", href:"/site.webmanifest" },
        { rel:"stylesheet", href:"/css/google-font.css" },
      ]
    }
  }
})

