/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import {
   AboutImport,
   BookImport,
   CatalogImport,
   DebugImport,
   InitialImport,
   LayoutImport,
   OrderImport,
   CheckoutImport,
   ResultImport,
   ProfileImport,
   R404Import,
} from "./../../../pages/router"

const InitialRoute = InitialImport.update({
   path: "/",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const AboutRoute = AboutImport.update({
   path: "/about",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const CatalogRoute = CatalogImport.update({
   path: "/catalog",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const BookRoute = BookImport.update({
   path: "/book/$bookId",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const ProfileRoute = ProfileImport.update({
   path: "/profile",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const OrderRoute = OrderImport.update({
   path: "/order",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const CheckoutRoute = CheckoutImport.update({
   path: "/order/checkout",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const ResultRoute = ResultImport.update({
   path: "/order/result/$result",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const DebugRoute = DebugImport.update({
   path: "/debug",
   getParentRoute: () => LayoutImport,
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any)

const R404Route = R404Import.update({
   id: "/__404",
   path: "/*",
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
