import { ROUTES } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import type { BannerScreen } from "@shared/api"

import b1 from "../assets/b1.jpg"
import b2 from "../assets/b2.jpg"
import b3 from "../assets/b3.jpg"
import b4 from "../assets/b4.jpg"

export const bannerScreen: BannerScreen[] = [
   {
      id: 1,
      title: TRANSLATIONS.initial.sections.banner.about.title,
      subtitle: TRANSLATIONS.initial.sections.banner.about.subtitle,
      description: TRANSLATIONS.initial.sections.banner.about.description,
      info: TRANSLATIONS.initial.sections.banner.goTo,
      link: true,
      linkHref: ROUTES.ABOUT,
      img: b1,
      imgAlt: "banner-1",
   },
   {
      id: 2,
      title: TRANSLATIONS.initial.sections.banner.personal.title,
      subtitle: TRANSLATIONS.initial.sections.banner.personal.subtitle,
      description: TRANSLATIONS.initial.sections.banner.personal.description,
      info: TRANSLATIONS.initial.sections.banner.goTo,
      link: true,
      linkHref: ROUTES.PROFILE,
      img: b2,
      imgAlt: "banner-2",
   },
   {
      id: 3,
      title: TRANSLATIONS.initial.sections.banner.catalog.title,
      subtitle: TRANSLATIONS.initial.sections.banner.catalog.subtitle,
      description: TRANSLATIONS.initial.sections.banner.catalog.description,
      info: TRANSLATIONS.initial.sections.banner.goTo,
      link: true,
      linkHref: ROUTES.CATALOG,
      img: b3,
      imgAlt: "banner-3",
   },
   {
      id: 4,
      title: TRANSLATIONS.initial.sections.banner.meetUp.title,
      subtitle: TRANSLATIONS.initial.sections.banner.meetUp.subtitle,
      description: TRANSLATIONS.initial.sections.banner.meetUp.description,
      info: TRANSLATIONS.initial.sections.banner.street,
      link: false,
      linkHref: "",
      img: b4,
      imgAlt: "banner-4",
   },
]
