import { createFileRoute } from "@tanstack/react-router"
import { useMatch } from "@tanstack/react-router"

export const Route = createFileRoute("/book/$bookId")({
   component: User,
})

function User() {
   const { params } = useMatch({ from: "/book/$bookId" }) as { params: { bookId: string } }
   console.log(params?.bookId)
   return <div>{params?.bookId}</div>
}
