type Props = {
   children?: ReactNode
}
export const Card = ({ children }: Props) => {
   return (
      <article className="ml-10 text-center rounded-[10px] shadow-inset">
         <Divider style={{ margin: 0 }} />
         <section className="p-10">{children}</section>
      </article>
   )
}
