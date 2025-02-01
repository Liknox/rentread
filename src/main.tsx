import ReactDOM from "react-dom/client"
import { App } from "./app"
import "antd/dist/reset.css"
import "@app/styles/index.css"

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement)
   root.render(<App />)
}
