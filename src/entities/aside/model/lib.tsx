import { TRANSLATIONS } from "@app/configs/constants/translation"
import { viewerLib } from "entities/viewer"
import type { User } from "@shared/api"

export const getStats = (viewer: User) => {
   const stat = viewerLib.getUserStat(viewer)

   return [
      {
         id: "registered",
         label: TRANSLATIONS.tiles.text1,
         value: stat.registered,
      },
      {
         id: "saved",
         label: TRANSLATIONS.tiles.text2,
         value: stat.saved,
      },
   ]
}
