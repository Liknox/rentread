import { notification } from "antd"
import type { IconType, NotificationPlacement, ArgsProps } from "antd/es/notification/interface"
import type { ReactNode } from "react"

export interface AlertOptions {
   duration?: number
   placement?: NotificationPlacement
   icon?: ReactNode
   closable?: boolean
   className?: string
   onClose?: () => void
   props?: Partial<ArgsProps>
}

const defaultOptions: AlertOptions = {
   duration: window.innerWidth < 768 ? 1.5 : 5,
   placement: window.innerWidth < 768 ? "top" : "bottomRight",
   closable: true,
}

const createNotification = (type: IconType, message: string, description?: ReactNode, options?: AlertOptions) => {
   const mergedOptions = { ...defaultOptions, ...options }

   notification.open({
      type,
      message,
      description,
      duration: mergedOptions.duration,
      placement: mergedOptions.placement,
      icon: mergedOptions.icon,
      closable: mergedOptions.closable,
      className: mergedOptions.className,
      onClose: mergedOptions.onClose,
      ...(mergedOptions.props || {}),
   })
}

const alert = {
   error: (message: string, description?: ReactNode, options?: AlertOptions) =>
      createNotification("error", message, description, options),

   success: (message: string, description?: ReactNode, options?: AlertOptions) =>
      createNotification("success", message, description, options),

   warn: (message: string, description?: ReactNode, options?: AlertOptions) =>
      createNotification("warning", message, description, options),

   info: (message: string, description?: ReactNode, options?: AlertOptions) =>
      createNotification("info", message, description, options),

   closeAll: () => notification.destroy(),
}

export default alert
