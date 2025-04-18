import { useEffect, useState } from "react"

const getMobileInfo = () => {
   const userAgent = window.navigator.userAgent
   const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
   return mobileRegex.test(userAgent)
}

export const isMobile = typeof window !== "undefined" ? getMobileInfo() : false

export const useMobileDetection = () => {
   const [isMobileView, setIsMobileView] = useState(isMobile)

   useEffect(() => {
      const handleResize = () => {
         setIsMobileView(getMobileInfo())
      }

      window.addEventListener("resize", handleResize)

      handleResize()

      return () => {
         window.removeEventListener("resize", handleResize)
      }
   }, [])

   return isMobileView
}
