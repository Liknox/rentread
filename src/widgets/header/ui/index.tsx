import {
   CloseOutlined,
   FolderOpenOutlined,
   HeartOutlined,
   MenuOutlined,
   ShoppingCartOutlined,
   UserOutlined,
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Badge, Button, Drawer, Layout } from "antd"
import cn from "classnames"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { useMobileDetection } from "@shared/lib/browser"
import { orderModel } from "entities/order"
import { viewerModel } from "entities/viewer"
import { Wallet } from "features/wallet"
import Search from "./search"

const actions = [
   {
      id: "catalog" as const,
      label: TRANSLATIONS.header.options.catalog,
      Icon: MenuOutlined,
      url: "/catalog",
      disabled: false,
   },
   {
      id: "orders" as const,
      label: TRANSLATIONS.header.options.orders,
      Icon: FolderOpenOutlined,
      url: "/profile#opened",
      disabled: false,
   },
   {
      id: "fav" as const,
      label: TRANSLATIONS.header.options.favorites,
      Icon: HeartOutlined,
      url: "/profile#fav",
      disabled: false,
   },
   {
      id: "cart" as const,
      label: TRANSLATIONS.header.options.cart,
      Icon: ShoppingCartOutlined,
      url: "/order",
      disabled: false,
   },
   {
      id: "profile" as const,
      label: TRANSLATIONS.header.options.profile,
      Icon: UserOutlined,
      url: "/profile",
      disabled: false,
   },
]

type ActionId = (typeof actions)[number]["id"]

const NOT_AVAILABLE = TRANSLATIONS.header.placeholders.notAvailable

const Header = () => {
   const orderTotal = orderModel.useOrderBooks().length
   const favTotal = viewerModel.useFavBooks().length
   const { t, i18n } = useTranslation()
   const isMobile = useMobileDetection()

   const count: Record<ActionId, number> = {
      cart: orderTotal,
      catalog: 0,
      orders: 0,
      fav: favTotal,
      profile: 0,
   }

   return (
      <>
         <Layout.Header
            className={cn(
               "relative flex justify-between w-full px-[10%] !text-[var(--color-dark)] !bg-white shadow-inset gap-4 md:gap-0",
               { "!fixed top-0 left-0 right-0 z-50 !px-3": isMobile },
            )}
            aria-label="header">
            {isMobile ? (
               <MobileHeader count={count} />
            ) : (
               <>
                  <Link
                     className="flex flex-grow items-center transition duration-250 font-medium hover:opacity-70 active:opacity-50 hover:text-black"
                     to={routes.DEFAULT}
                     aria-label="logo">
                     <h1 className="pb-1 pl-[10px] text-[20px]">Rentread</h1>
                  </Link>
                  <div className="flex flex-grow-[2] items-center mr-[2%]">
                     <Search />
                  </div>
                  <div className="flex items-center gap-3">
                     <Wallet.AddFunds.Popover aria-label="add funds" />
                     {actions.map(({ id, label, Icon, url, disabled }) => (
                        <Link
                           key={label}
                           to={url}
                           className={cn("flex flex-col leading-[16px]", {
                              "pointer-events-none opacity-50": disabled,
                              "mx-[10px]": i18n.language === "en",
                              "mx-[4px]": i18n.language === "ua",
                           })}
                           title={disabled ? t(NOT_AVAILABLE) : ""}
                           aria-label={label}>
                           <span className="text-center">
                              <Badge count={count[id]} style={{ backgroundColor: "#108ee9" }} aria-label="badge">
                                 <Icon className="text-[24px]" aria-label={label} />
                              </Badge>
                           </span>
                           <span>{t(label)}</span>
                        </Link>
                     ))}
                  </div>
               </>
            )}
         </Layout.Header>
      </>
   )
}

const MobileHeader = ({ count }: { count: Record<ActionId, number> }) => {
   const { t } = useTranslation()
   const [open, setOpen] = useState(false)

   return (
      <>
         <Link
            className="flex items-center transition duration-250 font-medium hover:opacity-70 active:opacity-50 hover:text-black"
            to={routes.DEFAULT}
            aria-label="logo">
            <h2 className="text-[20px]">R</h2>
         </Link>
         <div className="flex flex-grow items-center">
            <Search />
         </div>
         <div className="flex items-center gap-2">
            <Badge count={count.cart} style={{ backgroundColor: "#108ee9" }} aria-label="badge">
               <Link to="/order" aria-label="cart">
                  <ShoppingCartOutlined className="text-[22px]" />
               </Link>
            </Badge>
            <Button
               type="text"
               icon={<MenuOutlined className="text-[22px]" />}
               onClick={() => setOpen(true)}
               className="flex items-center justify-center p-2 text-[20px]"
               aria-label="menu"
            />
         </div>
         <Drawer
            title={
               <div className="flex justify-between w-full items-center">
                  <h3 className="text-xl font-medium">Rentread</h3>
                  <div className="flex items-center gap-3">
                     <Wallet.AddFunds.Popover aria-label="add funds" />
                     <Button
                        className="flex items-center justify-center text-[20px]"
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => setOpen(false)}
                        aria-label="close drawer"
                     />
                  </div>
               </div>
            }
            closable={false}
            placement="top"
            height="45%"
            onClose={() => setOpen(prev => !prev)}
            open={open}
            aria-label="drawer">
            <div className="flex flex-col gap-5 mt-6">
               {actions.map(({ id, label, url, disabled }) => (
                  <Link
                     key={label}
                     to={url}
                     className={cn("flex flex-col mx-[10px] leading-[16px]", {
                        "pointer-events-none opacity-50": disabled,
                     })}
                     onClick={() => setOpen(false)}
                     title={disabled ? NOT_AVAILABLE : ""}
                     aria-label={t(label)}>
                     <span className="text-left relative flex">
                        <div>
                           <span className="text-[26px] font-extralight">{t(label)}</span>
                           <span className="block w-full bg-primary h-[1px]" />
                        </div>
                        <Badge
                           className="ml-3"
                           count={count[id]}
                           style={{ backgroundColor: "#108ee9" }}
                           aria-label="badge"
                        />
                     </span>
                  </Link>
               ))}
            </div>
         </Drawer>
      </>
   )
}

export default Header
