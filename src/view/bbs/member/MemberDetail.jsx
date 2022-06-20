import React, {useState} from 'react';
import {Form, Input, InputNumber, Button, Row, Col, DatePicker, Select} from 'antd';
import { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../../../api/axiosInit";
import moment from "moment";
const { Option } = Select;

export default function MemberDetail() {

    const {id} = useParams();

    const navigate = useNavigate();

    const genderList = ['선택', '남자', '여자'];
    const ruleList = ['선택', '일반', '관리자'];

    const [user, setUser] = useState({
        id : null,
        password : null,
        name : null,
        birthday : null,
        email : null,
        gender : null,
        phoneNum : null,
        address : null,
        addressDtl : null,
        rule : null,
        imageFileNo : null
    });

    useEffect(() => {

        if(id){
            const searchMember = async () => {
                let result = {}
                try{
                    result = await instance.get('http://3.35.218.236/bbs/user',{
                        params: {
                            id: id,
                        }
                    });
                } catch(e){
                    return e;
                }
                return result.data.userList;
            };

            searchMember().then(result => {
                console.log(result);
                setUser(result[0]);
            });
        }

    }, []);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };


    const handleProvinceChange = (value) => {

    }

    return (
        <>
            <Row>
                <Col>
                    <Input placeholder="아이디" value={user.id}/>
                </Col>
                <Col>
                    <Input type="password" placeholder="비밀번호" value={user.password}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input placeholder="이름" value={user.name}/>
                </Col>
                <Col>
                    <DatePicker
                        onChange={onChange}
                        defaultValue={moment('2022-10-12', 'YYYY-MM-DD')}
                        format={'YYYY-MM-DD'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input placeholder="EMAIL" value={user.email}/>
                </Col>
                <Col>
                    <Select
                        defaultValue={genderList[0]}
                        style={{
                            width: 120,
                        }}
                        onChange={handleProvinceChange}
                    >
                        {
                            genderList.map((gender) => (
                                <Option key={gender}>{gender}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input placeholder="연락처" value={user.phoneNum}></Input>
                </Col>
                <Col>
                    <Select
                        defaultValue={ruleList[0]}
                        style={{
                            width: 120,
                        }}
                        onChange={handleProvinceChange}
                    >
                        {
                            ruleList.map((rule) => (
                                <Option key={rule}>{rule}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input placeholder="주소" value={user.address}></Input>
                </Col>
                <Col>
                    <Button>주소찾기</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input placeholder="주소상세" value={user.addressDtl}></Input>
                </Col>
            </Row>
            <Row>
                <Button>저장</Button>
                <Button onClick={() => navigate(-1)}>뒤로가기</Button>
            </Row>
        </>
    );
}