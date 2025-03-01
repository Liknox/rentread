import { Radio } from "antd"
import { DEFAULT, TARIFFS } from "../../lib"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useTranslation } from "react-i18next"

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

   // !!! FIXME: Very bad practice !!!
   const getTValue = (tarrif: number) => {
      if (!__byDuration) return tarrif
      return tarrif <= __byDuration ? value : -1
   }

   return (
      <div className="text-center flex flex-col items-center">
         {/* {withTitle && <h4>Rent Terms</h4>} */}
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
