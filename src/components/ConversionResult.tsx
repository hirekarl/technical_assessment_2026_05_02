import { useTranslation } from 'react-i18next'

interface ConversionResultProps {
  formattedValue: string | null
  unit: string
}

export default function ConversionResult({ formattedValue, unit }: ConversionResultProps) {
  const { t } = useTranslation()

  const display = formattedValue
    ? t('result.output', { value: formattedValue, unit })
    : t('result.empty')

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {t('form.resultLabel')}
      </p>
      <output
        aria-live="polite"
        aria-atomic="true"
        className="block text-2xl font-semibold text-indigo-700 dark:text-indigo-400"
      >
        {display}
      </output>
    </div>
  )
}
