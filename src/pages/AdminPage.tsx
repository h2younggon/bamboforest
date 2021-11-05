import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import Input from "../components/input/Input";
import AppLayout from "../components/layout/AppLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Table from "../components/table/Table";
import useGetDiscardWords from "../hooks/useGetDiscardWords";
import { update } from "../lib/api/discardWord";
import palette from "../lib/styles/palette";

export type MemoAdminPageProps = {
}

function MemoAdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string >('');
  const [isSearch, setIsSearch] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const discardWords = useGetDiscardWords(isSearch, isDelete);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteHandler = () => {
    setIsDelete(() => !isDelete);
  }
  const onClickHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_KEY) {
      setIsAdmin(true);
      window.localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    } else {
      setIsAdmin(false);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password === process.env.REACT_APP_KEY) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }

  const onChangeKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setKeyword(e.target.value);
    }, 800);
  };

  const onClickKeyword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (keyword) {
      setIsSearch(() => !isSearch);
    }
  };

  const addDiscardWordHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newDiscardWords = [...discardWords, keyword];
    await update(newDiscardWords);
    setIsSearch(() => !isSearch);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    setKeyword(prevKeyword => prevKeyword);
  }, [keyword])

  if (!isAdmin || window.localStorage.getItem('isAdmin') === 'false') {
    return (
      <Wrapper>
        <Block>
          <FiledsetForm>
            <legend>Enter Admin Page</legend>
            <StyleInput type="password" onChange={onChange} onKeyPress={onKeypress} />
            <Button onClick={onClickHandler}>로그인</Button>
          </FiledsetForm>
        </Block>
      </Wrapper>
    )
  }

  return (
    <AppLayout>
      <AppLayout.Side>
        <Sidebar />
      </AppLayout.Side>
      <AppLayout.Main>
        <Switch>
          <Route exact path='/admin/memo'>
            <div style={{position: 'relative'}}>
              <Input 
                width={'calc(100% - 20px)'}
                height={'50px'} 
                placeholder={'검색'} 
                onChangeKeywordHandler={onChangeKeywordHandler}
                inputRef={inputRef}
              />
              <StyleButton onClick={onClickKeyword}>검색</StyleButton>
            </div>
            <Table deleteHandler={deleteHandler} keyword={keyword} isSearch={isSearch} tableType={'memo'} columns={['작성일', '내용', '공감수', '삭제']} />
          </Route>
          <Route exact path='/admin/filter'>
            <div style={{position: 'relative'}}>
              <Input 
                width={'calc(100% - 20px)'}
                height={'50px'} 
                placeholder={'추가'} 
                onChangeKeywordHandler={onChangeKeywordHandler}
                inputRef={inputRef}
              />
              <StyleButton onClick={addDiscardWordHandler}>추가</StyleButton>
            </div>
            <Table deleteHandler={deleteHandler} keyword={keyword} isSearch={isSearch} columns={['필터링 단어', '삭제']} tableType={'filter'} discardWords={discardWords} />
          </Route>
        </Switch>
      </AppLayout.Main>
    </AppLayout>
  )
}

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Block = styled.div`
  width: 100%;
`;

const FiledsetForm = styled.fieldset`
  padding: 6px 18px;
  legend {
    color: white;
    font-size: 32px;
    font-weight: bold;
  }
`;

const StyleInput = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 5px;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background-color: ${palette.main2};
`;


const StyleButton = styled.button`
  position: absolute;
  top: 50%;
  right: -2%;
  transform: translate(-50%, -50%);
  border: none;
  color: white;
  background-color: ${palette.main2};
  width: 102px;
  height: 38px;
`;

export default MemoAdminPage;