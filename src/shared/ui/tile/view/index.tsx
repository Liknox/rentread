import { Col } from "antd"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

export type TileItem = {
   id: string
   label: string
   value: ReactNode
}
export type TileProps = TileItem & {
   className?: string
   span?: number
}

const TileView = (props: TileProps) => {
   const { t } = useTranslation()
   const { label, value, span } = props

   return (
      <Col
         span={span}
         className="font-roboto flex md:min-w-0 min-w-full items-center justify-center h-[144px] p-[18px] text-[18px] text-darkGray bg-[var(--color-accent)] border border-[var(--color-accent)] rounded-[25px] transition duration-200 hover:shadow-inset">
         <span>
            {t(label)}
            <br />
            <b>{value}</b>
         </span>
      </Col>
   )
}

export default TileView
