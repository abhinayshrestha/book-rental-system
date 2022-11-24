import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps, Form, Input, Select, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { http, httpClient } from "../../../lib/api";
import { originalAuthorData } from "../author/author";
import { originalCategoryData } from "../category/category";

interface BookDataType {
  key: string;
  bookId: number;
  bookName: string;
  noOfPages: string | number;
  isbn: string;
  rating: number;
  stockCount: string | number;
  publishedDate: string;
  categoryId: string | number;
  authorId: number[];
  bookImage: string;
}

export const originalBookData: BookDataType[] = [
  {
    key: "",
    bookId: 0,
    bookName: "bookname",
    noOfPages: 0,
    isbn: "isbn",
    rating: 0,
    stockCount: 0,
    publishedDate: new Date().toISOString(),
    categoryId: 0,
    authorId: [0],
    bookImage: "",
  },
];
const Book: React.FC = () => {
  const [form] = Form.useForm();
  const [author, setAuthor] = useState(originalAuthorData);
  const [category, setCategory] = useState(originalCategoryData);
  const [publishedDate, setPublishedDate] = useState<string>("");

  const [initialValues, setInitialValues] = useState({
    bookId: "",
    bookName: "",
    noOfPages: "",
    isbn: "",
    rating: "",
    stockCount: "",
    categoryId: "",
    authorId: [],
  });
  const [bookImage, setBookImage] = useState<string>("");

  useEffect(()=>{
    fetchAuthor();
    fetchCategory();
  },[])

  const fetchAuthor = async() => {
    const response = await httpClient.GET('bookrental/author',true)
    // const response = await axios.get('https://book-rental-prabin.herokuapp.com/bookrental/author');
    setAuthor(response.data.data);
  }

  const fetchCategory = async() => {
    const response = await httpClient.GET('bookrental/category',true);
    // const response = await axios.get('https://book-rental-prabin.herokuapp.com/bookrental/category');
    setCategory(response.data.data);
  }

  const authorOptions = author.map(author => {
    return{
      label : author.authorName,
      value : author.authorId,
    }
  })

  const categoryOptions = category.map(category => {
    return {
      label : category.categoryName,
      value : category.categoryId,
    }
  })

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async(values) => {
    console.log(values);
    let formdata = new FormData();
    formdata.append("publishedDate", publishedDate);

    for (let keys in values) {
      formdata.append(keys, values[keys]);
    }
    
    await httpClient.POST('bookrental/book', formdata, true);

    // axios
    //   .post(
    //     "https://book-rental-prabin.herokuapp.com/bookrental/book",
    //     formdata
    //   )
    //   .then((res) => {
    //     console.log(res, "response of book");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const createHandler = (values: UserDataType) => {
  //   axios
  //     .post("https://book-rental-prabin.herokuapp.com/bookrental/book", values)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const datePickerHandler: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setPublishedDate(dateString);
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
        label="Book Name"
        name="bookName"
        rules={[{ required: true, message: "Please enter book name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="No Of Pages"
        name="noOfPages"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="isbn"
        name="isbn"
        rules={[
          { required: true, message: "Please input your mobile number!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Stock Count"
        name="stockCount"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Published Date"
        name="publishedDate"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <DatePicker onChange={datePickerHandler} />
      </Form.Item>

      <Form.Item
        label="Author Id"
        name="authorId"
        rules={[{ required: true, message: "Please input author id!" }]}
      >
        <Select
          showSearch
          placeholder="Select a author Id"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={authorOptions}
        />
      </Form.Item>

      <Form.Item
        label="Category Id"
        name="categoryId"
        rules={[{ required: true, message: "Please input category id!" }]}
      >
        <Select
          showSearch
          placeholder="Select a author Id"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={categoryOptions}
        />
      </Form.Item>
      
      <Form.Item
        name="bookImage"
        label="Upload"
        // valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longggg"
      >
         <Upload name="logo" action="/upload.do" listType="picture" onChange={(file)=> {
          console.log(file,'console from image');
            // setBookImage(file);
        }}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      {/* <Form.Item name="bookImage" label="Upload" initialValue={bookImage}>
        <FileBase
          type="file"
          multiple={false}
          onDone={(file) => {
            console.log(file.file,'book file');
            // console.log(file.base64.split(",")[1]);
            // setBookImage(file.base64);
            // setInitialValues({ ...initialValues, bookImage: file.base64 });
          }}
        />
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Book;
