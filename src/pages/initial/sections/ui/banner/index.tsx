import { isMobile } from "@shared/lib/browser"
import { Link } from "@tanstack/react-router"
import { Carousel, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { bannerScreen } from "./model"
import { CAROUSEL_TIMER } from "@app/configs/constants"

const Banner = () => {
   const { t } = useTranslation()

   return (
      <Carousel autoplay arrows={!isMobile} infinite autoplaySpeed={3 * CAROUSEL_TIMER}>
         {bannerScreen.map(banner => (
            <div className="text-center relative h-80" key={banner.id}>
               <Typography.Text className="font-roboto absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[75%] sm:w-[50%]">
                  <h3 className="!text-white">{t(banner.title)}</h3>
                  <p className="w-[100%] m-[auto]">{t(banner.subtitle)}</p>
                  <p className="hidden sm:block">{t(banner.description)}</p>
                  {banner.link ? (
                     <Link to={banner.linkHref} className="text-lightPrimary">
                        {t(banner.info)}
                     </Link>
                  ) : (
                     <i>{t(banner.info)}</i>
                  )}
               </Typography.Text>
               <img src={banner.img} alt={banner.imgAlt} width="100%" className="object-cover h-full" />
            </div>
         ))}
      </Carousel>
   )
}

export { Banner }
