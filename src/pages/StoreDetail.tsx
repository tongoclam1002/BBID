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
  const [store, setStore] = useState<store>(null);

  useEffect(() => {
    api.get(config.GET_STORE_DETAIL + storeId).then((store) => {
      setStore(store[0]);
    });
    api.get(config.GET_ALL_PRODUCT_URL + "/" + storeId).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <div className="box-shop">
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <p className="box-shop-name">
              <img alt="logo1" src={store?.logo} />
            </p>
            <p className="box-rate text-center">
              <span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <br />
                <em>(123 bình luận)</em>
              </span>
            </p>
          </div>
          <div className="col-md-9 col-sm-8 box-info">
            <h4 className="clearfix">
              {store?.name}
              <span className="float-right box-link360">
                <a
                  className="link360"
                  href="http://malldemo.bbid.vn/"
                  role="button"
                >
                  360<sup>o</sup>
                </a>
              </span>
            </h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
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
      <div id="tab-product" className="tab-pane fade">
                          <div className="row">
                            <div className="col-md-3 col-sm-4">
                              <div className="box-filter">
                                <h5>Danh mục</h5>
                                <p>
                                  <select className="form-control" id="sel1">
                                    <option>Quần áo</option>
                                    <option>Giầy dép</option>
                                    <option>Phụ kiện</option>
                                  </select>
                                </p>
                                <h5>Sản phẩm</h5>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Áo thun
                                </p>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Áo sơ mi
                                </p>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Áo khoác
                                </p>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  quần jean
                                </p>
                                <h5>Giá tiền</h5>
                                <p>
                                  <select className="form-control" id="sel1">
                                    <option>Trên 1.000.000đ</option>
                                    <option>Từ 500.000đ - 1.000.000đ</option>
                                    <option>Từ 200.000đ - 500.000đ</option>
                                    <option>Dưới 200.000đ</option>
                                  </select>
                                </p>
                                <h5>Ưu đãi</h5>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Giảm giá 50%
                                </p>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Giảm giá 10%
                                </p>
                                <p>
                                  <span className="checkbox"><input type="checkbox" value=""/></span>
                                  Miễn phí vận chuyển
                                </p>
                                <h5>Đánh giá</h5>
                                <p className="box-rate">
                                  <span className="checkbox">
                                    <input type="checkbox" value=""/>
                                  </span>
                                  <span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                  </span>
                                </p>
                                <p className="box-rate">
                                  <span className="checkbox">
                                    <input type="checkbox" value=""/>
                                  </span>
                                  <span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                  </span>
                                </p>
                                <p className="box-rate">
                                  <span className="checkbox">
                                    <input type="checkbox" value=""/>
                                  </span>
                                  <span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-9 col-sm-8">
                              <div className="box-list-main product filter clearfix">
                                <ul>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/4.jpg"/></a>
                                      <p className="title">Áo thun mẫu A1268<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>
                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/5.jpg"/></a>
                                      <p className="title">Áo thun mẫu A2612<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/6.jpg"/></a>
                                      <p className="title">Áo thun mẫu A6269<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/4.jpg"/></a>
                                      <p className="title">Áo thun mẫu A1268<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>
                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/5.jpg"/></a>
                                      <p className="title">Áo thun mẫu A2612<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/6.jpg"/></a>
                                      <p className="title">Áo thun mẫu A6269<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/4.jpg"/></a>
                                      <p className="title">Áo thun mẫu A1268<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>
                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/5.jpg"/></a>
                                      <p className="title">Áo thun mẫu A2612<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li>
                                      <a href="#test"><img alt="logo1" src="img/6.jpg"/></a>
                                      <p className="title">Áo thun mẫu A6269<br/><strong>150,000đ</strong></p>
                                      <p className="rate">
                                        <span className="rate-left">
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star checked"></span>
                                          <span className="fa fa-star"></span>
                                          <span className="fa fa-star"></span><br/>
                                          <em>(123 bình luận)</em>
                                        </span>

                                        <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
                                      </p>
                                    </li>
                                    <li className="no-border">
                                      <a href="#test" className="box-more">
                                        <span><i className="fas fa-chevron-right"></i></span>
                                      </a>
                                    </li>
                                  </ul>
                              </div>
                            </div>
                          </div>
                        </div>
    </>
  );
}
