import { useTitle } from "@shared/lib/dom"
import { Sections } from "./sections"

function IndexPage() {
   useTitle("RentRead | Rent Books Service")
   return <Sections />
}

export default IndexPage
