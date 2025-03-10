import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

import NotFoundPage from "@pages/__404"
import DebugPage from "@pages/debug"
import IndexPage from "@pages/initial"
import Layout from "@pages/layout"
import { routes } from "./configs/constants"
import { withHocs } from "./hocs"

const BookPage = lazy(() => import("@pages/book"))
const CatalogPage = lazy(() => import("@pages/catalog"))
const Order = lazy(() => import("@pages/order/cart"))
const Checkout = lazy(() => import("@pages/order/checkout"))
const ResultPage = lazy(() => import("@pages/order/result"))
const ProfilePage = lazy(() => import("@pages/profile"))
const AboutPage = lazy(() => import("@pages/about"))

function App() {
   return (
      <Routes>
         <Route path={routes.DEFAULT} element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={routes.BOOKID} element={<BookPage />} />
            <Route path={routes.ABOUT} element={<AboutPage />} />
            <Route path={routes.DEBUG} element={<DebugPage />} />
            <Route path={routes.PROFILE} element={<ProfilePage />} />
            <Route path={routes.CATALOG} element={<CatalogPage />} />
            <Route path={routes.ORDER} element={<Order />} />
            <Route path={routes.CHECKOUT} element={<Checkout />} />
            <Route path={routes.RESULT} element={<ResultPage />} />
            <Route path={routes.ALL} element={<NotFoundPage />} />
         </Route>
      </Routes>
   )
}

export default withHocs(App)
