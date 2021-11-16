import { Form, Input, InputNumber, Button } from 'antd';



export default function AddressForm() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Vui lòng nhập ${label}.',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */
    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Form {...layout} layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Họ và tên người nhận" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Số điện thoại" rules={[{ type: 'number', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Địa chỉ" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item> */}
        </Form>
    );
};