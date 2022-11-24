import { Button, Form, Input } from "antd";

const ReturnBook: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Book Transaction Id"
            name="bookTransactionId"
            rules={[{ required: true, message: 'Please input your book transaction id!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Book Id"
            name="bookId"
            rules={[{ required: true, message: 'Please input your book id!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Book Id"
            name="bookId"
            rules={[{ required: true, message: 'Please input your book id!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rent Type"
            name="rentType"
            rules={[{ required: true, message: 'Please input your rent type!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Member Id"
            name="memberId"
            rules={[{ required: true, message: 'Please input your member id!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}

export default ReturnBook;