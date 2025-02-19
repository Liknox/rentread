import { Button, Form, Input, Typography } from "antd"
import cn from "classnames"
import { useState } from "react"

import { viewerModel } from "entities/viewer"

type Props = {
   className?: string
}

const MIN_MONEY = 5

const AddFundsForm = ({ className }: Props) => {
   const viewer = viewerModel.useViewerWallet()
   const [money, setMoney] = useState(MIN_MONEY)
   const isValid = money >= MIN_MONEY

   return (
      <div className={cn("p-5", className)}>
         <Typography.Title level={4}>Wallet Deposit</Typography.Title>
         <Form.Item
            // FIXME: simplify!
            validateStatus={isValid ? "success" : "error"}
            help="The minimum payment is 5$">
            <Input
               addonAfter="$"
               min={MIN_MONEY}
               type="number"
               value={money || ""}
               onChange={e => setMoney(Number(e.target.value))}
               placeholder="Enter the required amount ..."
            />
         </Form.Item>
         <Typography.Text type="secondary" className="block mt-10 mb-5">
            **The payment will be processed on an external service that complies with PCI DSS security standards.**
         </Typography.Text>
         <Button
            type="primary"
            block
            // href="#redirect-to-payment-service"
            onClick={() => {
               console.debug("[DEBUG] reachGoal: APPLY_TRANSACTION")
               // FIXME: create wallet store and update this store (not only localStorage)
               viewer.payment.applyTransaction(money).then(() => location.reload())
            }}
            loading={viewer.payment.isPending}
            disabled={!isValid}>
            Deposit
         </Button>
      </div>
   )
}

export default AddFundsForm
