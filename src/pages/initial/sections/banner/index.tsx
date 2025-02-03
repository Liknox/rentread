import { Link } from "@tanstack/react-router"
import { Carousel, Typography } from "antd"
import imgBanner1 from "./assets/b1.jpg"

const Banner = () => {
   const bannerScreen = [
      {
         id: 1,
         title: "Book Meetup #4",
         subtitle: "Coffee-shop Company (Viennese Coffee House)",
         description: "Manhattan 5th Avenue",
         info: "There you can pick up your latest ordered books!",
         link: false,
         linkHref: "",
         img: imgBanner1,
         imgAlt: "img-banner-1",
      },
      {
         id: 2,
         title: "Catalog",
         subtitle: "Flexible search with filters and suitable sorting",
         description: "Adapted to your financial expectations and rental period",
         info: "Go to",
         link: true,
         linkHref: "/catalog",
         img: imgBanner1, // FIXME: update img
         imgAlt: "img-banner-2",
      },
      {
         id: 3,
         title: "Personal Account",
         subtitle:
            "In your personal account, you can see information about your personal books, books in your possession, reserved books, favorites, as well as your rental history in general",
         description: "There you will also find other details that interest you.",
         info: "Go to",
         link: true,
         linkHref: "/profile",
         img: imgBanner1, // FIXME: update img
         imgAlt: "img-banner-3",
      },
   ]

   return (
      <Carousel
         autoplay
         autoplaySpeed={4000}
         // FIXME: add controls
         // arrows
         // nextArrow={<ArrowRightOutlined />}
         // prevArrow={<ArrowLeftOutlined />}
      >
         {bannerScreen.map(banner => (
            <div className="text-center relative h-80">
               <Typography.Text className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <h3 className="!text-white">{banner.title}</h3>
                  <p>{banner.subtitle}</p>
                  <p>{banner.description}</p>
                  {banner.link ? (
                     <Link to={banner.linkHref} className="text-lightPrimary">
                        {banner.info}
                     </Link>
                  ) : (
                     <i>{banner.info}</i>
                  )}
               </Typography.Text>
               <img src={banner.img} alt="img-banner-1" width="100%" />
            </div>
         ))}
      </Carousel>
   )
}

export { Banner }
