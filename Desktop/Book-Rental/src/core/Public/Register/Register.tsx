import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import bookregister from '../../../assets/img/booklibrary.jpg';

interface LoginDataType {
    userName : string;
    password : string;
    userType : string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: LoginDataType) => {
    console.log('Success:', values);
    register(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const register = async(values) => {
    const response = await fetch('https://book-rental-prabin.herokuapp.com/bookrent/user',{
        method : 'POST',
        body: JSON.stringify({
            userName : values.userName,
            password : values.password,
            userType : "ADMIN"
        })
    })
    .then(res => console.log(res,'Register RES'))
    .catch(err => console.log(err));

    navigate('/login');
  }

  return (
    <div className='content'>
      <div className="login-form-wrapper">
        <div className="image-container">
          <img src={bookregister} alt="" />
        </div>
        <div className="form-container">
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
              label="Username"
              name="userName"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <h6>Already have a account?</h6>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;