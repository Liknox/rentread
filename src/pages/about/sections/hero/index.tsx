import { useRouter } from "@tanstack/react-router"
import { Button } from "antd"

import { routes } from "@app/configs/constants"
import bg_hero from "../../assets/bg_hero.jpg"
import Section from "../index"

const HeroSection = () => {
   const router = useRouter()

   return (
      <Section style={{ backgroundImage: `url(${bg_hero})` }} innerClassName="text-white flex flex-col align-center">
         <div className="relative z-10 p-5 text-white">
            <h2 className="text-white text-3xl font-medium">Rentread</h2>
            <p className="my-4">
               Our service allows people to exchange books. The owner of a book can give it to the service to offer it
               for rent to those interested.
            </p>
            <p className="my-4">
               The book can be given away permanently or temporarily. Those interested can use the book for a chosen
               period and pay less for it than the book costs in the store.
            </p>
            <Button type="default" size="large" onClick={() => router.navigate({ to: routes.CATALOG })}>
               Try it out!
            </Button>
         </div>
      </Section>
   )
}

export default HeroSection
