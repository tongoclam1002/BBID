import { Card } from "antd";
import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <Card className="text-center d-flex align-items-center justify-content-center" style={{minHeight: "50vh"}}>
      <div>
        <h4>Chúc mừng bạn đặt hàng thành công</h4>
        <p>
          Bạn có thể theo dõi đơn hàng 
          <Link to={`/order`}> tại đây</Link>
        </p>
      </div>
    </Card>
  );
}
