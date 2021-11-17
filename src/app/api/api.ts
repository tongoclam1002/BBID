import axios, { AxiosError, AxiosResponse } from "axios";
// import { history } from "../..";
import toast from "../utils/toast";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === 'development') await sleep();
  return response
}, (error: AxiosError) => {
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
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
}

const Product = {
  list: (storeId: number) => requests.get(`Store/product/${storeId}`),
  details: (productId: number) => requests.get(`Store/productdetail?productId=${productId}`)
}

const Store = {
  list: () => requests.get('Store/GetAllStore'),
  details: (productId: number) => requests.get(`Store/StoreDetail?storeId=${productId}`)
}

const Advertisement = {
  details: (position: string) => requests.get(`Advertise/GetPosition/${position}`)
}

const Cart = {
  get: () => requests.get(`Business/CartDetail`),
  addItem: (productId: number, quantity = 1) => requests.post(`Business/ProductToCart?cartId=${1}&productId=${productId}&quantity=${quantity}`, {}),
  updateItem: (productId: number, quantity : number) => requests.put(`Business/ProductCart/Quantity?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number) => requests.delete(`Business/ProductInCart?cartId=${1}&productId=${productId}`)
}

const Order = {
  list: () => requests.get(`Business/Order`),
  createOrder: (body: any) => requests.post(`Business/CartDetail`, body)
}

const api = {
  Store,
  Product,
  Advertisement,
  Cart
}

export default api;
