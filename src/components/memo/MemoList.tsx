import Memo from "./Memo";
import styled from "styled-components";
import { MemoType } from "../../lib/api/memo";
import useGetMemo from "../../hooks/useGetMemo";
import media from "../../lib/styles/media";
import React, { useEffect, useState } from "react";
import { delay, divideArray } from "../../lib/utils";

export type MemoListProps = {
  handleToast: () => void;
  isInsert: boolean;
  handleSelectedType: (selectedType:string) => void;
};

function MemoList({ handleToast, isInsert, handleSelectedType }: MemoListProps) {
  const [isToggleMemo, setIsToggleMemo] = useState(false);
  const [firstMemoList, setFirstMemoList] = useState<MemoType[]>([]);
  const [secondMemoList, setSecondMemoList] = useState<MemoType[]>([]);
  const [thridMemoList , setThridMemoList ] = useState<MemoType[]>([]);
  const memoList = useGetMemo(isInsert, isToggleMemo);
  
  useEffect(() => {
    const { divideFirstMemoList, divideSecondMemoList, divideThirdMemoList } = divideArray(memoList);
    setFirstMemoList(divideFirstMemoList);
    setSecondMemoList(divideSecondMemoList);
    setThridMemoList(divideThirdMemoList);
  }, [memoList])

  console.log(firstMemoList, secondMemoList, thridMemoList)

  const handleMemo = async () => {
    handleSelectedType('agree');
    handleToast();
    await delay(2000);
    setIsToggleMemo(() => !isToggleMemo);
  };
  return (
    <MemoContainer>
      <div className="memo_block">
        <ul>
          {firstMemoList.map((memo: MemoType, index: number) => {
            return (
              <li key={index}>
                <Memo memo={memo} index={index} handleMemo={handleMemo} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="memo_block">
        <ul>
          {secondMemoList.map((memo: MemoType, index: number) => {
            return (
              <li key={index}>
                <Memo memo={memo} index={index} handleMemo={handleMemo} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="memo_block">
        <ul>
          {thridMemoList.map((memo: MemoType, index: number) => {
            return (
              <li key={index}>
                <Memo memo={memo} index={index} handleMemo={handleMemo} />
              </li>
            );
          })}
        </ul>
      </div>
    </MemoContainer>
  );
}

const MemoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  gap: 2rem 3rem;
  position: relative;
  width: 100%;

  .memo_block {
    flex-grow: 1;
    flex-basis: calc(100% / 3 - 30px);
    ${media.small} {
      flex-basis: calc(100% - 20px);
    }
  }

  ${media.small} {
    gap: initial;
  }

  ul {
    padding: 0;
    margin: 0;
    transform: translate3d(0px, 0px, 0px);
  }

  li {
    text-decoration: none;
  }
`;

export default React.memo(MemoList);
