import {Button, Card, Col, Input, Row, Space, Table, Typography} from "antd";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {instance} from "../../../api/axiosInit";
import {MinusOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';

  const { Text } = Typography;

  export default function Member() {

    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState({
      id: "",
      name: ""
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSearchInputChange = (e, name) => {
      setSearchKeyword((prevState) => ({
        ...prevState,
        [name] : e.target.value
      }))
    }

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

    const onAddClick = () => {
      navigate("/main/member/detail");
    };

    return (
        <div>
          <Row>
            <Col span={24} className="search-form">
              <Input
                  onChange={(e) => onSearchInputChange(e, "id")}
                  placeholder="아이디"></Input>
              <Input
                  onChange={(e) => onSearchInputChange(e, "name")}
                  placeholder="성명"></Input>
              <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => onMemberSearch()}>조회</Button>
            </Col>
            <Col className="btn-form">
              <Button icon={<MinusOutlined />}>삭제</Button>
              <Button icon={<PlusOutlined />} onClick={() => onAddClick()}>신규</Button>
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