import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { httpClient } from '../../../lib/api';

type UserDataType = {
  key : string;
  bookId : string;
  bookTransactionId : number;
  code : string;
  member : string;  
}

const BookTransactionTable: React.FC = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState<UserDataType[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(()=>{
        fetchHandler();
    },[])

    const fetchHandler = async() => {
        const response = await httpClient.GET('bookrental/booktransaction',true);
        // const response = await axios.get('https://book-rental-prabin.herokuapp.com/bookrent/booktransaction');
        console.log(response.data.data,'response from book')

        const responseData = response.data.data.map((object: UserDataType, index: string) => {
          return {
            serail : index + 1,
            key: object?.bookTransactionId.toString(),
          }
        });
        // setBookData(response);
    }

    const closeModal = () => setIsModalOpen(false);

    const columns: ColumnsType<UserDataType> = [
        {
          title: 'S.N.',
          dataIndex: 'serial',
          key: 'serial'
        },
        {
          title: 'Book Id',
          dataIndex: 'bookId',
          key: 'bookId',
        },
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'From Date',
          dataIndex: 'isbn',
          key: 'isbn',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
        },
        {
          title: 'Stock Count',
          dataIndex: 'stockCount',
          key: 'stockCount',
        },
        {
          title: 'Published Date',
          dataIndex: 'publishedDate',
          key: 'publishedDate',
        },
        {
          title: 'Image Path',
          dataIndex: 'publishedDate',
          key: 'publishedDate',
        },
        {
          title: 'Author Id',
          dataIndex: 'authorId',
          key: 'authorId',
        },
        {
          title: 'Category Id',
          dataIndex: 'categoryId',
          key: 'categoryId',
        },
      ];

    return (
        <>
      <div className="title">
        <h1>List of Book Transaction</h1>
      </div>
      <Table columns={columns} dataSource={bookData} />
    </>
    )
}

export default BookTransactionTable;