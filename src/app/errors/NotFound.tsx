import { Button, Card, Empty } from "antd";

export default function NotFound() {
    return (
        <Card className="mt-5 text-center p-5">
            <Empty description="Không tìm thấy trang bạn yêu cầu!"/>
            <Button className="btn btn-primary green text-white mt-5" size="large">Trở về trang chủ</Button>
        </Card>
    )
}