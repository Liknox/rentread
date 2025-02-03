import { createFileRoute, createRootRoute } from "@tanstack/react-router"
import { lazy } from "react"

import Layout from "./layout"

const Book = lazy(() => import("./book"))
const Initial = lazy(() => import("./initial"))
const About = lazy(() => import("./about"))
const NotFound = lazy(() => import("./__404"))
const Catalog = lazy(() => import("./catalog"))
const Debug = lazy(() => import("./debug"))

export const LayoutImport = createRootRoute({
   component: Layout,
})

export const InitialImport = createFileRoute("/")({
   component: Initial,
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

export const R404Import = createFileRoute("/__404")({
   component: NotFound,
})

export const DebugImport = createFileRoute("/debug")({
   component: Debug,
})
