// import { store } from "../store/configureStore";
import axios, { AxiosError, AxiosResponse } from "axios";
// import { history } from "../..";
import toast from "../utils/toast";
import authHeader from "./auth-header";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

let store;

export const injectStore = (_store) => {
  store = _store;
};

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response;
    // console.log(error.response);
    switch (status) {
      case 400:
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        // history.push({
        //   pathname: '/server-error',
        //   state: {error: data}
        // });
        break;
      default:
        toast.error(data.title);
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
  list: (storeId: number) => requests.get(`Store/product/${storeId}`),
  details: (productId: number) =>
    requests.get(`Store/Product?productId=${productId}`),
  position: (code: string) => requests.get(`Advertise/ProductPosition/${code}`),
  rate: () => requests.post(``, {}),
};

const Store = {
  list: () => requests.get("Store/GetAllStore"),
  details: (productId: number) =>
    requests.get(`Store/StoreDetail?storeId=${productId}`),
};

const Advertisement = {
  details: (position: string) =>
    requests.get(`Advertise/GetPosition/${position}`),
};

const Cart = {
  get: () => requests.get(`Business/CartDetail`),
  addItem: (productId: number, quantity = 1, productDetailId: number) =>
    requests.post(
      `Business/ProductToCart?productId=${productId}&quantity=${quantity}&productDetailId=${productDetailId}`,
      {}
    ),
  updateItem: (productDetailId: number, quantity: number) =>
    requests.put(
      `Business/ProductCart/Quantity?productDetailId=${productDetailId}&quantity=${quantity}`,
      {}
    ),
  removeItem: (productDetailId: number) =>
    requests.delete(
      `Business/ProductInCart?cartId=${1}&productDetailId=${productDetailId}`
    ),
};

const Order = {
  list: () => requests.get(`Business/Order`),
  createOrder: (addressTo, receiverName, receiverNNumber, productDetails) =>
    requests.post(`Business/Order`, {
      addressTo: addressTo,
      receiverName: receiverName,
      receiverNNumber: receiverNNumber,
      productDetails: productDetails,
    }),
};

const Account = {
  login: (values: any) => requests.post(`Account`, values),
  register: (values: any) => requests.post(`Account/Register`, values),
  get: () => requests.get(``),
  logout: () => requests.post(``, {}),
  currentUser: () => requests.get(`Account/GetUserInfo`),
};

const Comment = {
  list: (productId: number) =>
    requests.get(`Business/Comment/GetAll/${productId}`),
  post: (content: string, rating: number, productId: number) =>
    requests.post(`Business/Comment`, {
      content: content,
      rating: rating,
      productId: productId,
    }),
};

const api = {
  Store,
  Product,
  Advertisement,
  Cart,
  Order,
  Account,
  Comment,
};

export default api;
