import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import Api from "../services/api";
import Configuration from "../services/configuration";
import Section from "../components/Section/Section";
import ItemList from "../components/ItemList/ItemList";
import ProductItem from "../components/ProductItem/ProductItem";

export default function StoreDetail() {
  const api = new Api();
  const config = new Configuration();
  const { id }: any = useParams();
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    api.get(config.GET_ALL_PRODUCT_URL + "/" + id).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <Section title="Sản phẩm nổi bật">
        {products.length ? (
          <ItemList title="Khu mua sắm">
            {products.map((product) => (
              <ProductItem
                key={product.productId}
                productId={product.productId}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                storeId={product.storeId}
              />
            ))}
          </ItemList>
        ) : (
          <div>Hiện tại chưa có sản phẩm nào</div>
        )}
      </Section>
    </>
  );
}
