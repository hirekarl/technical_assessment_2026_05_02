import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

interface NumberInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  label: string
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ id, value, onChange, label }, ref) => {
    const { t } = useTranslation()

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('form.inputPlaceholder')}
          dir="ltr"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900
            placeholder:text-slate-400
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none
            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
