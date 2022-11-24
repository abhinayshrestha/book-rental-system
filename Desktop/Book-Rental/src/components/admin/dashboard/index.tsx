import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboard.css';
  
  const { Header, Sider, Content } = Layout;
  
  const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
  
    return (
      <Layout style={{ height : '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({key})=>{
              navigate(key);
            }}
            items={[
              {
                key: '/dashboard/categoryTable',
                icon: <UserOutlined />,
                label: 'Category',
              },
              {
                key: '/dashboard/bookTable',
                icon: <VideoCameraOutlined />,
                label: 'Book',
              },
              {
                key: '/dashboard/authorTable',
                icon: <UploadOutlined />,
                label: 'Author',
              },
              {
                key: '/dashboard/memberTable',
                icon: <UploadOutlined />,
                label: 'Member',
              },
              {
                key: '/dashboard/booktransactionTable',
                icon: <UserOutlined/>,
                label: 'Book Transaction'
              },
              {
                key: '/dashboard/rentbook',
                icon: <UserOutlined/>,
                label: 'Rent Book'
              },
              {
                key: '/dashboard/returnbook',
                icon: <UserOutlined/>,
                label: 'Return Book'
              }
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <h2>Book Rental System</h2>

          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default Dashboard;