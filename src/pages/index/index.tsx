import { useTitle } from "@shared/dom"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
   component: Index,
})

function Index() {
   useTitle("Rentread - books-renting service")
   return (
      <div className="p-2">
         <h3>Welcome Home!</h3>
      </div>
   )
}
