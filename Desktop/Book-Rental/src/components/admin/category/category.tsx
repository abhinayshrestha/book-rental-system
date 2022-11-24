import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CategoryDataType {
  key: string;
  categoryId: number | null;
  categoryName: string;
  categoryDescription: string;
}

export const originalCategoryData : CategoryDataType[] = [
  {
    key: "",
    categoryId: 0,
    categoryName: "",
    categoryDescription: ""
  }
]

const Category: React.FC = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [catId, setCatId] = useState(null);
  const [initialValues, setInitialValues] = useState(location.state? location.state : {
    categoryId: '',
    categoryName: '',
    categoryDescription: '',
  });

  useEffect(() => {
    console.log(location.state, 'category location state')
    if(location && location.state){
      console.log(location.state,'locaion state');
      const data = location.state;
      const { categoryId, categoryName , categoryDescription } = data;
      console.log(data,'category data logged')
      setCatId(categoryId)
      // setInitialValues({
      //   categoryName, categoryDescription
      // })
      // console.log(initialValues,'initial values logged')
      // form.setFieldsValue(initialValues)
    }
  }, []);

  // const fetchCategory = async (id: string) => {
  //   const response = await fetch(
  //     'https://book-rental-prabin.herokuapp.com/bookrental/category/' + id
  //   );
  //   console.log(response,'category edit fetch response')
  //   const responseData = await response.json();
  //   console.log(responseData,'coming from responseData')
  //   form.setFieldsValue(responseData);
  // };

  const onFinish = (values: CategoryDataType) => {
    console.log('Success:', values);
    if(catId){
      editHandler(catId, values)
    } else{
      createHandler(values);
    }
    // if (categoryId) {
    //   editTaskHandler(categoryId, values);
    // } else {
    //   createTaskHandler(values);
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editHandler = async (categoryId: string, values: CategoryDataType) => {
    console.log(values,'edit values')
    console.log(categoryId,'edit id needed')
    let data = {...values, categoryId}
    const token = localStorage.getItem('token');
     await axios.post(
      'https://book-rental-prabin.herokuapp.com/bookrental/category',
      data,{
        headers:{
          'Authorization' : `Bearer ${token}`,
        }
      }
    );
    navigate('/dashboard/categoryTable');
  };

  const createHandler = async (values: any) => {
    await axios.post('https://book-rental-prabin.herokuapp.com/bookrental/category', 
      JSON.stringify({
        categoryName: values.categoryName,
        categoryDescription: values.categoryDescription,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    navigate('/dashboard/categoryTable');
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
        label="Category Name"
        name="categoryName"
        rules={[{ required: true, message: 'Please input your title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category Description"
        name="categoryDescription"
        rules={[{ required: true, message: 'Please input your description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {catId? "Update" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Category;