import { Radio } from "antd"
import { DEFAULT, TARIFFS } from "../../lib"

type Props = {
   onChange?: (value: number) => void
   withTitle?: boolean
   value?: number
   disabled?: boolean
   __byDuration?: number
}

const TariffRadio = (props: Props) => {
   const { onChange, value = DEFAULT, disabled, __byDuration } = props

   // !!! FIXME: Very bad practice !!!
   const getTValue = (t: number) => {
      if (!__byDuration) return t
      return t <= __byDuration ? value : -1
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
            {TARIFFS.map(t => (
               <Radio.Button key={t} value={disabled ? getTValue(t) : t} disabled={disabled || t > __byDuration!}>
                  {t}d.
               </Radio.Button>
            ))}
         </Radio.Group>
      </div>
   )
}

export default TariffRadio
