import { MemoType } from "./api/memo";

function dateFormat(date: any) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
}

function divideArray(array: MemoType[]) {
  const divideFirstMemoList: MemoType[] = [];
  const divideSecondMemoList: MemoType[] = [];
  const divideThirdMemoList: MemoType[] = [];
  let arrayCount = 0;

  for (let i = 0; i < array.length; i++) {
    if (arrayCount === 0) {
      divideFirstMemoList.push(array[i]);
    }
    if (arrayCount === 1) {
      divideSecondMemoList.push(array[i]);
    }
    if (arrayCount === 2) {
      divideThirdMemoList.push(array[i]);
    }
    arrayCount++;
    if (arrayCount === 3) {
      arrayCount = 0;
    }
  }

  return { divideFirstMemoList, divideSecondMemoList, divideThirdMemoList };
}

function delay(ms: number){
  return new Promise(resolve =>setTimeout(resolve,ms));
}

export { dateFormat, divideArray, delay };
