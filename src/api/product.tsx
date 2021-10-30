const API_URL = process.env.REACT_APP_API_URL;

export function get() {
  return fetch(`${API_URL}api/Store/product/1`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let items = data.data;
      let products = [];
      items.forEach((product) => {
        products = [
          ...products,
          {
            id: product.productId,
            name: product.name,
            img: product.image,
            price: product.price,
            description: product.description,
          },
        ];
      });
      return products;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getDetail(id) {
  return fetch(`${API_URL}api/Store/productdetail?productId=${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let product = data.data;
      return product = {
        id: product.productId,
        name: product.name,
        img: product.image,
        price: product.price,
        description: product.description,
      };
    })
    .catch((error) => {
      console.log(error);
    });
}
