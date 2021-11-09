import Home from "./pages/Home";
import ProductDetail from "./pages/ProductPage";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import StoreDetail from "./pages/StorePage";
import Video from "./pages/Video";
import ProductPage from "./pages/ProductPage";
import ProductPosition from "./pages/ProductPostion";

const routes = [
    {path: "/", Component:Home, exact: true, title: "Trang chủ"},
    {path: "/store/:storeId", Component: StoreDetail, exact: true, title: "Cửa hàng"},
    {path: "/store/:storeId/product/:productId", Component:ProductPage, exact: true, title: "Chi tiết sản phẩm"},
    {path: "/product/:code", Component:ProductPosition, exact: true, title: "Chi tiết sản phẩm"},
    {path: "/order/:id", Component: Order, exact: true, title: ""},
    {path: "/order/success", Component: OrderSuccess, exact: true},
    {path: "/order/payment/:id", Component: Payment, exact: true, title: ""},
    // {path: "*", Component: NotFound}
]

export default routes;