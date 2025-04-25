import { Link } from "@tanstack/react-router"
import { Carousel, Skeleton, Typography } from "antd"
import { useTranslation } from "react-i18next"

import { CAROUSEL_TIMER, SKELETON_KEYS } from "@app/configs/constants"
import { useMobileDetection } from "@shared/lib/browser"
import { useSkeleton } from "@shared/lib"
import { bannerScreen } from "./model"

const Banner = () => {
   const { t } = useTranslation()
   const isMobile = useMobileDetection()
   const isLoading = useSkeleton(SKELETON_KEYS.BANNER)

   return (
      <Carousel autoplay arrows={!isMobile} infinite autoplaySpeed={1.5 * CAROUSEL_TIMER}>
         {isLoading ? (
            <div className="text-center relative h-80">
               <Skeleton.Avatar active shape="square" size={100000} className="w-full h-full" />
            </div>
         ) : (
            bannerScreen.map(banner => (
               <div className="text-center relative h-80" key={banner.id}>
                  <Typography.Text className="font-roboto absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[75%] sm:w-[50%]">
                     <h3 className="!text-white">{t(banner.title)}</h3>
                     <p className="w-[100%] m-[auto]">{t(banner.subtitle)}</p>
                     <p className="hidden sm:block">{t(banner.description)}</p>
                     {banner.link ? (
                        <Link to={banner.linkHref} className="text-lightPrimary">
                           {t(banner.info)}
                        </Link>
                     ) : null}
                  </Typography.Text>
                  <img
                     className="absolute top-0 left-0 w-full h-full object-cover"
                     src={banner.img}
                     alt={t(banner.title)}
                  />
               </div>
            ))
         )}
      </Carousel>
   )
}

export { Banner }
