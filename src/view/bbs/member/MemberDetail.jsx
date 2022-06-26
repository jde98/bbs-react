import React, {useState} from 'react';
import {Input, Button, Row, Col, Select, Upload, Modal} from 'antd';
import { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../../../api/axiosInit";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import DaumPostcode from 'react-daum-postcode';
const { Option } = Select;

export default function MemberDetail() {

    const {id} = useParams();

    const navigate = useNavigate();

    const genderList = [
        {
            title : "선택",
            value : ""
        },
        {
            title : "남자",
            value : "1"
        },
        {
            title : "여자",
            value : "2"
        }];

    const ruleList = [
        {
            title : "선택",
            value : ""
        },
        {
            title : "일반",
            value : "1"
        },
        {
            title : "관리자",
            value : "2"
        }];

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

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

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

    const handleProvinceChange = (value, title) => {
        setUser((prevState) => ({
            ...prevState,
            [title] : value
        }));
    }

    const onInputChange = (event, name) =>{

        let value = event.target.value;

        if (name === 'birthday'){/* 생년월일 하이푼 제거 */
            value = value.replace("-", "");
        }

        setUser((prevState) => ({
            ...prevState,
            [name] :  value
        }))
    }

    const onSaveClick = () => {

        console.log(user);

        if(window.confirm("저장하시겠습니까?")){

            if(!memberValidation()){
                return;
            }

            instance.post('http://3.35.218.236/bbs/user', {
                params : user
            });


            window.alert("저장되었습니다.");
            navigate("/main/member");
        }
    }

    const memberValidation = () => {

        if(user.id == null){
            alert("아이디를 입력해주세요");
            return false;
        }
        if(user.password == null){
            alert("비밀번호 입력해주세요");
            return false;
        }
        if(user.name == null){
            alert("이름 입력해주세요");
            return false;
        }
        if(user.birthday == null){
            alert("생년월일을 입력해주세요");
            return false;
        }
        if(user.email == null){
            alert("이메일을 입력해주세요");
            return false;
        }
        if(user.gender == null){
            alert("성별을 선택해주세요");
            return false;
        }
        if(user.phoneNum == null){
            alert("연락처를 입력해주세요");
            return false;
        }
        if(user.address == null){
            alert("주소를 입력해주세요");
            return false;
        }
        if(user.addressDtl == null){
            alert("상세주소를 입력해주세요");
            return false;
        }
        if(user.rule == null){
            alert("권한을 선택해주세요");
            return false;
        }
        return true;
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        console.log(file);

        setFile(file);
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        console.log(fullAddress);

        setUser((prevState) => ({
            ...prevState,
            address: fullAddress
        }));

        setIsModalVisible(false);
    };

    const rowMargin = {
        marginBottom : "5px"
    }

    return (
        <>
            <Row>
                <Col>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action=""
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Col>
                <Col>
                    <Row gutter={15}>
                        <Col>
                            <Input
                                placeholder="아이디"
                                onChange={(event) => onInputChange(event, "id")}
                                value={user.id}
                            />
                        </Col>
                        <Col>
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                onChange={(event) => onInputChange(event, "password")}
                                value={user.password}
                            />
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col>
                            <Input
                                placeholder="이름"
                                onChange={(event) => onInputChange(event, "name")}
                                value={user.name}
                            />
                        </Col>
                        <Col>
                            <Input
                                type="date"
                                onChange={(event) => onInputChange(event, "birthday")}
                                value={user.birthday}
                            />
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col>
                            <Input
                                placeholder="EMAIL"
                                onChange={(event) => onInputChange(event, "email")}
                                value={user.email}
                            />
                        </Col>
                        <Col>
                            <Select
                                defaultValue={genderList[0]}
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => handleProvinceChange(value, "gender")}
                            >
                                {
                                    genderList.map((gender, index) => (
                                        <Option key={index} value={gender.value}>{gender.title}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col>
                            <Input
                                placeholder="연락처"
                                onChange={(event) => onInputChange(event, "phoneNum")}
                                value={user.phoneNum}
                            />
                        </Col>
                        <Col>
                            <Select
                                defaultValue={ruleList[0]}
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => handleProvinceChange(value, "rule")}
                            >
                                {
                                    ruleList.map((rule, index) => (
                                        <Option key={index} value={rule.value}>{rule.title}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col>
                            <Input
                                placeholder="주소"
                                onChange={(event) => onInputChange(event, "address")}
                                value={user.address}
                                disabled={true}
                            />
                        </Col>
                        <Col>
                            <Button onClick={() => setIsModalVisible(true)}>주소찾기</Button>
                        </Col>
                    </Row>
                    <Row gutter={15} className={rowMargin}>
                        <Col>
                            <Input placeholder="주소상세"
                                   onChange={(event) => onInputChange(event, "addressDtl")}
                                   value={user.addressDtl}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={15}>
                <Button onClick={() => onSaveClick()}>저장</Button>
                <Button onClick={() => navigate(-1)}>뒤로가기</Button>
            </Row>

            <Modal title="주소찾기" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
                <DaumPostcode
                    onComplete={handleComplete}
                />
            </Modal>
        </>
    );
}