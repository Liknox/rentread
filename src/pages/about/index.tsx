import { Button, Layout } from "antd"
import { useRouter } from "@tanstack/react-router"
import { useTitle } from "@shared/lib/dom"

import Section from "./section"

import bg_hero from "./assets/bg_hero.jpg"
import bg_books from "./assets/bg_books.png"
import bg_laptop from "./assets/bg_laptop.jpg"

function About() {
   useTitle("About us - RentRead")
   return (
      <>
         <Layout.Content>
            <HeroSection />
            <BenefitsSection />
            <FeaturesSection />
            <SocialSection />
         </Layout.Content>
      </>
   )
}

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
            <Button type="default" size="large" onClick={() => router.navigate({ to: "/catalog" })}>
               Try it out!
            </Button>
         </div>
      </Section>
   )
}

const BenefitsSection = () => (
   <Section id="benefits" style={{ backgroundImage: `url(${bg_books})` }}>
      <h2 className="text-3xl font-bold">Books - New Assets</h2>
      <p className="my-4">
         Purchased books usually end up gathering dust on the shelf over time. Instead, you can entrust them to our
         service for rental, earning passive income!
      </p>
      <p>
         On the other hand, book-sharing allows you to avoid spending a lot of money to explore books you're interested
         in. <b>Rentread</b> will help you get the books you need, for just the right amount of time and without
         overpaying!
      </p>
   </Section>
)

const FeaturesSection = () => (
   <Section id="features" style={{ backgroundImage: `url(${bg_laptop})` }}>
      <h2 className="text-3xl font-bold">Features</h2>
      <ul className="mt-4">
         <li>Convenient database search</li>
         <li>Database of all books available to the service</li>
         <li>Rental and payment mechanisms</li>
         <li>Internal logic for calculating interest</li>
         <li>Rating system</li>
         <li>Notification system for events</li>
         <li>Mechanisms for conducting secure transactions</li>
      </ul>
   </Section>
)

const SocialSection = () => (
   <Section id="social">
      <h2 className="text-3xl font-bold">Finding Like-Minded People</h2>
      <p className="my-4">
         Paper books are being reimagined. They are no longer just a source of knowledge but also a foundation for
         community: from finding like-minded individuals to sharing experiences.
      </p>
      <p>Professional communities and groups of friends are built around the same books.</p>
   </Section>
)

export default About
