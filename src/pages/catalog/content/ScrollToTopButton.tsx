import { UpOutlined } from "@ant-design/icons"
import { Button } from "antd"
import cn from "classnames"

import { useScrollY } from "@shared/lib/browser/useScrollY"
import { scrollToTop } from "@shared/lib/dom"

function ScrollToTopButton() {
   const y = useScrollY()

   return (
      <Button
         type="primary"
         onClick={scrollToTop}
         className={cn("fixed bottom-5 right-5 duration-300 z-10 shadow-insetDark", {
            "opacity-0 translate-y-2 pointer-events-none": y < 100,
            "opacity-100 translate-y-0": y >= 100,
         })}>
         <UpOutlined />
      </Button>
   )
}

export default ScrollToTopButton
