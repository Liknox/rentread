import { notification } from "antd"
import type { IconType } from "antd/es/notification/interface"
import type { ReactNode } from "react"

import { isMobile } from "../browser"

/**
 * NOTE: Moved to a separate module for:
 * - Simplifying the API (more normalized and familiar)
 * - Standardizing a unified placement for all alerts
 */
const generateOpener = (type: IconType) => (message: string, description?: ReactNode, icon?: ReactNode) => {
   notification.open({
      icon,
      type,
      message,
      description,
      duration: isMobile ? 1.5 : 5,
      placement: isMobile ? "top" : "bottomRight",
   })
}

const error = generateOpener("error")
const success = generateOpener("success")
const warn = generateOpener("warning")
const info = generateOpener("info")

const alert = { error, success, warn, info }

export default alert
