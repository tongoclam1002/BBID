import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import Api from "../services/api";
import Configuration from "../services/configuration";
import Section from "../components/Section/Section";
import ItemList from "../components/ItemList/ItemList";
import ProductItem from "../components/Product/ProductItem";
import { store } from "../interfaces/store.interface";
import StoreDetailSketon from "../components/Store/StoreDetailSkeleon";
import StoreDetail from "../components/Store/StoreDetail";

export default function StorePage() {
  const api = new Api();
  const config = new Configuration();
  const { storeId }: any = useParams();
  const [products, setProducts] = useState<product[]>([]);
  const [store, setStore] = useState<store>(null);
  const [isFetchingStore, setIsFetchingStore] = useState(true);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  useEffect(() => {
    api
      .get(config.GET_STORE_DETAIL + storeId)
      .then((store) => {
        setStore(store[0]);
        setIsFetchingStore(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetchingStore(false);
      });
    api
      .get(config.GET_ALL_PRODUCT_URL + "/" + storeId)
      .then((products) => {
        setProducts(products);
        setIsFetchingProducts(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetchingProducts(false);
      });
  }, []);

  return (
    <>
      {!isFetchingStore && store ? (
        <>
          <div className="box-shop">
            <StoreDetail store={store} />
            <div className="row">
              <div className="col-12">
                <div className="box-tab">
                  <ul className="nav nav-tabs">
                    <li>
                      <a href="#tab-shop">Cửa hàng</a>
                    </li>
                    <li>
                      <a href="#tab-product">Sản phẩm</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Section title="Sản phẩm nổi bật">
            {products.length ? (
              <ItemList title="Khu mua sắm" isFetching={isFetchingProducts}>
                {products.map((product) => (
                  <ProductItem
                    key={product.productId}
                    productId={product.productId}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    storeId={storeId}
                  />
                ))}
              </ItemList>
            ) : (
              <div>Hiện tại chưa có sản phẩm nào</div>
            )}
          </Section>
        </>
      ) : (
        <StoreDetailSketon isFetching={isFetchingStore} />
      )}
    </>
  );
}
