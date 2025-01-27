import { createFileRoute, createRootRoute } from "@tanstack/react-router"
import { lazy } from "react"
import Layout from "./layout"

const Book = lazy(() => import("./book"))
const Index = lazy(() => import("./index"))
const NotFound = lazy(() => import("./__404"))

export const LayoutImport = createRootRoute({
   component: Layout,
})

export const IndexImport = createFileRoute("/")({
   component: Index,
})

export const BookImport = createFileRoute("/book/$bookId")({
   component: Book,
})

export const R404Import = createFileRoute("/__404")({
   component: NotFound,
})
