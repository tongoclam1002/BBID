import Home from "./features/Home/Home";
import Payment from "./features/Payment/Payment";
import StoreDetail from "./features/Store/StorePage";
import ProductPage from "./features/Product/ProductPage";
import CartPage from "./features/Cart/CartPage";
import ServerError from "./app/errors/ServerError";
import CheckoutSuccessPage from "./features/Checkout/CheckoutSuccessPage";
import CheckoutPage from "./features/Checkout/CheckoutPage";
import OrderPage from "./features/Order/OrderPage";
import OrderDetailPage from "./features/Order/OrderDetailPage";
import i18n from "./i18n";

//Routes with default layout
// const { t } = useTranslation();
const routes = [
  { path: "/", Component: Home, exact: true, title: i18n.t("page.HOME") },
  {
    path: "/store/:storeId",
    Component: StoreDetail,
    exact: true,
    title: i18n.t("page.STORE"),
  },
  {
    path: "/store/:storeId/product/:productId",
    Component: ProductPage,
    exact: true,
    title: i18n.t("page.PRODUCT_DETAILS"),
  },

  //Cart routes
  {
    path: "/cart",
    Component: CartPage,
    exact: true,
    title: i18n.t("page.CART"),
  },

  //Checkout routes
  {
    path: "/checkout",
    Component: CheckoutPage,
    exact: true,
    title: i18n.t("page.CHECKOUT"),
  },
  {
    path: "/checkout/success",
    Component: CheckoutSuccessPage,
    exact: true,
    title: i18n.t("page.CHECKOUT_SUCCESS"),
  },
  {
    path: "/checkout/product/:productId",
    Component: CheckoutPage,
    exact: true,
  },
  { path: "/checkout/payment/:productId", Component: Payment, exact: true },

  //Order routes
  {
    path: "/order",
    Component: OrderPage,
    exact: true,
    title: i18n.t("page.ORDER"),
    isProfile: true,
  },
  {
    path: "/order/:orderId",
    Component: OrderDetailPage,
    exact: true,
    isProfile: true,
  },
  //Error routes
  { path: "/server-error", Component: ServerError, exact: true, title: "" },
];

export default routes;
