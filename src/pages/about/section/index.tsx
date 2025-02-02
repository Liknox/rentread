import { CSSProperties, PropsWithChildren } from "react"
import cn from "classnames"

type Props = PropsWithChildren<{
   id?: string
   className?: string
   innerClassName?: string
   style?: CSSProperties
   theme?: "normal" | "alt"
}>

const HomeSection = (props: Props) => {
   const { id, children, className, style, innerClassName, theme = "normal" } = props

   return (
      <section
         id={id}
         style={style}
         className={cn(
            "flex items-center h-screen py-10 px-[10%] text-xl", // Base styles
            theme === "alt" ? "bg-gray-100" : "bg-white", // Conditional background color
            className, // Additional custom classes
         )}>
         <div className={cn("w-1/2", innerClassName)}>{children}</div>
      </section>
   )
}

export default HomeSection
