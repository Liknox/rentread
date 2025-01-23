import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__404")({
   component: NotFound,
})

function NotFound() {
   return (
      <div className="p-2">
         <h3>Not Found page</h3>
      </div>
   )
}
