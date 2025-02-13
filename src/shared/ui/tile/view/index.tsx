import type { ReactNode } from "react"
import { Col } from "antd"

export type TileItem = {
   label: ReactNode
   value: ReactNode
}
export type TileProps = TileItem & {
   className?: string
   span?: number
}

const TileView = (props: TileProps) => {
   const { label, value, className, span } = props

   console.log(className)

   return (
      <Col
         span={span}
         className="flex items-center justify-center h-[144px] p-[18px] text-[18px] text-darkGray bg-[var(--color-accent)] border border-[var(--color-accent)] rounded-[25px] transition duration-200">
         <span>
            {label}
            <br />
            <b>{value}</b>
         </span>
      </Col>
   )
}

export default TileView
