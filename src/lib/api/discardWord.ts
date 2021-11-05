import { db } from "../../firebase";

const COLLECTION_NAME = "discardword";


export async function update(words: string[]) {
  await db.collection(COLLECTION_NAME).doc(
    'F35mkkmLl8Rhmrt2uioB').update({discardWord: words});
}

export async function getAll(): Promise<string[]> {
  const ref = db.collection(COLLECTION_NAME);
  const snapshot = await ref.get();
  const data: any[] = [];
  snapshot.forEach(doc => {
    data.push(...doc.data().discardWord);
  })

  return data as string[];
}