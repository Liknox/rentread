/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from "classnames"
import { Layout, Badge } from "antd"
import { HeartOutlined, ShoppingCartOutlined, UserOutlined, FolderOpenOutlined, MenuOutlined } from "@ant-design/icons"

// !!! FIXME:
// import { Wallet } from "features/wallet"
// import { viewerModel } from "entities/viewer"
// import { orderModel } from "entities/order"
// import { ReactComponent as Logo } from "./logo.svg"
// import Search from "./search"
import { Link } from "@tanstack/react-router"

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

// const NOT_AVAILABLE = "So far, this function is not available";

// eslint-disable-next-line max-lines-per-function
const Header = () => {
   // const orderTotal = orderModel.cart.useOrderBooks().length
   // const favTotal = viewerModel.useFavBooks().length

   const count: Record<ActionId, number> = {
      cart: 1, // FIXME
      // cart: orderTotal,
      catalog: 0,
      orders: 0,
      fav: 1, // FIXME
      // fav: favTotal,
      profile: 0,
   }

   return (
      <>
         <Layout.Header className="relative flex justify-between w-full px-[10%] !text-[var(--color-dark)] !bg-white">
            <Link
               className="flex flex-grow items-center transition duration-250 hover:opacity-70 active:opacity-50"
               to="/"
               onClick={() => {
                  console.debug("[DEBUG] reachGoal: BACK_HOME")
               }}>
               {/* <Logo width={24} /> */}
               <h1 className="pb-1 pl-[10px] text-[20px]">Rentread</h1>
            </Link>
            {/* <div className="flex flex-grow-[2] items-center mr-[2%]">
               <Search />
            </div> */}
            <div className="flex items-center">
               {/* <Wallet.AddFunds.Popover className="mr-[10px]" /> */}
               {/* TODO: add amount-label later */}
               {actions.map(({ id, label, Icon, url, disabled }) => (
                  <Link
                     key={label}
                     to={url}
                     className={cn("flex flex-col mx-[10px] leading-[16px]", {
                        "pointer-events-none opacity-50": disabled,
                     })}
                     // title={disabled ? NOT_AVAILABLE : ""}
                  >
                     {/* for centering badge */}
                     <span className="text-center">
                        <Badge count={count[id]} style={{ backgroundColor: "#108ee9" }}>
                           <Icon style={{ fontSize: 24 }} />
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
