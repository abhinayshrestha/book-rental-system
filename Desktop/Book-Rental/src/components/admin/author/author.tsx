import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpClient } from '../../../lib/api';

interface AuthorDataType {
  key: string;
  authorId: number | null;
  authorName: string;
  authorEmail: string;
  authorMobile: string | number;
}

export const originalAuthorData: AuthorDataType[] = [{
  key: "",
  authorId: 0,
  authorName: "authorname",
  authorEmail: "",
  authorMobile: ""
}]

const Author: React.FC = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [ authId, setAuthId ] = useState(null);
  const [initialValues, setInitialValues] = useState(location.state ? location.state : {
    authorId: '',
    authorName: '',
    authorEmail: '',
    authorMobile: ''
  })

  useEffect(() => {
    if(location && location.state){
      const data = location.state;
      console.log(data,'author data');
      const { authorId } = data;
      setAuthId(authorId);
    }
  }, []);

  const onFinish = (values: AuthorDataType) => {
    console.log('Success:', values);
    if (authId) {
      editHandler(authId, values);
    } else {
      createHandler(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editHandler = async (authId: string, values: AuthorDataType) => {
    let data = {...values, authId}
    await httpClient.POST('bookrental/author',data,true)
    // await fetch(
    //   `https://book-rental-prabin.herokuapp.com/bookrental/author`,
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
    navigate('/authorTable');
  };

  const createHandler = async (values: AuthorDataType) => {
    await httpClient.POST('bookrental/author', values, true);
    // await fetch('https://book-rental-prabin.herokuapp.com/bookrental/author', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     authorName: values.authorName,
    //     authorEmail: values.authorEmail,
    //     authorMobile: values.authorMobile
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    navigate('/authorTable');
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
        label="Author Name"
        name="authorName"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Author Email"
        name="authorEmail"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Author Mobile"
        name="authorMobile"
        rules={[{ required: true, message: 'Please input your mobile number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {authId? 'Update' : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Author;