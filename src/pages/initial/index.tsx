import { useTitle } from "@shared/lib/dom"
import { Sections } from "./sections"

function Index() {
   useTitle("RentRead - Rent Books Service")
   return <Sections />
}

export default Index
