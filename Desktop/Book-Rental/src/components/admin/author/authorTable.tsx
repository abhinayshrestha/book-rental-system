import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from './author.module.css';
import { Button, Space, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../../lib/api';

interface UserDataType {
  authorId: number;
  authorName: string;
  authorEmail: string;
  authorMobile: string;
}

const AuthorTable: React.FC = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskId, setTaskId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [authorData, setAuthorData] = useState<UserDataType[]>([]);

  useEffect(() => {
    fetchAuthorHandler();
  }, []);

  const fetchAuthorHandler = async () => {
    // dispatch(getAllCategory());
    const response = await httpClient.GET('bookrental/author',true);

    const dataObj = response.data.data.map((object: UserDataType, index: string) => {
      return {
        key: object?.authorId?.toString(),
        serial: index + 1,
        authorId: object.authorId,
        authorName: object.authorName,
        authorEmail: object.authorEmail,
        authorMobile: object.authorMobile
      };
    });

    setAuthorData(dataObj);
    setIsLoading(false)
  };

  const deleteTaskHandler = (id : string) => {
    setIsModalOpen(true);
    setTaskId(id);
  }

  const closeModal = () => setIsModalOpen(false);

  const editAuthorHandler = (author) => {
    navigate('/author',{
      state: author
    })
  }

  const deleteHandler = async(authorId: string) => {
    setIsModalOpen(false);
    await httpClient.DELETE('bookrental/author' + authorId,true)
    // await fetch(
    //   'https://book-rental-prabin.herokuapp.com/bookrental/author' + authorId + '.json',
    //   {
    //     method: 'DELETE',
    //   }
    // );
    fetchAuthorHandler();
  };

  if(isLoading){
    return <section className={classes.dataloading}>
      <p>Loading...</p>
    </section>
  }

  const columns: ColumnsType<UserDataType> = [
    {
      title: 'S.N.',
      dataIndex: 'serial',
      key: 'serial'
    },
    {
      title: 'Author Name',
      dataIndex: 'authorName',
      key: 'authorName',
    },
    {
      title: 'Author Email',
      dataIndex: 'authorEmail',
      key: 'authorEmail',
    },
    {
      title: 'Author Mobile',
      dataIndex: 'authorMobile',
      key: 'authorMobile',
    },
    {
      title: 'Action',
      key: 'action',
      render: (author) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => editAuthorHandler(author)}
          />
          <DeleteOutlined
            onClick={() => {
              console.log(author.id);
              deleteTaskHandler(author.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.title}>
        <h1>List of Author</h1>
        <Button onClick={() => navigate('/dashboard/author')}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={authorData} />
      <Modal open={isModalOpen} onOk={() => deleteHandler(taskId)} onCancel={closeModal}>
          <div className='modalBody'>
              Do you really want to delete?
          </div>
      </Modal>
    </>
  );
};

export default AuthorTable;