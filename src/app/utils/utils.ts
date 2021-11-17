import { CartStore } from "../interfaces/cart.interface";

export const groupBy = (items, key, subKey) => {
    let array = items.map(item => item[key])
        .filter((value, index, self) => self.indexOf(value) === index)
    let group = [];
    array.forEach(element => {
        const object = {
            [key]: element,
            [subKey]: items.filter((value) => value[key] === element)
        }
        group.push(object)
    });
    return group;
};

export function getTotalPriceInCart (stores: CartStore[]) {
    return stores.reduce((sum, store) =>
    sum + store.productList.reduce((sum, product) =>
      sum + (product.quantity * product.price), 0)
    , 0)
}