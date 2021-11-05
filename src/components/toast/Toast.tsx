import styled, { css } from "styled-components";
import { discardWord, agreeWord, inserWord } from "../../constant/toastSentence";
import media from "../../lib/styles/media";
import palette from "../../lib/styles/palette";

export type ToastProps = {
  handleToast: () => void;
  isOverScrollY: boolean;
  isTop: boolean;
  seletedType: string;
};

function Toast({ handleToast, isOverScrollY, isTop, seletedType }: ToastProps) {
  const onClickScrollToTop = () => {
    handleToast();
    window.scrollTo(0, 0);
  };

  if (seletedType === 'discard') {
    return (
      <ToastBlock isOverScrollY={isOverScrollY} onClick={onClickScrollToTop} seletedType={seletedType}>
        <p>{ discardWord }</p>
        <span><a href="https://uniher.notion.site/eda8604e37cc4e3591fee727711b58c6" rel="noreferrer" target="_blank">눌러서 정책 확인</a></span>
    </ToastBlock>
    )
  }

  if (seletedType === 'insert') {
    return (
      <ToastBlock isOverScrollY={isOverScrollY} onClick={onClickScrollToTop} seletedType={seletedType}>
        <p>{ inserWord }</p>
      {!isTop && (
        <span>눌러서 확인</span>
      )}
    </ToastBlock>
    )
  }

  return (
    <ToastBlock isOverScrollY={isOverScrollY} onClick={onClickScrollToTop} seletedType={seletedType}>
      <p>{ agreeWord }</p>
    {!isTop && (
      <span>눌러서 확인</span>
    )}
  </ToastBlock>
  )
}

const ToastBlock = styled.div<{isOverScrollY: boolean, seletedType: string}>`
  position: ${(props) => props.isOverScrollY ? 'fixed' : 'absolute'};
  left: 50%;
  top: ${(props) => props.isOverScrollY ? '9%' : ''};
  transform: translate(-50%, 0);
  margin-top: ${(props) => props.isOverScrollY ? '10px' : '30px'};
  width: 485px;
  z-index: 100;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 12px 30px;
  flex-direction: row;
  ${(props) => {
    if (props.seletedType === 'discard') {
      if (!props.isOverScrollY)  {
      return css`
        width: 798px;
        margin-top: -119px;
      `;
      } else {
        return css`
          width: 798px;
        `;
      }
    }
  }}
  ${media.small} {
    flex-direction: column;
    width: 306px;
    text-align: center;
    top: ${(props) => props.isOverScrollY ? '20%' : ''};
  }

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 160%;
    margin: 0 auto;
    ${media.small} {
      font-size: 13px;
    }
  }

  span {
    border: none;
    background: none;
    font-size: 16px;
    color: #c0e6a8;
    margin-left: 20px;
    line-height: 160%;
    cursor: pointer;
    a {
      text-decoration: none;
      color: ${palette.main1};
    }
    ${media.small} {
      font-size: 13px;
      margin-left: initial;
      text-align: center;
    }
  }
`;

export default Toast;
