import { useEffect, useState } from "react"

const getMobileInfo = () => {
  const userAgent = window.navigator.userAgent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return mobileRegex.test(userAgent)
}

const isMobileViewport = () => {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

const isMobile = typeof window !== "undefined" ? getMobileInfo() || isMobileViewport() : false

export const useMobileDetection = () => {
  const [isMobileView, setIsMobileView] = useState(isMobile)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(getMobileInfo() || isMobileViewport())
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobileView
}

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    xss: false, // < 360px
    xs: false, // < 576px
    sm: false, // >= 576px
    md: false, // >= 768px
    lg: false, // >= 992px
    xl: false, // >= 1200px
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setBreakpoint({
        xss: width < 360,
        xs: width < 576,
        sm: width >= 576 && width < 768,
        md: width >= 768 && width < 992,
        lg: width >= 992 && width < 1200,
        xl: width >= 1200,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return breakpoint
}
