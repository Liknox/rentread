import {
   CloseOutlined,
   FolderOpenOutlined,
   HeartOutlined,
   MenuOutlined,
   ShoppingCartOutlined,
   UserOutlined,
} from "@ant-design/icons"
import { Badge, Button, Drawer, Layout } from "antd"
import cn from "classnames"

import { routes } from "@app/configs/constants"
import { TRANSLATIONS } from "@app/configs/constants/translation"
import { isMobile } from "@shared/lib/browser"
import { orderModel } from "entities/order"
import { viewerModel } from "entities/viewer"
import { Wallet } from "features/wallet"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Search from "./search"
import { HashLink } from "react-router-hash-link"

const actions = [
   {
      id: "catalog" as const,
      label: TRANSLATIONS.header.options.catalog,
      Icon: MenuOutlined,
      url: routes.CATALOG,
      disabled: false,
   },
   {
      id: "orders" as const,
      label: TRANSLATIONS.header.options.orders,
      Icon: FolderOpenOutlined,
      url: `${routes.PROFILE}#opened`,
      disabled: false,
   },
   {
      id: "fav" as const,
      label: TRANSLATIONS.header.options.favorites,
      Icon: HeartOutlined,
      url: `${routes.PROFILE}#fav`,
      disabled: false,
   },
   {
      id: "cart" as const,
      label: TRANSLATIONS.header.options.cart,
      Icon: ShoppingCartOutlined,
      url: routes.ORDER,
      disabled: false,
   },
   {
      id: "profile" as const,
      label: TRANSLATIONS.header.options.profile,
      Icon: UserOutlined,
      url: routes.PROFILE,
      disabled: false,
   },
]

type ActionId = (typeof actions)[number]["id"]

const NOT_AVAILABLE = TRANSLATIONS.header.placeholders.notAvailable

const Header = () => {
   const orderTotal = orderModel.useOrderBooks().length
   const favTotal = viewerModel.useFavBooks().length
   const { t, i18n } = useTranslation()

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
            )}>
            {isMobile ? (
               <MobileHeader count={count} />
            ) : (
               <>
                  <HashLink
                     className="flex flex-grow items-center transition duration-250 font-medium hover:opacity-70 active:opacity-50 hover:text-black"
                     to={routes.DEFAULT}>
                     {/* <Logo width={24} /> */}
                     <h1 className="pb-1 pl-[10px] text-[20px]">Rentread</h1>
                  </HashLink>
                  <div className="flex flex-grow-[2] items-center mr-[2%]">
                     <Search />
                  </div>
                  <div className="flex items-center gap-3">
                     <Wallet.AddFunds.Popover />
                     {actions.map(({ id, label, Icon, url, disabled }) => (
                        <HashLink
                           key={label}
                           to={url}
                           className={cn("flex flex-col leading-[16px]", {
                              "pointer-events-none opacity-50": disabled,
                              "mx-[10px]": i18n.language === "en",
                              "mx-[4px]": i18n.language === "ua",
                           })}
                           title={disabled ? t(NOT_AVAILABLE) : ""}>
                           {/* for centering badge */}
                           <span className="text-center">
                              <Badge count={count[id]} style={{ backgroundColor: "#108ee9" }}>
                                 <Icon className="text-[24px]" />
                              </Badge>
                           </span>
                           <span>{t(label)}</span>
                        </HashLink>
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
         <HashLink
            className="flex items-center transition duration-250 font-medium hover:opacity-70 active:opacity-50 hover:text-black"
            to={routes.DEFAULT}>
            <h2 className="text-[20px]">R</h2>
         </HashLink>
         <div className="flex flex-grow items-center">
            <Search />
         </div>
         <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
            className="lg:hidden text-[25px] mt-4"
         />
         <Drawer
            title={
               <div className="flex justify-between w-full text-[30px]">
                  <Wallet.AddFunds.Popover />
                  <Button className="text-[30px]" type="text" icon={<CloseOutlined />} onClick={() => setOpen(false)} />
               </div>
            }
            closable={false}
            placement="top"
            onClose={() => setOpen(prev => !prev)}
            open={open}>
            <div className="flex flex-col gap-7 mt-3">
               {actions.map(({ id, label, url, disabled }) => (
                  <HashLink
                     key={label}
                     to={url}
                     className={cn("flex flex-col mx-[10px] leading-[16px]", {
                        "pointer-events-none opacity-50": disabled,
                     })}
                     onClick={() => setOpen(false)}
                     title={disabled ? NOT_AVAILABLE : ""}>
                     {/* for centering badge */}
                     <span className="text-left relative flex">
                        <div>
                           <span className="text-[26px] font-extralight">{t(label)}</span>
                           <span className="block w-full bg-primary h-[1px]" />
                        </div>
                        <Badge className="ml-3" count={count[id]} style={{ backgroundColor: "#108ee9" }} />
                     </span>
                  </HashLink>
               ))}
            </div>
         </Drawer>
      </>
   )
}

export default Header
