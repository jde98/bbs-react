import React from 'react';
import "../../assets/antd.css"
import { Layout, Breadcrumb } from 'antd';

import ClientHeader from '../../component/bbs/layout/ClientHeader';
import Navigation from '../../component/bbs/layout/Navigation';

import { Route, Routes } from 'react-router-dom';
import Bbs from './/Bbs';
import QaBoard from './/QaBoard';
import Notice from './/Notice';
import { useSelector } from 'react-redux';
import Member from './member/Member';
import MemberDetail from './member/MemberDetail';

const {Content} = Layout;

const Main = () => {
  const selectedMenu = useSelector((state) => state.menu.value);

  return (
    <Layout>
    <ClientHeader/>
    <Layout>
      <Navigation/>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>{selectedMenu[0]}</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedMenu[1]}</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path='/bbs'                element={<Bbs/>}/>
            <Route path="/qaBoard"            element={<QaBoard/>}></Route>
            <Route path="/notice"             element={<Notice/>}></Route>
            <Route path="/member"             element={<Member/>}></Route>
            <Route path="/member/detail/:id"      element={<MemberDetail/>}></Route>

            
          </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
};

export default Main;
