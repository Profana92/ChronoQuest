import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: ['en', 'pl'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: 'This is a template text.',
            part2: 'Are other languages correct?',
          },
        },
      },
      pl: {
        translation: {
          description: {
            part1: 'To jest tekst szablonu.',
            part2: 'Czy pozostałe języki działają?',
          },
        },
      },
      de: {
        translation: {
          description: {
            part1: 'Dies ist ein Vorlagentext.',
            part2: 'Funktionieren andere Sprachen?',
          },
        },
      },
    },
  })

export default i18n
