import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const routes = [
    {path: "/", component:Home, exact: true},
    {path: "/products/:id(\\d+)", component:ProductDetail},
    {path: "/order/:id(\\d+)", component: Order, exact: true},
    {path: "/order/success", component: OrderSuccess},
    {path: "/order/payment/:id(\\d+)", component: Payment},
    {path: "*", component: NotFound}
]

export default routes;