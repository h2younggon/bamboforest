import styled, { css, keyframes } from "styled-components";
import agree from "../../assets/icons/agree.png";
import fill_agree from '../../assets/icons/fill_agree.png';
import { dateFormat, delay } from "../../lib/utils";
import palette from "../../lib/styles/palette";
import { MemoType, update } from "../../lib/api/memo";
import { useState } from "react";
import media from "../../lib/styles/media";
import * as Sentry from "@sentry/react";

type MemoProps = {
  memo: MemoType;
  index: number;
  handleMemo: () => void;
};

function Memo({ memo, index, handleMemo }: MemoProps) {
  const [isAgree, setIsAgree] = useState(false);

  const onClickThumb = async (data: MemoType) => {
    try {
      if (data.id) {
        setIsAgree(true);
        await update(data.id, {
          ...data,
          agreeCount: data?.agreeCount + 1,
          updatedAt: new Date(),
        });
        handleMemo();
        await delay(2000);        
        setIsAgree(false);
      }
    } catch (error) {
      setIsAgree(false);
      handleMemo();
      Sentry.captureException(error);
    }
  };

  return (
    <MemoWrap index={index}>
      <div>
        <MemoHeader>
          <p>{memo.historyCount}번째 불편</p>
          <p>{dateFormat(memo.createdAt)}</p>
        </MemoHeader>
      </div>

      <Content>{memo.content}</Content>

      <BottomBlock onClick={() => onClickThumb(memo)}>
        <div className="image_wrap">
          <ButtonImage isAgree={isAgree} />
        </div>
        <ButtonText isAgree={isAgree}>공감해요 {memo.agreeCount}</ButtonText>
      </BottomBlock>
    </MemoWrap>
  );
}

const MemoWrap = styled.article<{ index: number }>`
  display: flex;
  height: auto;
  padding: 20px;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 1.5rem;
  background-color: ${(props) =>
    props.index % 2 === 0 ? `${palette.main1}` : `${palette.main2}`};
`;

const MemoHeader = styled.div`
  p {
    font-size: 1.3rem;
    line-height: 150%;
    color: #808080;
    margin: 0;
  }
`;

const Content = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 160%;
  word-break: break-all;
  color: #222222;
  ${media.small} {
    font-size: 1.5rem;
  }
`;

const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .image_wrap {
    width: 2.2rem;
    height: 2.0rem;
    margin-right: 8px;
  }
`;

const ButtonImage = styled.div<{ isAgree: boolean }>`
  width: 100%;
  height: 100%;
  background-image: url(${agree});
  background-size: 100% 100%;
  ${(props) => {
    if (props.isAgree) {
      return css`
        animation: ${filterImage} 5s linear;
      `;
    }
  }}
`;

const ButtonText = styled.span<{ isAgree: boolean }>`
  font-size: 1.3rem;
  color: #808080;
  ${(props) => {
    if (props.isAgree) {
      return css`
        animation: ${chaneColor} 5s linear;
      `;
    }
  }};
`;

const filterImage = keyframes`
  from {
    background-image: url(${fill_agree});
  }
  to {
    background-image: url(${agree});
  }
`;

const chaneColor = keyframes`
  from {
    color: #01A7A7;
    font-weight: bold;
  }
  to {
    color: #808080;
  }
`;

export default Memo;
