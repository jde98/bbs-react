import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {menuSelected} from "../../../reducers/menuSelect";

const {Sider} = Layout;

const Navigation = () => {

    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const menuClick = (name) => {
      dispatch(menuSelected(name));
    }

    const leftMenu = [
      {
        key: 1,
        icon: React.createElement(UserOutlined),
        label: '게시판',
        children: [
          {
            key: 2,
            label: (<Link to="/main/notice" onClick={ () => menuClick(["게시판","공지사항"])}>공지사항</Link>),
          },
          {
            key: 3,
            label: (<Link to="/main/bbs" onClick={ () => menuClick(["게시판","자유게시판"])}>자유게시판</Link>)
          },
          {
            key: 4,
            label: (<Link to="/main/qaBoard" onClick={ () => menuClick(["게시판","질문답변"])}>질문답변</Link>)
          },
        ]
      },
      {
        key: 5,
        icon: React.createElement(SettingOutlined),
        label: '관리자권한',
        children: [
          {
            key: 6,
            label:"코드관리"
          },
          {
            key: 7,
            label:"메뉴관리"
          },
          {
            key: 8,
            label: (<Link to="/main/member" onClick={ () => menuClick(["관리자권한","회원관리"])}>회원관리</Link>)
          },
          {
            key: 9,
            label:"게시판관리"
          },
        ]
      },
    ];
    return (
      <Sider width={200}
             className="site-layout-background"
             collapsible collapsed={collapsed}
             onCollapse={value => setCollapsed(value)}
      >
        <Menu
            theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          defaultOpenKeys={['1']}
          style={{
            height: '1000px',
          }}
          items={leftMenu}
        />
      </Sider>
    );
}
export default Navigation;