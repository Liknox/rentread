import { Col } from "antd"
import type { ReactNode } from "react"

export type TileItem = {
   id: string
   label: ReactNode
   value: ReactNode
}
export type TileProps = TileItem & {
   className?: string
   span?: number
}

const TileView = (props: TileProps) => {
   const { label, value, span } = props

   return (
      <Col
         span={span}
         className="flex items-center justify-center h-[144px] p-[18px] text-[18px] text-darkGray bg-[var(--color-accent)] border border-[var(--color-accent)] rounded-[25px] transition duration-200 hover:shadow-inset">
         <span>
            {label}
            <br />
            <b>{value}</b>
         </span>
      </Col>
   )
}

export default TileView
