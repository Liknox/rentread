import ReactDOM from "react-dom/client"
import App from "./app"
import "@app/configs/language/i18n.config"

import "@app/styles/index.css"

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement)
   root.render(<App />)
}
