import { Link } from "@tanstack/react-router"

function Header() {
   return (
      <div>
         <Link to="/">Home </Link>
         <Link to="/about">About </Link>
         <Link to="/catalog">Catalog</Link>
      </div>
   )
}

export default Header
