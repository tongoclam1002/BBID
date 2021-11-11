import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import StoreDetail from "./pages/StorePage";
import ProductPage from "./pages/ProductPage";
import ProductPosition from "./pages/ProductPostion";
import ServerError from "./pages/ServerError";
import CartPage from "./pages/CartPage";

//Routes with default layout
const routes = [
    {path: "/", Component:Home, exact: true, title: "Trang chủ"},
    {path: "/store/:storeId", Component: StoreDetail, exact: true, title: "Cửa hàng"},
    {path: "/store/:storeId/product/:productId", Component:ProductPage, exact: true, title: "Chi tiết sản phẩm"},
    {path: "/product/:code", Component:ProductPosition, exact: true, title: "Chi tiết sản phẩm"},
    {path: "/order/:productId", Component: Order, exact: true, title: "Đặt hàng"},
    {path: "/order/success", Component: OrderSuccess, exact: true},
    {path: "/order/payment/:productId", Component: Payment, exact: true, title: ""},
    {path: "/cart", Component: CartPage, exact: true, title: "Giỏ hàng của bạn"},
    {path: "/server-error", Component: ServerError, exact: true, title: ""}
]

export default routes;