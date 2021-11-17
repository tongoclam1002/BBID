import { Form, Input } from 'antd';



export default function AddressForm({onFinish}) {
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

    return (
        <Form id="address-form" {...layout} layout="vertical" name="nest-messages" onFinish={(values) => onFinish(values)} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Họ và tên người nhận" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Số điện thoại" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'address']} label="Địa chỉ" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};