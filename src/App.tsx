import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ConverterForm from './components/ConverterForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import { RTL_LOCALES } from './types'
import type { LocaleCode } from './types'

export default function App() {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language as LocaleCode

  useEffect(() => {
    const isRtl = RTL_LOCALES.includes(currentLocale)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLocale
  }, [currentLocale])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-700">{t('app.title')}</h1>
            <p className="mt-1 text-sm text-slate-500">{t('app.tagline')}</p>
          </div>
          <LanguageSwitcher />
        </header>

        <main>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ConverterForm />
          </div>
        </main>

        <footer className="mt-8 text-center text-xs text-slate-400">
          <p>km ↔ mi · 1 mile = 1.60934 km</p>
        </footer>
      </div>
    </div>
  )
}
