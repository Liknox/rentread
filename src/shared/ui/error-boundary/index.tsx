import { TRANSLATIONS } from "@app/configs/constants/translation"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { type WithTranslation, withTranslation } from "react-i18next"

interface ErrorBoundaryState {
   hasError: boolean
   error: Error | null
}

interface ErrorBoundaryProps extends WithTranslation {
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
      console.error(this.props.t(TRANSLATIONS.errorBoundary.application), error, errorInfo)
   }

   render(): ReactNode {
      const { t } = this.props

      if (this.state.hasError) {
         return (
            <div className="error-container">
               <h1>{t(TRANSLATIONS.errorBoundary.title)}</h1>
               <p>{t(TRANSLATIONS.errorBoundary.description)}</p>
            </div>
         )
      }

      return this.props.children
   }
}

const TranslatedErrorBoundary: React.ComponentType<Omit<ErrorBoundaryProps, keyof WithTranslation>> =
   withTranslation()(ErrorBoundary)
export { TranslatedErrorBoundary }
