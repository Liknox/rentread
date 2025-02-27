import { routes } from "@app/configs/constants"
import type { BannerScreen } from "@shared/api"
import b1 from "../assets/b1.jpg"
import b2 from "../assets/b2.jpg"
import b3 from "../assets/b3.jpg"
import b4 from "../assets/b4.jpg"
import { TRANSLATIONS } from "@app/configs/constants/translation"

export const bannerScreen: BannerScreen[] = [
   {
      id: 1,
      title: TRANSLATIONS.main.sections.banner.about.title,
      subtitle: TRANSLATIONS.main.sections.banner.about.subtitle,
      description: TRANSLATIONS.main.sections.banner.about.description,
      info: TRANSLATIONS.main.sections.banner.goTo,
      link: true,
      linkHref: routes.ABOUT,
      img: b1, // FIXME: update img
      imgAlt: "banner-1",
   },
   {
      id: 2,
      title: TRANSLATIONS.main.sections.banner.personal.title,
      subtitle: TRANSLATIONS.main.sections.banner.personal.subtitle,
      description: TRANSLATIONS.main.sections.banner.personal.description,
      info: TRANSLATIONS.main.sections.banner.goTo,
      link: true,
      linkHref: routes.PROFILE,
      img: b2, // FIXME: update img
      imgAlt: "banner-2",
   },
   {
      id: 3,
      title: TRANSLATIONS.main.sections.banner.catalog.title,
      subtitle: TRANSLATIONS.main.sections.banner.catalog.subtitle,
      description: TRANSLATIONS.main.sections.banner.catalog.description,
      info: TRANSLATIONS.main.sections.banner.goTo,
      link: true,
      linkHref: routes.CATALOG,
      img: b3, // FIXME: update img
      imgAlt: "banner-3",
   },
   {
      id: 4,
      title: TRANSLATIONS.main.sections.banner.meetUp.title,
      subtitle: TRANSLATIONS.main.sections.banner.meetUp.subtitle,
      description: TRANSLATIONS.main.sections.banner.meetUp.description,
      info: TRANSLATIONS.main.sections.banner.street,
      link: false,
      linkHref: "",
      img: b4, // FIXME: update img
      imgAlt: "banner-4",
   },
]
