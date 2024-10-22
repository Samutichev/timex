import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './index.css'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  messages: {
    ru: {
      start: 'Старт',
      pause: 'Пауза',
      reset: 'Сброс',
      rewind: 'Отмотать',
      language: 'Язык',
      theme: 'Тема',
      light: 'Светлая',
      dark: 'Темная'
    },
    en: {
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      rewind: 'Rewind',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark'
    }
  }
})

createApp(App).use(i18n).mount('#app')
