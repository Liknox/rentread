/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd"
import type { IconType } from "antd/es/notification/interface"
import type { ReactNode } from "react"

/**
 * NOTE: Moved to a separate module for:
 * - Simplifying the API (more normalized and familiar)
 * - Standardizing a unified placement for all alerts
 */
const generateOpener =
   (type: IconType) =>
   (
      message: string,
      description?: ReactNode,
      icon?: ReactNode,
      // eslint-disable-next-line max-params
   ) => {
      notification.open({ type, message, description, placement: "bottomRight", icon })
   }

const error = generateOpener("error")
const success = generateOpener("success")
const warn = generateOpener("warning")
const info = generateOpener("info")

const alert = { error, success, warn, info }

export default alert
