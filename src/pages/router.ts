import { createFileRoute, createRootRoute } from "@tanstack/react-router"
import { lazy } from "react"
import Layout from "./layout"

const Book = lazy(() => import("./book"))
const Initial = lazy(() => import("./initial"))
const NotFound = lazy(() => import("./__404"))

export const LayoutImport = createRootRoute({
   component: Layout,
})

export const InitialImport = createFileRoute("/")({
   component: Initial,
})

export const BookImport = createFileRoute("/book/$bookId")({
   component: Book,
})

export const R404Import = createFileRoute("/__404")({
   component: NotFound,
})
