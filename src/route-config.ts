import Home from "./features/Home/Home"
import Payment from "./features/Payment/Payment";
import StoreDetail from "./features/Store/StorePage";
import ProductPage from "./features/Product/ProductPage";
import ProductPosition from "./features/VirtualMall/ProductPostionPage";
import CartPage from "./features/Cart/CartPage";
import ServerError from "./app/errors/ServerError";
import CheckoutSuccessPage from "./features/Checkout/CheckoutSuccessPage";
import CheckoutPage from "./features/Checkout/CheckoutPage";
import OrderPage from "./features/Order/OrderPage";

//Routes with default layout
const routes = [
    { path: "/", Component: Home, exact: true, title: "Trang chủ" },
    { path: "/store/:storeId", Component: StoreDetail, exact: true, title: "Cửa hàng" },
    { path: "/store/:storeId/product/:productId", Component: ProductPage, exact: true, title: "Chi tiết sản phẩm" },
    { path: "/product/:code", Component: ProductPosition, exact: true, title: "Chi tiết sản phẩm" },

    //Cart routes
    { path: "/cart", Component: CartPage, exact: true, title: "Giỏ hàng của bạn" },

    //Checkout routes
    { path: "/checkout", Component: CheckoutPage, exact: true, title: "Đặt hàng" },
    { path: "/checkout/success", Component: CheckoutSuccessPage, exact: true, title: "Đặt hàng thành công" },
    { path: "/checkout/product/:productId", Component: CheckoutPage, exact: true },
    { path: "/checkout/payment/:productId", Component: Payment, exact: true },

    //Order routes
    { path: "/order", Component: OrderPage, exact: true, title: "Đơn hàng của bạn", isProfile: true},
    //Error routes
    { path: "/server-error", Component: ServerError, exact: true, title: "" }
]

export default routes;