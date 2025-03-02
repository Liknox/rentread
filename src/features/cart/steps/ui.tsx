import { TRANSLATIONS } from "@app/configs/constants/translation"
import { Steps } from "antd"
import cn from "classnames"
import { useTranslation } from "react-i18next"

type Props = {
   current: 0 | 1 | 2
   className?: string
}

export const View = ({ current, className }: Props) => {
   const { t } = useTranslation()
   return (
      <Steps current={current} className={cn("custom-steps", className)}>
         <Steps.Step
            title={t(TRANSLATIONS.order.steps.cartTitle)}
            description={t(TRANSLATIONS.order.steps.cartDescription)}
         />
         <Steps.Step
            title={t(TRANSLATIONS.order.steps.checkoutTitle)}
            description={t(TRANSLATIONS.order.steps.checkoutDescription)}
         />
         <Steps.Step
            title={t(TRANSLATIONS.order.steps.deliveryTitle)}
            description={t(TRANSLATIONS.order.steps.deliveryDescription)}
         />
      </Steps>
   )
}
