import {Button, Card, Col, Input, Row, Space, Table, Typography} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {instance} from "../../../api/axiosInit";
import { SearchOutlined } from '@ant-design/icons';

  const { Text } = Typography;

  export default function Member() {

    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState({
      id: null,
      name: null
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    /* 화면 로드시 조회 */
    useEffect(() => {

      const searchMember = async (param) => {
        const result = await instance.get('http://3.35.218.236/bbs/user', param);
        setData(result.data.userList);
      }

      searchMember({});
    }, []);

    const onMemberSearch = async () => {

      const param = {
        params :  searchKeyword
      };

      const result = await instance.get('http://3.35.218.236/bbs/user', param);
      setData(result.data.userList);
    }

    const columns = [
      {
        title: 'No',
        dataIndex: 'idx',
        key: 'No'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => <Link to={`/main/member/detail/${id}`}>{id}</Link>,
        key: 'Id'
      },
      {
        title: '성명',
        dataIndex: 'name',
        key: 'Name'
      },
      {
        title: '권한',
        dataIndex: 'rule',
        key: 'Rule'
      }
    ];

    return (
        <div>
          <Row>
            <Col span={24} className="search-form">
              <Input value={searchKeyword.id} placeholder={"아이디"}></Input>
              <Input value={searchKeyword.name} placeholder={"성명"}></Input>
              <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => onMemberSearch()}>조회</Button>
            </Col>
            <Col span={24}>

              <Table
                  columns={columns}
                  dataSource={data}
                  rowSelection={rowSelection}
              />
            </Col>
          </Row>
        </div>
    );
  }