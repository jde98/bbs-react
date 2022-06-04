import React from 'react';
import "../../assets/antd.css"
import { Layout, Breadcrumb } from 'antd';

import ClientHeader from '../../component/client/layout/ClientHeader';
import Navigation from '../../component/client/layout/Navigation';

import { Route, Routes } from 'react-router-dom';
import Bbs from '../client/Bbs';
import QaBoard from '../client/QaBoard';
import Notice from '../client/Notice';
import { useSelector } from 'react-redux';
import Member from './Member';
import MemberDetail from './MemberDetail';

const {Content} = Layout;

const Main = () => {

  //const { menu } = useSelector(state => state.menu);
  
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
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
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
