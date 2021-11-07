import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import ItemList from "../components/ItemList/ItemList";
import Product from "../components/Product/Product";
import Section from "../components/Section/Section";
import { product } from "../../models/product.model";
import Api from "../services/api";
import Configuration from "../services/configuration";

export default function Home() {
  const api = new Api();
  const config = new Configuration();
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    api.get(config.GET_ALL_PRODUCT_URL).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <Carousel />
      <Section title="Khu Ẩm Thực">
        <ItemList title="Khu ăn uống">
          {products &&
            products.map((product) => (
              <Product
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
      </Section>
    </>
  );
}
