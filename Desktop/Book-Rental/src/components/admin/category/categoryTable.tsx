import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from './categoryTable.module.css';
import { Button, Space, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { getAllCategory } from '../../../store/modules/Internal/category/getAllCategory';
import { http, httpClient } from '../../../lib/api';

interface UserDataType {
  key: string;
  categoryId: number | null;
  categoryName: string;
  categoryDescription: any;
}

const CategoryTable: React.FC = () => {
  let navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string>("");
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<UserDataType[]>([]);

  useEffect(() => {
    fetchCategoryHandler();
  }, []);

  const fetchCategoryHandler = async () => {

    const response = await httpClient.GET('bookrental/category',true);

    console.log(response,'category table response')

    const dataObj = response.data.data.map((object: UserDataType, index: string) => {
      return {
        key: object?.categoryId?.toString(),
        serial: 1,
        // serial : object.categoryId, 
        categoryId: object.categoryId,
        categoryName: object.categoryName,
        categoryDescription: object.categoryDescription,
      };
    }).sort((a,b)=>{
      return a.categoryId > b.categoryId ? 1 : -1
    });

    dataObj.forEach((element,index) => {
      element.serial = index + 1;
   });

    setCategoryData(dataObj);
  };

  const deleteTaskHandler = (id : string) => {
    setIsModalOpen(true);
    setCategoryId(id);
  }

  const closeModal = () => setIsModalOpen(false);

  const editCategoryHandler = (category) => {
    navigate('/dashboard/category',{
      state: category
    })
  }

  const deleteHandler = async(categoryId: string) => {
    setIsModalOpen(false);
    await httpClient.DELETE('bookrental/category' + categoryId,true)
    await fetch(
      'https://book-rental-prabin.herokuapp.com/bookrental/category' + categoryId + '.json',
      {
        method: 'DELETE',
      }
    );
    fetchCategoryHandler();
  };

  const columns: ColumnsType<UserDataType> = [
    {
      title: 'S.N.',
      dataIndex: 'serial',
      key: 'serial'
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Category Description',
      dataIndex: 'categoryDescription',
      key: 'categoryDescription',
    },
    {
      title: 'Action',
      key: 'action',
      render: (category) => (
        <Space size="middle">
          <EditOutlined
            onClick={()=> editCategoryHandler(category)}
          />
          <DeleteOutlined
            onClick={() => {
              console.log(category.id);
              deleteTaskHandler(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.title}>
        <h1>List of Categories</h1>
        <Button onClick={() => navigate('/category')}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={categoryData} />
      <Modal open={isModalOpen} onOk={() => deleteHandler(categoryId)} onCancel={closeModal}>
            <div className='modalBody'>
                Do you really want to delete?
            </div>
        </Modal>
    </>
  );
};

export default CategoryTable;