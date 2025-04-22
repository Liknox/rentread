import { SKELETON_DELAY } from "@app/configs/constants"
import { useEffect, useState } from "react"
import { loadingState } from "./loadingState"

export const useSkeleton = (sectionName: string) => {
   const [isLoading, setIsLoading] = useState(!loadingState.hasLoaded(sectionName))

   useEffect(() => {
      if (isLoading) {
         const timer = setTimeout(() => {
            setIsLoading(false)
            loadingState.markAsLoaded(sectionName)
         }, SKELETON_DELAY)
         return () => clearTimeout(timer)
      }
   }, [isLoading, sectionName])

   return isLoading
}
