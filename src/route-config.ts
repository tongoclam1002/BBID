import Home from "./features/Home/Home";
import Order from "./features/Order/OrderPage";
import OrderSuccess from "./features/Order/OrderSuccess";
import Payment from "./features/Payment/Payment";
import StoreDetail from "./features/Store/StorePage";
import ProductPage from "./features/Product/ProductPage";
import ProductPosition from "./features/VirtualMall/ProductPostionPage";
import CartPage from "./features/Cart/CartPage";
import ServerError from "./app/errors/ServerError";

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