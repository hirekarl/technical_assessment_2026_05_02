import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NumberInput from './NumberInput'
import DirectionToggle from './DirectionToggle'
import ConversionResult from './ConversionResult'
import { convert, formatResult } from '@/utils/conversion'
import type { ConversionDirection } from '@/types'

export default function ConverterForm() {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const [direction, setDirection] = useState<ConversionDirection>('kmToMi')

  const numericValue = parseFloat(inputValue)
  const isValid = inputValue !== '' && !isNaN(numericValue) && isFinite(numericValue)
  const resultValue = isValid ? convert(numericValue, direction) : null
  const formattedResult = resultValue !== null ? formatResult(resultValue) : null

  const resultUnit =
    direction === 'kmToMi'
      ? Math.abs(numericValue) === 1
        ? t('units.mile')
        : t('units.mile_plural')
      : Math.abs(numericValue) === 1
        ? t('units.km')
        : t('units.km_plural')

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label={t('app.title')}
      className="flex flex-col gap-6"
      noValidate
    >
      <NumberInput
        id="converter-input"
        value={inputValue}
        onChange={setInputValue}
        label={t('form.inputLabel')}
      />
      <DirectionToggle value={direction} onChange={setDirection} />
      <ConversionResult formattedValue={formattedResult} unit={resultUnit} />
    </form>
  )
}
