import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
  
  export default function Notice() {
    const [noticeCount, setNoticeCount] = useState(0);
    const [day, setDay] = useState("");
    
    useEffect(()=>{
      setDay(moment().format('YYYY.MM.DD'));
    },[])

    return (
      <NoticeForm>
        <NoticeTable>
          <NoticeTableHeader>
            <tr>
              <th>번호</th>
              <>제목</>
              <th>날짜</th>
            </tr>
          </NoticeTableHeader>
          <NoticeTableBody>
            <tr>
              <td>{noticeCount}</td>
              <td>공지사항입니다</td>
              <td>{day}</td>
            </tr>
          </NoticeTableBody>
        </NoticeTable>
      </NoticeForm>
    );
  }

  const NoticeForm = styled.div`
  `;

  const NoticeTable = styled.table`
    overflow: hidden;
    width: 100%;
    text-align: center;
  `
  const NoticeTableHeader = styled.thead`
    background-color: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    tr {
      padding: 1rem;
      th {
        position: relative;
        padding: 1rem;
        ::before {
          content: "";
          background-color: #f0f0f0;
          width: 1px;
          position: absolute;
          top: 20%;
          bottom: 20%;
          left: 0;
        }
      }
    }
  `
  const NoticeTableBody = styled.tbody`
 border-bottom: 1px solid #f0f0f0;
 tr {
  td {
    padding: 1rem;
  }
 }
  `