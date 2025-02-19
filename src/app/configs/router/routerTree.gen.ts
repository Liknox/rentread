/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { routes } from "../constants"
import {
   AboutImport,
   BookImport,
   CatalogImport,
   CheckoutImport,
   DebugImport,
   InitialImport,
   LayoutImport,
   OrderImport,
   ProfileImport,
   R404Import,
   ResultImport,
} from "./../../../pages/router"

const InitialRoute = InitialImport.update({
   path: routes.DEFAULT,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const AboutRoute = AboutImport.update({
   path: routes.ABOUT,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const CatalogRoute = CatalogImport.update({
   path: routes.CATALOG,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const BookRoute = BookImport.update({
   path: routes.BOOKID,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const ProfileRoute = ProfileImport.update({
   path: routes.PROFILE,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const OrderRoute = OrderImport.update({
   path: routes.ORDER,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const CheckoutRoute = CheckoutImport.update({
   path: routes.CHECKOUT,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const ResultRoute = ResultImport.update({
   path: routes.RESULT,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const DebugRoute = DebugImport.update({
   path: routes.DEBUG,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const R404Route = R404Import.update({
   id: routes.NOTFOUND,
   path: routes.ALL,
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

declare module "@tanstack/react-router" {
   interface FileRoutesByPath {
      "/": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/about": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/catalog": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/book/$bookId": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/profile": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/order": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/order/checkout": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/order/result/$result": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/__404": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
      "/debug": {
         preLoaderRoute: typeof string
         parentRoute: typeof LayoutImport
      }
   }
}

export const routeTree = LayoutImport.addChildren([
   InitialRoute,
   AboutRoute,
   CatalogRoute,
   BookRoute,
   ProfileRoute,
   OrderRoute,
   CheckoutRoute,
   ResultRoute,
   R404Route,
   DebugRoute,
])

/* prettier-ignore-end */
