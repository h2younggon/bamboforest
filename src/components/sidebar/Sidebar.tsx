import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "../sidebarItem/SidebarItem";
import logo from '../../assets/images/logo.png';
import { useCallback, useEffect, useState } from "react";

function Sidebar() {
  const [toDay, setToDay] = useState<Date | null>(null);
  const [isAMPM, setIsAMPM] = useState<string | null>(null);
  const now = useCallback(() => new Date(), []);

  const calcAMPM = useCallback(() => {
    if (toDay?.getHours()! >= 12 && toDay?.getHours()! <= 24) {
      setIsAMPM('오후');
    } else {
      setIsAMPM('오전');
    }
  }, [toDay])

  useEffect(() => {
    const interval = setInterval(() => {
      setToDay(now);
      calcAMPM();
    }, 1000)
    return () => clearInterval(interval);
  }, [now, calcAMPM])

 
  
  return (
    <Wrapper>
      <div className="logo_block">
        <div className="image_block">
          <Link to="/admin">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <span>대나무숲</span>
      </div>
      <TimeBlock>
        <p>{toDay?.getFullYear()}년</p>
        <p>{toDay?.getMonth()! + 1}월 {toDay?.getDate()}일</p>
        <p>{isAMPM} {toDay?.getHours()}:{toDay?.getMinutes()}</p>
      </TimeBlock>
      <ul>
        <SidebarItem to={'/admin/memo'} text={'메모 관리'} />
        <SidebarItem to={'/admin/filter'} text={'필터링 관리'} />
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .logo_block {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
  .image_block {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

const TimeBlock = styled.div`
  margin: 35px 0;
  p {
    font-size: 34px;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
`;
export default Sidebar;