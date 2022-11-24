import React, { useEffect, useState } from 'react';
import classes from './memberTable.module.css';
import { Button, Space, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../../lib/api';

interface MemberDataType {
  key: string;
  memberId: string | null;
  email: string;
  name: string;
  mobileNo: number | string;
  address: string;
}

export const originalMemberData: MemberDataType[] = [
  {
    key: "",
    memberId: null,
    email: "",
    name: "",
    mobileNo: "",
    address: "",
  },
];

const MemberTable: React.FC = () => {
  let navigate = useNavigate();
  const [taskId, setTaskId] = useState<string>("");
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<MemberDataType[]>([]);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = async () => {
    const response = await httpClient.GET('bookrental/member',true);
    console.log(response,'reps member')

    const dataObj = response.data.data.map((object: MemberDataType, index: string) => {
      return {
        serial: index + 1,
        key: object?.memberId?.toString(),
        memberId: object.memberId,
        email: object.email,
        name: object.name,
        mobileNo: object.mobileNo,
        address: object.address,
      };
    });

    setCategoryData(dataObj);
  };

  const editMemberHandler = (member: MemberDataType) => {
    console.log(member,'coming from member')
    navigate('/member',
    {state : member})
  }

  const deleteTaskHandler = (id : string) => {
    setIsModalOpen(true);
    setTaskId(id);
  }

  const closeModal = () => setIsModalOpen(false);

  const deleteHandler = async(memberId: string) => {
    setIsModalOpen(false);
    await httpClient.DELETE('bookrent/member/' + memberId, true);
    // await fetch(
    //   'https://book-rental-prabin.herokuapp.com/bookrent/member/' + memberId ,
    //   {
    //     method: 'DELETE',
    //   }
    // );
    fetchDataHandler();
  };

  const columns: ColumnsType<MemberDataType> = [
    {
      title: 'S.N.',
      dataIndex: 'serial',
      key: 'serial'
    },
    {
      title: ' Member ID',
      dataIndex: 'memberId',
      key: 'memberId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNo',
      key: 'mobileNo',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (member) => (
        <Space size="middle">
          <EditOutlined
            onClick={()=> editMemberHandler(member)}
          />
          <DeleteOutlined
            onClick={() => {
              console.log(member.id);
              deleteTaskHandler(member.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.title}>
        <h1>List of Members</h1>
        <Button onClick={() => navigate('/member')}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={categoryData} />
      <Modal open={isModalOpen} onOk={() => deleteHandler(taskId)} onCancel={closeModal}>
            <div className='modalBody'>
                Do you really want to delete?
            </div>
        </Modal>
    </>
  );
};

export default MemberTable;