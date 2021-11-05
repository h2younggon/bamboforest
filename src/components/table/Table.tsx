import styled from "styled-components";
import { MemoType, remove } from "../../lib/api/memo";
import { dateFormat } from "../../lib/utils";
import * as Sentry from "@sentry/react";
import { useCallback, useEffect, useState } from "react";
import useGetMemo from "../../hooks/useGetMemo";
import { update } from "../../lib/api/discardWord";

export type TableProps = {
  keyword?: string;
  isSearch?: boolean;
  columns: string[];
  tableType: string;
  discardWords?: string[];
  deleteHandler: () => void;
}

function Table({keyword, isSearch, columns, tableType, discardWords, deleteHandler}: TableProps) {
  const [filteredMemoList, setFilteredMemoList] = useState<MemoType[] | null>(null);
  const [isRemove, setIsRemove] = useState(false);
  const memoList = useGetMemo(isRemove);
  
  const handleMemoList = useCallback(() => {
    if (isSearch && keyword) {
      setFilteredMemoList(memoList.filter(memo => memo.content.includes(keyword)));
    } else {
      setFilteredMemoList(null);
    }
  }, [isSearch, keyword, memoList])
  
  useEffect(() => {
    handleMemoList();
  }, [handleMemoList, isRemove])

  const onClick = async (memo: MemoType) => {
    if (memo.id) {
      try {
        await remove(memo.id);
        setIsRemove(() => !isRemove);
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  }

  const handleDeleteButton = async (word: string) => {
    if (word) {
      const filterDiscardWords = discardWords?.filter(_word => _word !== word);
      if (filterDiscardWords && filterDiscardWords.length > 0) {
        await update(filterDiscardWords);
        deleteHandler();
      }
    }
  }
 
  if (tableType === 'memo' && filteredMemoList && filteredMemoList.length > 0) {
    return (
      <StyleTable>
      <thead>
        <tr>
          {
            columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredMemoList?.map((memo, index) => {
            return (
            <tr key={index}>
              <td>{dateFormat(memo.createdAt)}</td>
              <td>{memo.content}</td>
              <td>{memo.agreeCount}</td>
              <td><button onClick={() => onClick(memo)}>삭제하기</button></td>
            </tr>
            )    
          })
        }
      </tbody>
    </StyleTable>
    )
  }

  return (
    <StyleTable>
      <thead>
        <tr>
        {
            columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          tableType === 'memo' && memoList.map((memo, index) => {
            return (
            <tr key={index}>
              <td>{dateFormat(memo.createdAt)}</td>
              <td>{memo.content}</td>
              <td>{memo.agreeCount}</td>
              <td><button onClick={() => onClick(memo)}>삭제하기</button></td>
            </tr>
            )    
          })
        }
        {
          tableType === 'filter' && discardWords && discardWords.map((word, index) => {
            return (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{word}</td>
              <td style={{ textAlign: 'center' }}><button onClick={() => handleDeleteButton(word)}>삭제하기</button></td>
            </tr>
            )    
          })
        }
      </tbody>
    </StyleTable>
  )
}

const StyleTable = styled.table`
  width: calc(100% - 20px);
  margin-top: 40px;
  border-collapse: collapse;
  thead {
    background-color: #DDDEDE;
    height: 50px;
    th {
      font-size: 13px;
    }
  }
  tbody {
    td {
      font-size: 13px;
      padding-bottom: 17px;
    }
    td:nth-child(2) {
      max-width: 520px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    td:nth-child(3) {
      text-align: center;
    }
    td:nth-child(4) {
      text-align: center;
    }
  }
`;

export default Table;