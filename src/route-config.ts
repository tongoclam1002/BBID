import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import StoreDetail from "./pages/StoreDetail";

const routes = [
    {path: "/", Component:Home, exact: true, title: "Trang chủ"},
    {path: "/store/:storeId", Component: StoreDetail, exact: true, title: "Danh sách sản phẩm"},
    {path: "/store/:storeId/product/:productId", Component:ProductDetail, exact: true, title: "Chi tiết sản phẩm"},
    {path: "/order/:id", Component: Order, exact: true, title: ""},
    {path: "/order/success", Component: OrderSuccess, exact: true},
    {path: "/order/payment/:id", Component: Payment, exact: true, title: ""},
    {path: "*", Component: NotFound}
]

export default routes;