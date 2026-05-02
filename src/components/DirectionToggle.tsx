import { useTranslation } from 'react-i18next'
import type { ConversionDirection } from '@/types'

interface DirectionToggleProps {
  value: ConversionDirection
  onChange: (direction: ConversionDirection) => void
}

const DIRECTIONS: ConversionDirection[] = ['kmToMi', 'miToKm']

export default function DirectionToggle({ value, onChange }: DirectionToggleProps) {
  const { t } = useTranslation()

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        {t('form.directionLabel')}
      </legend>
      <div className="flex gap-2">
        {DIRECTIONS.map((dir) => (
          <label
            key={dir}
            className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors
              ${
                value === dir
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:bg-indigo-950'
              }`}
          >
            <input
              type="radio"
              name="direction"
              value={dir}
              checked={value === dir}
              onChange={() => onChange(dir)}
              className="sr-only"
            />
            {t(`directions.${dir}`)}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
