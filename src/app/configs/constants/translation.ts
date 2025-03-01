export const TRANSLATIONS = {
   initial: {
      sections: {
         banner: {
            about: {
               title: "initial.sections.banner.about.title",
               subtitle: "initial.sections.banner.about.subtitle",
               description: "initial.sections.banner.about.description",
            },
            personal: {
               title: "initial.sections.banner.personal.title",
               subtitle: "initial.sections.banner.personal.subtitle",
               description: "initial.sections.banner.personal.description",
            },
            catalog: {
               title: "initial.sections.banner.catalog.title",
               subtitle: "initial.sections.banner.catalog.subtitle",
               description: "initial.sections.banner.catalog.description",
            },
            meetUp: {
               title: "initial.sections.banner.meetUp.title",
               subtitle: "initial.sections.banner.meetUp.subtitle",
               description: "initial.sections.banner.meetUp.description",
            },
            street: "initial.sections.banner.street",
            goTo: "initial.sections.banner.goTo",
         },
         categories: {
            title: "initial.sections.categories.title",
         },
         authors: {
            title: "initial.sections.authors.title",
         },
         books: {
            title: "initial.sections.books.title",
         },
      },
   },
   about: {
      sections: {
         hero: {
            text: "about.sections.hero.text",
            text2: "about.sections.hero.text2",
            button: "about.sections.hero.button",
         },
         benefits: {
            title: "about.sections.benefits.title",
            text1: "about.sections.benefits.text1",
            text2: "about.sections.benefits.text2",
            bold: "about.sections.benefits.bold",
         },
         features: {
            title: "about.sections.features.title",
            text1: "about.sections.features.text1",
            text2: "about.sections.features.text2",
            text3: "about.sections.features.text3",
            text4: "about.sections.features.text4",
            text5: "about.sections.features.text5",
            text6: "about.sections.features.text6",
            text7: "about.sections.features.text7",
         },
         socials: {
            title: "about.sections.socials.title",
            text: "about.sections.socials.text",
            text2: "about.sections.socials.text2",
         },
      },
   },
   footer: {
      name: "footer.name",
      text: "footer.text",
   },
   demoAlert: { text: "demoAlert.text", close: "demoAlert.close" },
   pageTitle: {
      cart: "pageTitle.cart",
      about: "pageTitle.about",
      catalog: "pageTitle.catalog",
      profile: "pageTitle.profile",
      checkout: "pageTitle.checkout",
      notFound: "pageTitle.notFound",
      initial: "pageTitle.initial",
      result: "pageTitle.result",
   },
   features: {
      wallet: {
         title: "features.wallet.title",
         text: "features.wallet.text",
         button: "features.wallet.button",
         placeholder: "features.wallet.placeholder",
         help: {
            start: "features.wallet.help.start",
            end: "features.wallet.help.end",
         },
      },
   },
   header: {
      options: {
         cart: "header.options.cart",
         catalog: "header.options.catalog",
         profile: "header.options.profile",
         orders: "header.options.orders",
         favorites: "header.options.favorites",
      },
      placeholders: {
         searchPlaceholder: "header.placeholders.searchPlaceholder",
         notAvailable: "header.placeholders.notAvailable",
         minLength: "header.placeholders.minLength",
         notFound: "header.placeholders.notFound",
      },
   },
   catalog: {
      title: "catalog.title",
      sortBy: {
         title: "catalog.sortBy.title",
         options: {
            popularity: "catalog.sortBy.options.popularity",
            price: "catalog.sortBy.options.price",
            time: "catalog.sortBy.options.time",
            novelty: "catalog.sortBy.options.novelty",
         },
      },
      filters: {
         title: "catalog.filters.title",
         sections: {
            exists: {
               title: "catalog.filters.sections.exists.title",
               option: "catalog.filters.sections.exists.option",
            },
            rentPrice: "catalog.filters.sections.rentPrice",
            rentTerms: "catalog.filters.sections.rentTerms",
            days: "catalog.filters.sections.days",
            categories: "catalog.filters.sections.categories",
            authors: "catalog.filters.sections.authors",
            publishers: "catalog.filters.sections.publishers",
         },
      },
   },
} as const
