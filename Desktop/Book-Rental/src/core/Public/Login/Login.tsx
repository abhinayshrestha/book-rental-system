import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { httpClient } from '../../../lib/api';
import bookimg from '../../../assets/img/bookimg.jpg';

interface LoginDataType {
    username : string;
    password : string;
}


const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginDataType) => {
    console.log('Success:', values);
    login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const login = async(values: LoginDataType) => {

    const response = await httpClient.POST('bookrental/authenticate',values);
    console.log(response,'response data')
    const token = response.data.jwt;
    localStorage.setItem('token', token);
    navigate('/dashboard');
  }

  return (
    <div className="content">
      <div className="login-form-wrapper">
          <div className="image-container">
            <img src={bookimg} alt="" />
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
                name="username"
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

              {/* <Form.Item
                label="UserType"
                name="userType"
                rules={[{ required: true, message: 'Please input user type!' }]}
              >
                <Input />
              </Form.Item> */}

              {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <h6>Haven't registered yet?</h6>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </Form>
          </div>
        </div>
    </div>
  );
};

export default Login;