import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelcted } from '../../../action/action';

const {Sider} = Layout;

  export default function Navigation() {

    const dispatch = useDispatch();

    const menuClick = (name) => {
      dispatch(menuSelcted(name));

      
    }

    const leftMenu = [
      {
        key: 1,
        icon: React.createElement(UserOutlined),
        label: '게시판',
        children: [
          {
            key: 1,
            label: (<Link to="/main/notice" onClick={ () => menuClick(["게시판","공지사항"])}>공지사항</Link>),
          },
          {
            key: 2,
            label: (<Link to="/main/bbs" onClick={ () => menuClick(["게시판","자유게시판"])}>자유게시판</Link>)
          },
          {
            key: 3,
            label: (<Link to="/main/qaBoard" onClick={ () => menuClick(["게시판","질문답변"])}>질문답변</Link>)
          },
        ]
      },
      {
        key: 2,
        icon: React.createElement(SettingOutlined),
        label: '관리자권한',
        children: [
          {
            key: 4,
            label:"코드관리"
          },
          {
            key: 5,
            label:"메뉴관리"
          },
          {
            key: 6,
            label: (<Link to="/main/member" onClick={ () => menuClick(["관리자권한","회원관리"])}>회원관리</Link>)
          },
          {
            key: 7,
            label:"게시판관리"
          },
        ]
      },
    ];


    return (
      <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={leftMenu}
      />
    </Sider>
    );
  }