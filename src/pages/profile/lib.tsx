import { viewerLib } from "entities/viewer"
import type { User } from "shared/api"

export const getStats = (viewer: User) => {
   const stat = viewerLib.getUserStat(viewer)

   return [
      {
         key: "registered",
         label: "Service user since",
         value: stat.registered,
      },
      {
         key: "saved",
         label: "Saved",
         value: stat.saved,
      },
   ]
}
