import { useTitle } from "@shared/lib/dom"
import { Sections } from "./sections"

function Index() {
   useTitle("Rentread - books-renting service")
   return <Sections />
}

export default Index
