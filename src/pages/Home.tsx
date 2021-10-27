import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import ItemList from "../components/ItemList/ItemList";
import Product from "../components/Product/Product";
import Section from "../components/Section/Section";
import Layout from "../layout/Layout";
import { product } from "../../models/product.model";
import ProductDetail from "./ProductDetail";

export default function Home() {
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {
    fetch("/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
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
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  numberOfComments={123}
                  imgUrl={product.img}
                />
              ))}
          </ItemList>
        </Section>
      </>
  );
}
