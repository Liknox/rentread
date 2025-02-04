import { createFileRoute, createRootRoute } from "@tanstack/react-router"
import { lazy } from "react"

import Layout from "./layout"

const Initial = lazy(() => import("./initial"))
const Book = lazy(() => import("./book"))
const About = lazy(() => import("./about"))
const Catalog = lazy(() => import("./catalog"))
const Profile = lazy(() => import("./profile"))
const NotFound = lazy(() => import("./__404"))
const Debug = lazy(() => import("./debug"))

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

export const R404Import = createFileRoute("/__404")({
   component: NotFound,
})

export const DebugImport = createFileRoute("/debug")({
   component: Debug,
})
