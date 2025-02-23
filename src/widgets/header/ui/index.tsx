import { FolderOpenOutlined, HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Badge, Layout } from "antd"
import cn from "classnames"

import { routes } from "@app/configs/constants"
// import { ReactComponent as Logo } from "./logo.svg"
import { Link } from "@tanstack/react-router"
import { orderModel } from "entities/order"
import { viewerModel } from "entities/viewer"
import { Wallet } from "features/wallet"
import Search from "./search"

const actions = [
   {
      id: "catalog" as const,
      label: "Catalog",
      Icon: MenuOutlined,
      url: "/catalog",
      disabled: false,
   },
   {
      id: "orders" as const,
      label: "Orders",
      Icon: FolderOpenOutlined,
      url: "/profile#opened",
      disabled: false,
   },
   {
      id: "fav" as const,
      label: "Favorites",
      Icon: HeartOutlined,
      url: "/profile#fav",
      disabled: false,
   },
   {
      id: "cart" as const,
      label: "Cart",
      Icon: ShoppingCartOutlined,
      url: "/order",
      disabled: false,
   },
   {
      id: "profile" as const,
      label: "Profile",
      Icon: UserOutlined,
      url: "/profile",
      disabled: false,
   },
]

type ActionId = (typeof actions)[number]["id"]

const NOT_AVAILABLE = "So far, this function is not available"

const Header = () => {
   const orderTotal = orderModel.cart.useOrderBooks().length
   const favTotal = viewerModel.useFavBooks().length

   const count: Record<ActionId, number> = {
      cart: orderTotal,
      catalog: 0,
      orders: 0,
      fav: favTotal,
      profile: 0,
   }

   return (
      <>
         <Layout.Header className="relative hidden justify-between w-full px-[10%] !text-[var(--color-dark)] !bg-white shadow-inset lg:flex">
            <Link
               className="flex flex-grow items-center transition duration-250 font-medium hover:opacity-70 active:opacity-50 hover:text-black"
               to={routes.DEFAULT}
               onClick={() => {
                  console.debug("[DEBUG] reachGoal: BACK_HOME")
               }}>
               {/* <Logo width={24} /> */}
               <h1 className="pb-1 pl-[10px] text-[20px]">Rentread</h1>
            </Link>
            <div className="flex flex-grow-[2] items-center mr-[2%]">
               <Search />
            </div>
            <div className="flex items-center gap-3">
               <Wallet.AddFunds.Popover />
               {actions.map(({ id, label, Icon, url, disabled }) => (
                  <Link
                     key={label}
                     to={url}
                     className={cn("flex flex-col mx-[10px] leading-[16px]", {
                        "pointer-events-none opacity-50": disabled,
                     })}
                     title={disabled ? NOT_AVAILABLE : ""}>
                     {/* for centering badge */}
                     <span className="text-center">
                        <Badge count={count[id]} style={{ backgroundColor: "#108ee9" }}>
                           <Icon className="text-[24px]" />
                        </Badge>
                     </span>
                     <span>{label}</span>
                  </Link>
               ))}
            </div>
         </Layout.Header>
      </>
   )
}

export default Header
