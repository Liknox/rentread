import Section from "../index"

import bg_books from "../../assets/bg_books.png"

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

export default BenefitsSection
