import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { dom } from "@shared/lib"

/**
 * @hook Logic for resetting scroll position at every page
 */
export const useResetScrollAtEveryPage = () => {
   const location = useLocation()
   const hash = location.hash
   const prevPath = useRef<string>()

   useEffect(() => {
      if (prevPath.current !== location.pathname && !hash) {
         dom.scrollToTop()
      }

      prevPath.current = location.pathname
   }, [location.pathname, hash])
}

export const useShowPopover = () => {
   const [open, setOpen] = useState(false)

   const handleAction = () => {
      setOpen(false)
   }

   const handleOpenChange = (value: boolean) => {
      setOpen(value)
   }

   return { open, handleAction, handleOpenChange }
}
