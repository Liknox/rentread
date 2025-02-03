import { BannerScreen } from "@shared/api"
import imgBanner1 from "../assets/b1.jpg"

export const bannerScreen: BannerScreen[] = [
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
