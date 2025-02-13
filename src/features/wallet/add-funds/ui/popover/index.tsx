import { Popover, Button } from "antd"
import type { PopoverProps } from "antd"
import { viewerModel } from "entities/viewer"
import { CSSProperties } from "react"
import AddFundsForm from "../form"

type Props = {
   className?: string
   placement?: PopoverProps["placement"]
   buttonStyle?: CSSProperties
}

const AddFundsPopover = ({ className, placement = "bottom", buttonStyle }: Props) => {
   const viewer = viewerModel.useViewerWallet()

   return (
      <Popover
         trigger="click"
         className={className}
         content={<AddFundsForm className="w-[350px]" />}
         placement={placement}>
         <Button shape="round" type="dashed" style={buttonStyle}>
            {viewer.wallet} $
         </Button>
      </Popover>
   )
}

export default AddFundsPopover
