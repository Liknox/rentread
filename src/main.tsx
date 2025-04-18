import ReactDOM from "react-dom/client"
import { Component, ReactNode, ErrorInfo } from "react"

import "@app/configs/language/i18n.config"
import "@app/styles/index.css"
import App from "./app"

interface ErrorBoundaryState {
   hasError: boolean
   error: Error | null
}

interface ErrorBoundaryProps {
   children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
   constructor(props: ErrorBoundaryProps) {
      super(props)
      this.state = { hasError: false, error: null }
   }

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.error("Application error:", error, errorInfo)
   }

   render(): ReactNode {
      if (this.state.hasError) {
         return (
            <div className="error-container">
               <h1>Something went wrong</h1>
               <p>Please refresh the page or contact support if the issue persists.</p>
            </div>
         )
      }

      return this.props.children
   }
}

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement)

   root.render(
      <ErrorBoundary>
         <App />
      </ErrorBoundary>
   )
}
