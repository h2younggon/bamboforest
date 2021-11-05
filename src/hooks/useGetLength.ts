import { useMemo } from "react";
import useGetMemo from "./useGetMemo";

export default function useGetLength() {
  const memoList = useGetMemo();
  
  return useMemo(() => memoList.length, [memoList]);
}