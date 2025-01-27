import { useTitle } from "@shared/lib/dom"

function Index() {
   useTitle("Rentread - books-renting service")
   return (
      <div className="p-2">
         <h3>Welcome Home!</h3>
      </div>
   )
}

export default Index
