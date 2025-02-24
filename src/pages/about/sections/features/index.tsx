import Section from "../index"

import bg_laptop from "../../assets/bg_laptop.jpg"

const FeaturesSection = () => (
   <Section id="features" style={{ backgroundImage: `url(${bg_laptop})` }} innerClassName="w-full md:w-1/2">
      <h2 className="text-3xl font-bold">Features</h2>
      <ul className="mt-4">
         <li>- Convenient database search</li>
         <li>- Database of all books available to the service</li>
         <li>- Rental and payment mechanisms</li>
         <li>- Internal logic for calculating interest</li>
         <li>- Rating system</li>
         <li>- Notification system for events</li>
         <li>- Mechanisms for conducting secure transactions</li>
      </ul>
   </Section>
)

export default FeaturesSection
