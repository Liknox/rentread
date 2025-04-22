import { Radio } from "antd"
import { useTranslation } from "react-i18next"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { DEFAULT, TARIFFS } from "../../lib"

type Props = {
   onChange?: (value: number) => void
   withTitle?: boolean
   value?: number
   disabled?: boolean
   __byDuration?: number
}

const TariffRadio = (props: Props) => {
   const { t } = useTranslation()
   const { onChange, value = DEFAULT, disabled, __byDuration } = props

   // !!! FIXME: Very bad practice, refine later !!!
   const getTValue = (tarrif: number) => {
      if (!__byDuration) return tarrif
      return tarrif <= __byDuration ? value : -1
   }

   return (
      <div className="text-center flex flex-col items-center">
         <Radio.Group
            value={value}
            buttonStyle="solid"
            onChange={e => onChange?.(e.target.value)}
            className="md:mt-3 flex whitespace-nowrap"
            disabled={disabled || Boolean(__byDuration)}>
            {TARIFFS.map(tarrif => (
               <Radio.Button
                  key={tarrif}
                  value={disabled ? getTValue(tarrif) : tarrif}
                  disabled={disabled || tarrif > __byDuration!}>
                  {tarrif}
                  {t(TRANSLATIONS.actions.tarrifButton)}.
               </Radio.Button>
            ))}
         </Radio.Group>
      </div>
   )
}

export default TariffRadio
