import styled from "styled-components";
import logo from "../assets/images/logo.png";
import MemoList from "../components/memo/MemoList";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ResizeInput from "../components/resizeInput/ResizeInput";
import Toast from "../components/toast/Toast";
import { useScroll } from "../hooks/useScroll";
import media from "../lib/styles/media";
import useGetLength from "../hooks/useGetLength";
import palette from "../lib/styles/palette";
import useGetWindowSize from "../hooks/useGetWindowSize";

function MainPage() {
  const [isInsert, setIsInsert] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [isOverScrollY, setIsOverScrollY] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const memoLength = useGetLength();
  const navRef = useRef(null);
  const { isOver } = useScroll(navRef);
  const windowSize = useGetWindowSize();

  // toast 
  const handleToast = useCallback(() => {
    setIsToast(() => !isToast);
  }, [isToast]);

  // write 
  const onChangeIsInsert = useCallback(() => {
    setIsInsert(() => !isInsert);
  }, [isInsert]);

  const handleSelectedType = useCallback((selectedType: string) => {
    setSelectedType(selectedType);
  }, [])

  // toast auto close
  const timer = useCallback(() => {
    if (isToast) {
      setTimeout(() => setIsToast(() => !isToast), 2000);
    }
  }, [isToast])
  
  useEffect(() => {
    window.scrollY === 0 ? setIsTop(true) : setIsTop(false);
    if (memoLength >= 16) {
      setIsOverScrollY(() => isOver);
      timer();
    }
  }, [isOver, memoLength, isTop, timer]);

  return (
    <>
    {(isToast && selectedType !== 'discard') && <Toast handleToast={handleToast} isOverScrollY={isOverScrollY} isTop={isTop} seletedType={selectedType} />}
      <Block isOverScrollY={isOverScrollY} ref={navRef}>
        <div className="nav">
          <div className="logo_block">
            <LogoImage src={logo} alt="log" isOverScrollY={isOverScrollY} />
            <span className="title">대나무숲</span>
          </div>
          <span className="sub_title">
            누군가의 어려움이 보인다면 대신 이야기해주세요 ✍️
          </span>
          <span className="sub_title">
            소중한 사람을 위한 의견이 함께하는 내일을 만듭니다
          </span>
          <ResizeInput
            onChangeIsInsert={onChangeIsInsert}
            handleSelectedType={handleSelectedType}
            isOverScrollY={isOverScrollY}
            handleToast={handleToast}
          />
        </div>
        {(isToast && selectedType === 'discard') && <Toast handleToast={handleToast} isOverScrollY={isOverScrollY} isTop={isTop} seletedType={selectedType} />}
        <PsBlock>
          {
            windowSize.width > 450 ? (
              <p>* 건전한 커뮤니티 문화를 위해 욕설/비방 등 정책에 위반된 글은 남길 수 없습니다.</p>
            ) : (
              <p>* 욕설/비방 글은 작성할 수 없습니다.</p>
            )
          }
          <a href="https://uniher.notion.site/eda8604e37cc4e3591fee727711b58c6" rel="noreferrer" target="_blank"> 정책 확인하기</a>
        </PsBlock>
      </Block>
      
      <Wrapper>
        <MemoList
          handleToast={handleToast}
          isInsert={isInsert}
          handleSelectedType={handleSelectedType}
        />
      </Wrapper>
    </>
  );
}

const Block = styled.nav<{ isOverScrollY: boolean }>`
  position: relative;
  .nav {
    display: flex;
    flex-direction: ${(props) => (props.isOverScrollY ? 'row' : 'column')};
    padding-top: ${(props) => (props.isOverScrollY ? "" : "12rem")};
    position: ${(props) => (props.isOverScrollY ? "fixed" : "")};
    top: ${(props) => (props.isOverScrollY ? 0 : "")};
    left: ${(props) => (props.isOverScrollY ? 0 : "")};
    right: ${(props) => (props.isOverScrollY ? 0 : "")};
    z-index: 10;
    transition: all 300ms ease-in-out;
    backdrop-filter: ${(props) => (props.isOverScrollY ? "blur(10px)" : "")};
    background: ${(props) =>
      props.isOverScrollY ? "rgba(4, 1, 12, 0.6)" : ""};
    justify-content: ${(props) => props.isOverScrollY ? 'center' : ''};
    align-items: ${(props) => props.isOverScrollY ? 'center' : ''};

    ${media.small} {
      flex-direction: column;
      padding-top: 25px;
    }
  }

  .logo_block {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin-right: ${(props) => props.isOverScrollY ? '21px' : ''};
    font-weight: 700;
    font-size: ${(props) => (props.isOverScrollY ? "1.8rem" : "3.6rem")};
    text-align: center;
    color: #ffffff;
  }
  .sub_title {
    position: relative;
    font-size: 1.8rem;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
    display: ${(props) => (props.isOverScrollY ? "none" : "block")};
    ${media.small} {
      font-size: 13px;
    }
  }

  .sub_title:nth-child(2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .sub_title:nth-child(3) {
    margin-bottom: 6rem;
  }
`;

const LogoImage = styled.img<{ isOverScrollY: boolean }>`
  width: ${(props) => (props.isOverScrollY ? "3.3rem" : "3.9rem")};
  height: ${(props) => (props.isOverScrollY ? "1.8rem" : "3rem")};
  padding-right: 1rem;
`;

const PsBlock = styled.div`
  display: flex;
  max-width: 93rem;
  margin: 10px auto;
  align-items: center;
  ${media.small} {
    justify-content: center;
  }
  p {
    text-align: left;
    color: #ffffff;
    font-size: 13px;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${palette.main1};
    font-size: 13px;
    padding-left: 5px;
  }
`;

const Wrapper = styled.section`
  padding-top: 60px;
  ${media.small} {
    padding-top: 14px;
  }
  max-width: 93rem;
  margin: 0 auto;
`;

export default React.memo(MainPage);
