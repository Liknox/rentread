import { fakeApi } from "@shared/api"
import { Layout, Row, Empty } from "antd"

function CatalogContent() {
   const booksQuery = fakeApi.library.books.getAll()

   return (
      <Layout>
         <section className="mr-10">
            <Row justify="start" gutter={[20, 20]}>
               {booksQuery.map(b => (
                  // <BookItem key={b.id} data={b} />
                  <p>{b.name}</p>
               ))}
            </Row>
            {!booksQuery.length && (
               <Empty className="my-[100px]" description="Couldn't find anything matching your request." />
            )}
         </section>
      </Layout>
   )
}

export default CatalogContent
