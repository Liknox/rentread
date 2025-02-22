import { routes } from "@app/configs/constants"
import type { BannerScreen } from "@shared/api"
import b1 from "../assets/b1.jpg"
import b2 from "../assets/b2.jpg"
import b3 from "../assets/b3.jpg"
import b4 from "../assets/b4.jpg"

export const bannerScreen: BannerScreen[] = [
   {
      id: 1,
      title: "About us",
      subtitle: "Our service allows people to exchange books.",
      description: "The owner of a book can give it to the service to offer it for rent to those interested.",
      info: "Go to",
      link: true,
      linkHref: routes.ABOUT,
      img: b1, // FIXME: update img
      imgAlt: "img-banner-1",
   },
   {
      id: 2,
      title: "Personal Account",
      subtitle:
         "In your personal account, you can see information about your personal books, books in your possession, reserved books, favorites, as well as your rental history in general",
      description: "There you will also find other details that interest you.",
      info: "Go to",
      link: true,
      linkHref: routes.PROFILE,
      img: b2, // FIXME: update img
      imgAlt: "img-banner-2",
   },
   {
      id: 3,
      title: "Catalog",
      subtitle: "Flexible search with filters and suitable sorting",
      description: "Adapted to your financial expectations and rental period",
      info: "Go to",
      link: true,
      linkHref: routes.CATALOG,
      img: b3, // FIXME: update img
      imgAlt: "img-banner-3",
   },
   {
      id: 4,
      title: "Book Meetup #4",
      subtitle: "Coffee-shop Company (Viennese Coffee House)",
      description: "There you can pick up your latest ordered books!",
      info: "Manhattan 5th Avenue",
      link: false,
      linkHref: "",
      img: b4, // FIXME: update img
      imgAlt: "img-banner-4",
   },
]
