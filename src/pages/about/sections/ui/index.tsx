import cn from "classnames"
import type { CSSProperties, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  id?: string
  className?: string
  innerClassName?: string
  style?: CSSProperties
  theme?: "normal" | "alt"
}>

const AboutSection = (props: Props) => {
  const { id, children, className, style, innerClassName, theme = "normal" } = props

  return (
    <section
      id={id}
      style={style}
      className={cn(
        "flex items-center h-screen py-10 px-[10%] text-xl",
        theme === "alt" ? "bg-gray-100" : "bg-white",
        className,
      )}>
      <div className={cn("w-1/2", innerClassName)}>{children}</div>
    </section>
  )
}

export default AboutSection
