import React, { Suspense } from "react"
import { Spin } from "antd"
import { BrowserRouter } from "react-router-dom"

/**
 * @hoc Инициализация роутера с провайдером для работы с get-параметрами
 */

// FIXME: refine type later
// FIXME: center loader
const withRouter = (component: () => React.ReactNode) => () => (
   <BrowserRouter>
      <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>{component()}</Suspense>
   </BrowserRouter>
)

export default withRouter
