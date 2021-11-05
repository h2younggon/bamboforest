import { db } from "../../firebase";

const COLLECTION_NAME = "memo";

export type MemoType = {
  id?: string;
  content: string;
  historyCount: number;
  agreeCount: number;
  createdAt: any;
  updatedAt: any;
};

export async function count() {
  const querySnapshot = await (await db.collection(COLLECTION_NAME).get()).size;
  return querySnapshot;
}

export async function update(id: string, memo: MemoType): Promise<MemoType> {
  await db.collection(COLLECTION_NAME).doc(id).update(memo);

  return {
    id: id,
    ...memo,
  } as MemoType;
}

export async function create(memo: MemoType): Promise<MemoType> {
  const docRef = await db.collection(COLLECTION_NAME).add(memo);

  return {
    id: docRef.id,
    ...memo,
  } as MemoType;
}

export async function remove(id: string) {
  await db.collection(COLLECTION_NAME).doc(id).delete();
}

export async function all(): Promise<Array<MemoType>> {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const data: Array<any> = [];

  // eslint-disable-next-line array-callback-return
  snapshot.docs.map((_data) => {
    data.push({
      ..._data.data(),
      id: _data.id,
      createdAt: _data.data().createdAt.toDate(),
      updatedAt: _data.data().updatedAt.toDate(),
    });
  });

  return data as Array<MemoType>;
}
