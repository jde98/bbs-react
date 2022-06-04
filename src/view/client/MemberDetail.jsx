import { Row } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

  export default function MemberDetail() {

    
	  const { id } = useParams();
    
    useEffect(() => {

      const param = {
        id : id
      }

      console.log(param);

      axios.get('http://3.35.218.236/bbs/user', JSON.stringify(param)).then((Response)=>{
          console.log(Response.data);

      }).catch((Error)=>{
          console.log(Error);
      });


    },[]);


    return (
      <div>
        <Row>

        </Row>
      </div>
    );
  }