import { Button, Form, Input, Typography } from "antd"
import cn from "classnames"
import { useState } from "react"

import { TRANSLATIONS } from "@app/configs/constants/translation"
import { viewerModel } from "entities/viewer"
import { useTranslation } from "react-i18next"

type Props = {
   className?: string
}

const MIN_MONEY = 5
const MAX_MONEY = 100

const AddFundsForm = ({ className }: Props) => {
   const { t } = useTranslation()
   const viewer = viewerModel.useViewerWallet()
   const [money, setMoney] = useState(MIN_MONEY)
   const isValid = money >= MIN_MONEY && money <= MAX_MONEY

   return (
      <div className={cn("p-5", className)}>
         <Typography.Title level={4}>{t(TRANSLATIONS.features.wallet.title)}</Typography.Title>
         <Form.Item
            // FIXME: simplify!
            validateStatus={isValid ? "success" : "error"}
            help={`${t(TRANSLATIONS.features.wallet.help.start)} ${MIN_MONEY}$, ${t(TRANSLATIONS.features.wallet.help.end)} ${MAX_MONEY}$.`}>
            <Input
               className="w-[300px]"
               addonAfter="$"
               min={MIN_MONEY}
               type="number"
               value={money || ""}
               onChange={e => setMoney(Number(e.target.value))}
               placeholder={t(TRANSLATIONS.features.wallet.placeholder)}
            />
         </Form.Item>
         <Typography.Text type="secondary" className="block mt-10 mb-5">
            {t(TRANSLATIONS.features.wallet.text)}
         </Typography.Text>
         {isValid ? (
            <Button
               type="primary"
               block
               // href="#redirect-to-payment-service"
               onClick={() => {
                  console.debug("[DEBUG] reachGoal: APPLY_TRANSACTION")
                  // FIXME: create wallet store and update this store (not only localStorage)
                  viewer.payment.applyTransaction(money).then(() => location.reload())
               }}
               loading={viewer.payment.isPending}>
               {t(TRANSLATIONS.features.wallet.button)}
            </Button>
         ) : (
            <Button block type="default" disabled>
               {t(TRANSLATIONS.features.wallet.button)}
            </Button>
         )}
      </div>
   )
}

export default AddFundsForm
