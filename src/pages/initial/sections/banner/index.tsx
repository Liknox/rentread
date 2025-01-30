import { Carousel, Typography } from "antd"
import { Link } from "@tanstack/react-router"
import imgBanner1 from "./assets/b1.jpg"

const Banner = () => (
   <Carousel
      autoplay
      autoplaySpeed={4000}
      // FIXME: add controls
      // arrows
      // nextArrow={<ArrowRightOutlined />}
      // prevArrow={<ArrowLeftOutlined />}
   >
      <div className="text-center relative h-80">
         <Typography.Text className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 style={{ color: "#fff" }}>Book Meetup #4</h3>
            <p>Coffeeshop Company (Viennese Coffee House)</p>
            <p>Manhattan 5th Avenue</p>
            <i>There you can pick up your latest ordered books!</i>
         </Typography.Text>
         <img src={imgBanner1} alt="img-banner-1" width="100%" />
      </div>
      <div className="text-center relative h-80">
         <Typography.Text className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 style={{ color: "#fff" }}>Catalog</h3>
            <p>Flexible search with filters and suitable sorting</p>
            <p>Adapted to your financial expectations and rental period</p>
            <Link to="/catalog" className="text-lightPrimary">
               Go to
            </Link>
         </Typography.Text>
         <img src={imgBanner1} alt="img-banner-2" width="100%" />
      </div>
      <div className="text-center relative h-80">
         <Typography.Text className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 style={{ color: "#fff" }}>Personal Account</h3>
            <p>
               In your personal account, you can see information about your personal books, books in your possession,
               reserved books, favorites, as well as your rental history in general.
            </p>
            <p>There you will also find other details that interest you.</p>
            <Link to="/profile" className="text-lightPrimary">
               Go to
            </Link>
         </Typography.Text>
         <img src={imgBanner1} alt="img-banner-3" width="100%" />
      </div>
   </Carousel>
)

export { Banner }
