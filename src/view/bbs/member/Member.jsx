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

    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);

      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    /* 화면 로드시 조회 */
    useEffect(() => {

      const searchMember = async (param) => {
        let result = await instance.get('/user', param);

        result = result.data.userList.map((value, index) => {
          value.key = value.idx;
          return value;
        });

        setData(result);
      }

      searchMember({});
    }, []);

    const onMemberSearch = async () => {

      const param = {
        params :  searchKeyword
      };

      let result = await instance.get('/user', param);

      result = result.data.userList.map((value, index) => {
        value.key = value.idx;
        return value;
      });

      setData(result);
    }

    const columns = [
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

    const onDeleteClick = async () => {
      if(window.confirm("삭제하시겠습니까?")){
        if(selectedRowKeys.length == 0){
          window.alert("선택된 항목이 없습니다.");
        } else {
          let delRow = [];

          selectedRowKeys.forEach((value, index) => {
            let obj = {
              idx : value
            };

            delRow.push(obj);
          });

          const result = await instance.delete("/user", {
            data : delRow
          });

          if(result.status === 200){
            window.alert("삭제되었습니다.");
            onMemberSearch();
          }
        }
      }
    }

    return (
        <div>
          <Row>
            <Col span={24} className="search-form">
              <Input
                  onChange={(e) => onSearchInputChange(e, "id")}
                  placeholder="아이디"
                  onKeyPress={(e) => e.key === "Enter"? onMemberSearch(): null}></Input>
              <Input
                  onChange={(e) => onSearchInputChange(e, "name")}
                  placeholder="성명"
                  onKeyPress={(e) => e.key === "Enter"? onMemberSearch(): null}></Input>
              <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => onMemberSearch()}>조회</Button>
            </Col>
            <Col className="btn-form">
              <Button icon={<MinusOutlined />} onClick={() => onDeleteClick()}>삭제</Button>
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