import { createFileRoute, createRootRoute } from "@tanstack/react-router"
import { lazy } from "react"

import NotFound from "./__404"
import Book from "./book"
import Debug from "./debug"
import Initial from "./initial"
import Layout from "./layout"
import Profile from "./profile"

const About = lazy(() => import("./about"))
const Catalog = lazy(() => import("./catalog"))
const Order = lazy(() => import("./order/cart"))
const Checkout = lazy(() => import("./order/checkout"))
const Result = lazy(() => import("./order/result"))

export const InitialImport = createFileRoute("/")({
   component: Initial,
})

export const LayoutImport = createRootRoute({
   component: Layout,
})

export const BookImport = createFileRoute("/book/$bookId")({
   component: Book,
})

export const AboutImport = createFileRoute("/about")({
   component: About,
})

export const CatalogImport = createFileRoute("/catalog")({
   component: Catalog,
})

export const ProfileImport = createFileRoute("/profile")({
   component: Profile,
})

export const OrderImport = createFileRoute("/order")({
   component: Order,
})

export const CheckoutImport = createFileRoute("/order/checkout")({
   component: Checkout,
})

export const ResultImport = createFileRoute("/order/result/$result")({
   component: Result,
})

export const R404Import = createFileRoute("/__404")({
   component: NotFound,
})

export const DebugImport = createFileRoute("/debug")({
   component: Debug,
})
