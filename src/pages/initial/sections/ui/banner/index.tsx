import { isMobile } from "@shared/lib/browser"
import { Link } from "@tanstack/react-router"
import { Carousel, Typography } from "antd"
import { bannerScreen } from "./model"

const Banner = () => {
   return (
      <Carousel autoplay arrows={!isMobile} infinite autoplaySpeed={4000}>
         {bannerScreen.map(banner => (
            <div className="text-center relative h-80" key={banner.id}>
               <Typography.Text className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[75%] sm:w-[50%]">
                  <h3 className="!text-white">{banner.title}</h3>
                  <p className="w-[100%] m-[auto]">{banner.subtitle}</p>
                  <p className="hidden sm:block">{banner.description}</p>
                  {banner.link ? (
                     <Link to={banner.linkHref} className="text-lightPrimary">
                        {banner.info}
                     </Link>
                  ) : (
                     <i>{banner.info}</i>
                  )}
               </Typography.Text>
               <img src={banner.img} alt="img-banner-1" width="100%" className="object-cover h-full" />
            </div>
         ))}
      </Carousel>
   )
}

export { Banner }
