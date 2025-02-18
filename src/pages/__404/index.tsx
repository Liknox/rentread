import { useTitle } from "@shared/lib/dom"

function NotFoundPage() {
   useTitle("Not Found Page | RentRead")

   return (
      <div className="p-2">
         <h3>Not Found page</h3>
      </div>
   )
}

export default NotFoundPage
