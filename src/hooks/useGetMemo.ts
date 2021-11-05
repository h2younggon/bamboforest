import { useEffect, useState } from "react";
import { all, MemoType } from "../lib/api/memo";

export default function useGetMemo(
  isInsert?: boolean,
  isToggleMemo?: boolean,
  isRemove?: boolean,
) {
  const [memoList, setMemoList] = useState<Array<MemoType>>([]);
  
  useEffect(() => {
    const getMemoList = async () => {
      const list = await all();
      list.sort((a, b) => b.updatedAt - a.updatedAt);
      setMemoList(list);
    };
    getMemoList();
  }, [isInsert, isToggleMemo, isRemove]);


  return memoList;
}
