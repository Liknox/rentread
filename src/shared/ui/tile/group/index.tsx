import { Row } from "antd"

import Tile from "../view"
import type { TileItem } from "../view"

type Props = {
   data: TileItem[]
   itemSpan?: number
   className?: string
}

const TileGroup = (props: Props) => {
   const { data, className, itemSpan } = props

   return (
      <Row justify="space-between" gutter={[0, 20]} className={className}>
         {data.map(datum => (
            <Tile key={String(datum.label)} {...datum} span={itemSpan} />
         ))}
      </Row>
   )
}

export default TileGroup
