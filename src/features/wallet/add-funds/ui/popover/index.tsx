import type { PopoverProps } from "antd"
import { Button, Popover } from "antd"
import type { CSSProperties } from "react"

import { useShowPopover } from "@pages/hooks"
import { walletModel } from "entities/wallet"
import AddFundsForm from "../form"

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
         onOpenChange={handleOpenChange}
         aria-modal="true">
         <Button
            shape="round"
            type="dashed"
            style={buttonStyle}
            aria-label={`${viewer.wallet}$ ${open ? "Close" : "Open"} add funds form`}
            aria-haspopup="dialog"
            aria-expanded={open}>
            {viewer.wallet} $
         </Button>
      </Popover>
   )
}

export default AddFundsPopover
