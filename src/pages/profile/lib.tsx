import { viewerLib } from "entities/viewer"
import type { User } from "shared/api"

export const getStats = (viewer: User) => {
   const stat = viewerLib.getUserStat(viewer)

   return [
      {
         id: "registered",
         label: "Service user since",
         value: stat.registered,
      },
      {
         id: "saved",
         label: "Saved",
         value: stat.saved,
      },
   ]
}
