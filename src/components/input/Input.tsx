import React from "react";

export type InputProps = {
  width: number | string;
  height: number | string;
  placeholder?: string;
  onChangeKeywordHandler: React.ChangeEventHandler;
  inputRef: React.Ref<HTMLInputElement>
}

function Input({width, height, placeholder, onChangeKeywordHandler, inputRef }: InputProps) {
  return (
    <input 
      placeholder={placeholder} 
      style={{width, height, marginRight: '30px'}}
      onChange={onChangeKeywordHandler}
      ref={inputRef}
    />
  )
}

export default Input;