import { Popover, Button } from "antd"
import type { PopoverProps } from "antd"
import { CSSProperties } from "react"

// import { viewerModel } from "entities/viewer"
// import AddFundsForm from "../form"

type Props = {
   className?: string
   placement?: PopoverProps["placement"]
   buttonStyle?: CSSProperties
}

const AddFundsPopover = ({ className, placement = "bottom", buttonStyle }: Props) => {
   //  const viewer = viewerModel.useViewerWallet();

   return (
      <Popover
         trigger="click"
         className={className}
         // content={<AddFundsForm className="w-[350px]" />}
         content={null}
         placement={placement}>
         <Button shape="round" type="dashed" style={buttonStyle}>
            {/* {viewer.wallet} $ */}
            123 $
         </Button>
      </Popover>
   )
}

export default AddFundsPopover
