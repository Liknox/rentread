const getMobileInfo = () => {
   const userAgent = window.navigator.userAgent
   const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
   return mobileRegex.test(userAgent)
}

export const isMobile = getMobileInfo()
