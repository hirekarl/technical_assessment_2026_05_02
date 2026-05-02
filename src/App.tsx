import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ConverterForm from './components/ConverterForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import { RTL_LOCALES } from './types'
import type { LocaleCode } from './types'

export default function App() {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language as LocaleCode
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const isRtl = RTL_LOCALES.includes(currentLocale)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLocale
  }, [currentLocale])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8 dark:from-slate-950 dark:to-indigo-950">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400">
              {t('app.title')}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('app.tagline')}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <LanguageSwitcher />
          </div>
        </header>

        <main>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <ConverterForm />
          </div>
        </main>

        <footer className="mt-8 space-y-1 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>km ↔ mi · 1 mile = 1.60934 km</p>
          <p>
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/hirekarl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              Karl Johnson
            </a>
            {' · '}
            <a
              href="https://github.com/hirekarl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              GitHub
            </a>
          </p>
          <p>
            <a
              href="https://www.pursuit.org/ai-native-program"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              Pursuit AI-Native Fellowship
            </a>
            {' · L1 Technical Assessment · March 2026'}
          </p>
        </footer>
      </div>
    </div>
  )
}
