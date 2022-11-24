import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { httpClient } from '../../../lib/api';

interface UserDataType {
  key: string;
  memberId: number | null;
  email: string;
  name: string;
  mobileNo: string | number;
  address: string;
}

const Member: React.FC = (props) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [memId, setMemId] = useState(null);
  const [initialValues, setinitialValues] = useState(location.state? location.state : {
    memberId: '',
    email: '',
    name: '',
    mobileNo: '',
    address: '',
  })
  
  useEffect(() => {
    console.log(location.state, 'member ko lagi');
    if(location && location.state){
      const data = location.state;
      console.log(data,'member data');
      const { memberId } = data;
      setMemId(memberId);
    }
  }, []);

  const onFinish = (values: UserDataType) => {
    console.log('Success:', values);
    if(memId){
      editHandler(memId,values)
    }else{
      createHandler(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editHandler = async (memId: string, values: UserDataType) => {
    let data = {...values, memId}
    await httpClient.POST('bookrent/member',data,true);
    //  await fetch(
    //   'https://book-rental-prabin.herokuapp.com/bookrent/member',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       data
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    navigate('/memberTable');
  };

  const createHandler = async (values: UserDataType) => {
    await httpClient.POST('bookrent/member',values,true);
    // await fetch('https://book-rental-prabin.herokuapp.com/bookrent/member', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: values.email,
    //     name: values.name,
    //     mobileNo: values.mobileNo,
    //     address: values.address,
    //   }),
    //   headers: {'Content-Type':'application/json'}
    // }).then(res => console.log(res,'response coming from creating members'))
    // .catch(err => console.log(err,'error coming from creating members'));
    navigate('/memberTable');
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Member Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item> 

      <Form.Item
        label="Member Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Member Mobile Number"
        name="mobileNo"
        rules={[{ required: true, message: 'Please input your mobile number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Member Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {memId ? "Update" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Member;