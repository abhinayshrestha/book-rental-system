import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../../../lib/api";
import { originalBookData } from "../book/book";
import { originalMemberData } from "../member/memberTable";

const { RangePicker } = DatePicker;

const RentBook: React.FC = () => {
    const [books, setBooks] = useState(originalBookData);
    const [members, setMembers] = useState(originalMemberData);

    useEffect(()=>{
      fetchBooks();
      fetchMembers();
    },[])

    const fetchBooks = async() => {
      const response = await httpClient.GET('bookrental/book',true);
      // const response = await axios.get('https://book-rental-prabin.herokuapp.com/bookrental/book');
      setBooks(response.data.data)
    }

    const fetchMembers = async() => {
      const response = await httpClient.GET('bookrent/member',true);
      // const response = await axios.get('https://book-rental-prabin.herokuapp.com/bookrent/member');
      setMembers(response.data.data)
    }

    const bookOptions = books.map((book) => {
      return {
        label: book.bookName,
        value: book.bookId,
      };
    });

    const memberOptions = members.map((member) => {
      return {
        label: member.name,
        value: member.memberId,
      };
    });

    const handleSingleSelect = (values: string) => {
      console.log(values);
    }

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
            label="Book"
            name="bookId"
            rules={[{ required: true, message: 'Please input your book id!' }]}
          >
            <Select
              showSearch
              placeholder="Select a book"
              optionFilterProp="children"
              onChange={handleSingleSelect}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={bookOptions}
            />
          </Form.Item>

          <Form.Item
          label="Member"
          name="memberId"
          rules={[
            {
              required: false,
              message: "Please input member!",
            },
          ]}
        >
          <Select
            showSearch
            // style={{ width: "100%" }}
            placeholder="Please select member"
            onChange={handleSingleSelect}
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={memberOptions}
          />
        </Form.Item>

          <Form.Item
            label="Book Id"
            name="bookId"
            rules={[{ required: true, message: 'Please input your book id!' }]}
          >
            <RangePicker />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}

export default RentBook;

// new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}').test('leanna123@gmail.com')