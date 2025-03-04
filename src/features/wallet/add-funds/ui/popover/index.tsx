import { Button, Popover } from "antd"
import type { PopoverProps } from "antd"
import { walletModel } from "entities/wallet"
import { type CSSProperties } from "react"
import AddFundsForm from "../form"
import { useShowPopover } from "@pages/hooks"

type Props = {
   className?: string
   placement?: PopoverProps["placement"]
   buttonStyle?: CSSProperties
}

const AddFundsPopover = ({ className, placement = "bottom", buttonStyle }: Props) => {
   const viewer = walletModel.useViewerWallet()
   const { open, handleAction, handleOpenChange } = useShowPopover()

   return (
      <Popover
         open={open}
         trigger="click"
         className={className}
         placement={placement}
         content={<AddFundsForm afterAction={handleAction} className="w-full sm:w-[350px]" />}
         onOpenChange={handleOpenChange}>
         <Button shape="round" type="dashed" style={buttonStyle}>
            {viewer.wallet} $
         </Button>
      </Popover>
   )
}

export default AddFundsPopover
