import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/interfaces/product.interface";
import ItemList from "../../components/ItemList/ItemList";
import ProductItem from "../Product/ProductItem";
import { Store } from "../../app/interfaces/store.interface";
import StoreDetailSketon from "./StoreDetailSkeleon";
import StoreDetail from "./StoreDetail";
import api from "../../app/api/api";
import Section from "../../components/Section";
import { Empty } from "antd";
import constant from "../../app/utils/constant";
import StoreProducts from "./StoreProducts";
import ItemListSkeleton from "../../components/ItemList/ItemListSkeleton";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isViewProduct, setIsViewProduct] = useState(false);
  const [store, setStore] = useState<Store>(null);
  const [isFetchingStore, setIsFetchingStore] = useState(true);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  useEffect(() => {
    api.Store.details(parseInt(storeId)).then(response => {
      setStore(response.data[0]);
      api.Product
        .list(parseInt(storeId))
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
          setIsFetchingProducts(false);
        });
    })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        setIsFetchingStore(false);
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
                    <li >
                      <a href="#tab-shop" className={!isViewProduct ? "active" : ""} onClick={() => setIsViewProduct(false)}>Cửa hàng</a>
                    </li>
                    <li>
                      <a href="#tab-product" className={isViewProduct ? "active" : ""} onClick={() => setIsViewProduct(true)}>Sản phẩm</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {!isViewProduct ? 
          <Section title="Sản phẩm nổi bật">
            {products && !isFetchingProducts ? (
              <ItemList title="Khu mua sắm" isLoading={isFetchingProducts}>
                {products.map((product) => (
                  <ProductItem
                    key={product.productId}
                    productId={product.productId}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    storeId={parseInt(storeId)}
                  />
                ))}
              </ItemList>
            ) : !isFetchingProducts ? (
              <Empty description={constant.text.EMPTY_PRODUCT_LIST} />
            ) : <ItemListSkeleton />}
          </Section> : <StoreProducts products={products} isLoading={isFetchingProducts} />}
        </>
      ) : (
        <StoreDetailSketon isLoading={isFetchingStore} />
      )}
    </>
  );
}
