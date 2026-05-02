import { useTranslation } from 'react-i18next'
import { LOCALES } from '@/types'
import type { LocaleCode } from '@/types'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language as LocaleCode

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    void i18n.changeLanguage(e.target.value as LocaleCode)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-switcher" className="sr-only">
        {t('language.label')}
      </label>
      <select
        id="language-switcher"
        value={currentLocale}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white py-1.5 ps-3 pe-8 text-sm text-slate-700
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none
          cursor-pointer"
        aria-label={t('language.label')}
      >
        {LOCALES.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.nativeName}
          </option>
        ))}
      </select>
    </div>
  )
}
