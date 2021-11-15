import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../components/ItemList/ItemList";
import ProductItem from "../Product/ProductItem";
import StoreDetailSketon from "./StoreDetailSkeleon";
import StoreDetail from "./StoreDetail";
import Section from "../../components/Section";
import { Empty } from "antd";
import constant from "../../app/utils/constant";
import StoreProducts from "./StoreProducts";
import ItemListSkeleton from "../../components/ItemList/ItemListSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "../Product/productSlice";
import { fetchStoreAsync, storeSelectors } from "./storeSlice";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const products = useAppSelector(productSelectors.selectAll).filter(product => product.storeId === parseInt(storeId));
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector(state => state.product);


  const [isViewProduct, setIsViewProduct] = useState(false);
  const store = useAppSelector(state => storeSelectors.selectById(state, storeId))
  const { status: statusFetchStore } = useAppSelector(state => state.store);

  useEffect(() => {
    if (Number.isInteger(parseInt(storeId))) {
      if (!store) dispatch(fetchStoreAsync(parseInt(storeId))).then(() => {
        if (products.length === 0) dispatch(fetchProductsAsync({ storeId: parseInt(storeId) }))
      })
    }
    if (Number.isInteger(parseInt(storeId))) {
      if (products.length === 0) dispatch(fetchProductsAsync({ storeId: parseInt(storeId) }))
    }
  }, [productsLoaded, dispatch, products.length, store, storeId]);

  return (
    <>
      {!statusFetchStore.includes("pending") && store ? (
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
              {products && !status.includes("pending") ? (
                <ItemList title="Khu mua sắm" isLoading={status.includes("pending")}>
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
              ) : !status.includes("pending") ? (
                <Empty description={constant.text.EMPTY_PRODUCT_LIST} />
              ) : <ItemListSkeleton />}
            </Section> : <StoreProducts products={products} isLoading={status.includes("pending")} />}
        </>
      ) : (
        <StoreDetailSketon isLoading={statusFetchStore.includes("pending")} />
      )}
    </>
  );
}
