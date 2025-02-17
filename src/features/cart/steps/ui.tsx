import { Steps } from "antd"
import cn from "classnames"

type Props = {
   current: 0 | 1 | 2
   className?: string
}

export const View = ({ current, className }: Props) => (
   <Steps current={current} className={cn("custom-steps", className)}>
      <Steps.Step title="Cart" description="Check your choice" />
      <Steps.Step title="Checkout" description="Payment and delivery selection" />
      <Steps.Step title="Delivery" description="Order pickup" />
   </Steps>
)
