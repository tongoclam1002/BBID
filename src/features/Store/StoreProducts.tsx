import { Card } from "antd";
import ItemList from "../../components/ItemList/ItemList";
import ProductItem from "../Product/ProductItem";

export default function StoreProducts({ products, isLoading }) {
    return (
        <div className="tab-pane">
            <div className="row">
                <div className="col-md-3 col-sm-4">
                    <Card className="box-filter">
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
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Áo thun
                        </p>
                        <p>
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Áo sơ mi
                        </p>
                        <p>
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Áo khoác
                        </p>
                        <p>
                            <span className="checkbox"><input type="checkbox" value="" /></span>
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
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Giảm giá 50%
                        </p>
                        <p>
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Giảm giá 10%
                        </p>
                        <p>
                            <span className="checkbox"><input type="checkbox" value="" /></span>
                            Miễn phí vận chuyển
                        </p>
                        <h5>Đánh giá</h5>
                        <p className="box-rate">
                            <span className="checkbox">
                                <input type="checkbox" value="" />
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
                                <input type="checkbox" value="" />
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
                                <input type="checkbox" value="" />
                            </span>
                            <span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                            </span>
                        </p>
                    </Card>
                </div>
                <div className="col-md-9 col-sm-8">
                    <Card>
                        <ItemList isLoading={isLoading}>
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
                    </Card>
                </div>
            </div>
        </div>
    )
}