import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import Api from "../services/api";
import Configuration from "../services/configuration";
import Section from "../components/Section/Section";
import ItemList from "../components/ItemList/ItemList";
import ProductItem from "../components/ProductItem/ProductItem";
import { store } from "../interfaces/store.interface";

export default function StoreDetail() {
  const api = new Api();
  const config = new Configuration();
  const { storeId }: any = useParams();
  const [products, setProducts] = useState<product[]>([]);
  const [store, setStore] = useState<store>();

  useEffect(() => {

    api.get(config.GET_ALL_PRODUCT_URL + "/" + storeId).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
    {/* <div className="box-shop">
                <div className="row">
                  <div className="col-md-3 col-sm-4">
                    <p className="box-shop-name"><img alt="logo1" src={store.logo} /></p>
                    <p className="box-rate text-center">
                      <span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span><br/>
                        <em>(123 bình luận)</em>
                      </span>
                    </p>
                  </div>
                  <div className="col-md-9 col-sm-8 box-info">
                    <h4 className="clearfix">{store.name}<span className="float-right box-link360"><a className="link360" href="http://malldemo.bbid.vn/" role="button">360<sup>o</sup></a></span></h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="box-tab">
                    </div>
                  </div>
                </div>
              </div> */}
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
                storeId={storeId}
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
