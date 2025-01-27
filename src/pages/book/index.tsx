import { useMatch } from "@tanstack/react-router"

function User() {
   const { params } = useMatch({ from: "/book/$bookId" }) as { params: { bookId: string } }
   console.log(params?.bookId)
   return <div>{params?.bookId}</div>
}

export default User
