import ReactDOM from "react-dom/client"

import "@app/configs/language/i18n.config"
import "@app/styles/index.css"
import { ErrorBoundary } from "@shared/ui"
import App from "./app"

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  )
}
