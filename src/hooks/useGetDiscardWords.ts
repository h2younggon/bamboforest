import { useEffect, useState } from "react";
import { getAll } from "../lib/api/discardWord";

export default function useGetDiscardWords(isDelete?: boolean, isSearch?: boolean) {
  const [discardWords, setDiscardWords] = useState<string[]>([]);
  
  useEffect(() => {
    const getDiscardWords = async () => {
      const discardWords = await getAll();
      setDiscardWords(discardWords);
    }
    getDiscardWords();
  }, [isDelete, isSearch])

  return discardWords;
}