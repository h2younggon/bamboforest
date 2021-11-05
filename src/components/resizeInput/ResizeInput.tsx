import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { count, create } from "../../lib/api/memo";
import media from "../../lib/styles/media";
import palette from "../../lib/styles/palette";
import * as Sentry from "@sentry/react";
import useGetDiscardWords from "../../hooks/useGetDiscardWords";

export type ResizeInputProps = {
  onChangeIsInsert: () => void;
  isOverScrollY: boolean;
  handleSelectedType: (selectedType: string) => void;
  handleToast: () => void;
};

function ResizeInput({ onChangeIsInsert, isOverScrollY, handleSelectedType, handleToast }: ResizeInputProps) {
  const [content, setContent] = useState("");
  const [areaHeight, setAreaHeight] = useState(0);
  const [areaWidth, setAreaWidth] = useState(0);
  const [toggleInput, setToggleInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const discardWords = useGetDiscardWords();

  useEffect(() => {
    const { current } = textareaRef;
    if (current) {
      current.focus();
      setAreaWidth(current.offsetWidth);
      current.style.height = "auto";
      setAreaHeight(current?.scrollHeight);
      current.style.height = areaHeight.toString() + "px";
      current.style.overflowY = "clip";
    }
  }, [content, areaHeight]);

  const onClick = async () => {
    if (!content) {
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    const splitContent = content.split(' ');
    for (let sc in splitContent) {
      const findWord = discardWords.indexOf(splitContent[sc]);
      
      if (findWord > -1) {
        handleSelectedType('discard');
        handleToast();
        setContent('');
        return;
      }
    }

    try {
      const cnt: number = await count();
      await create({
        content,
        historyCount: cnt + 1,
        agreeCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setContent("");
      onChangeIsInsert();
      handleSelectedType('insert')
      handleToast();
      setAreaHeight(0);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.length > 300) {
      setContent(e.target.value.substring(0, 300));
    }
  };

  const onkeypress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    (isOverScrollY && e) ? setToggleInput(() => !toggleInput) : setToggleInput(false);
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Block isOverScrollY={isOverScrollY}>
        <InputWrap isOverScrollY={isOverScrollY}>
          <InputArea
          aria-label='memo-input'
            placeholder={
              areaWidth < 450
                ? "불편한 상황 혹은 경험을 들려주세요."
                : "여러분의 일상 속 불편했던 점이나 서비스를 이용하기 어려웠던 경험을 적어주세요. (최대 300자)"
            }
            name="content"
            value={content}
            onChange={onChange}
            onKeyPress={onkeypress}
            ref={textareaRef}
          ></InputArea>
          
          <SubmitButton type="button" ref={buttonRef} onClick={onClick}>
            남기기
          </SubmitButton>
        </InputWrap>
      </Block>
    </>
  );
}

const Block = styled.section<{ isOverScrollY: boolean }>`
  display: flex;
  justify-content: center;
  width: ${(props) => props.isOverScrollY ? '' : '100%'};
  margin: ${(props) => props.isOverScrollY ? '' : '0 auto'};
  padding-bottom: ${(props) => (props.isOverScrollY ? "15px" : "")};
  padding-top: ${(props) => (props.isOverScrollY ? "10px" : "")};
  ${media.small && media.medium} {
    width: 100%;
    padding-left: 0;
    max-width: 335px;
  }
`;

const InputWrap = styled.div<{ isOverScrollY: boolean}>`
  position: relative;
  width: ${(props) => props.isOverScrollY ? '78.5rem' : '93rem'};
`;

const InputArea = styled.textarea`
  width: 100%;
  resize: none;
  min-height: 5.8rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.5rem;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 89px;

  &::placeholder {
    color: #808080;
    font-size: 1.5rem;
    font-weight: normal;
  }

  &:focus {
    outline: none;
  }
  ${media.small} {
    padding-left: 12px;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: -2%;
  transform: translate(-50%, -50%);
  width: 6.6rem;
  height: 4.2rem;
  background: ${palette.main0};
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  border: none;
  ${media.small} {
    left: 88%;
  }
  &:active {
    background: #008E8E;
  }
`;

export default ResizeInput;
