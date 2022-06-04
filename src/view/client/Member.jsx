import { Col, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

  export default function Member() {

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://3.35.218.236/bbs/user',{}).then((Response)=>{
          console.log(Response.data);
          setData(Response.data.userList);
      }).catch((Error)=>{
          console.log(Error);
      });
    },[]);

    const columns = [
      {
        title: 'No',
        dataIndex: 'idx',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => <Link to={`/main/member/detail/${id}`}>{id}</Link>
      },
      {
        title: '성명',
        dataIndex: 'name',
      },
      {
        title: '권한',
        dataIndex: 'rule',
      } 
    ];
    
    return (
      <div>
        <Row>
          <Col span={24}>
            
          </Col>
          <Col span={24}>
            
            <Table
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
      </div>
    );
  }