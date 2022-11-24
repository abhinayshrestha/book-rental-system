import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { httpClient } from "../../../lib/api";
import classes from "./bookTable.module.css";

type UserDataType = {
  key: string;
  bookId: number;
  bookName: string;
  noOfPages: number;
  isbn: string;
  rating: number;
  stockCount: number;
  publishedDate: string;
  categoryId: number;
  authorId: number[];
  imagePath: string;
};

const BookTable: React.FC = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<UserDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    const response = await httpClient.GET('bookrental/book',true);

    const dataObj = response.data.data.map(
      (object: UserDataType, index: string) => {
        return {
          serial: index + 1,
          key: object?.bookId?.toString(),
          bookName: object.bookName,
          isbn: object.isbn,
          rating: object.rating,
          stockCount: object.stockCount,
          publishedDate: object.publishedDate,
          imagePath: object.imagePath,
        };
      }
    );

    setBookData(dataObj);
  };

  const closeModal = () => setIsModalOpen(false);

  const editHandler = (book: UserDataType) => {
    navigate("/dashboard/book", {
      state: book,
    });
  };

  const deleteHandler = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<UserDataType> = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Stock Count",
      dataIndex: "stockCount",
      key: "stockCount",
    },
    {
      title: "Published Date",
      dataIndex: "publishedDate",
      key: "publishedDate",
    },
    {
      title: "Book Image",
      key: "imagePath",
      align: "center",
      render: (book) => (
        <img width="50" src={`data:image/jpeg;base64, ${book.imagePath}`} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (book) => (
        <Space size="middle">
          <EditOutlined onClick={() => editHandler(book)} />
          <DeleteOutlined onClick={deleteHandler} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.title}>
        <h1>List of Books</h1>
        <Button onClick={() => navigate("/book")}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={bookData} pagination={{
                pageSize: 4,
              }}/>
      <Modal
        open={isModalOpen}
        onOk={() => deleteHandler()}
        onCancel={closeModal}
      >
        <div className="modalBody">Do you really want to delete?</div>
      </Modal>
    </>
  );
};

export default BookTable;
