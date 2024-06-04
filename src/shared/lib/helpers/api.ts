import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  type QueryConstraint,
} from "firebase/firestore";
import {
  db,
  type UserData,
  type SearchConditionsUsers,
  type Direction,
  type KeysUserData,
} from "@/shared";

const createConditions = (
  searchConditions: SearchConditionsUsers
): Array<QueryConstraint> => {
  const conditions: Array<QueryConstraint> = [];

  const entries = Object.entries(searchConditions);
  entries.forEach(([key, value]) => {
    value && conditions.push(where(key, ">=", value));
    value && conditions.push(where(key, "<=", value + "\uf8ff"));
  });

  return conditions;
};

export type ClientsQueryParams = {
  item: KeysUserData;
  direction: Direction;
  searchConditions: SearchConditionsUsers;
  tableRowsLimit: number;
};

export const makeSortedQuery = async (
  params: ClientsQueryParams
): Promise<Array<UserData>> => {
  const { item, direction, searchConditions, tableRowsLimit } = params;
  try {
    const elements: Array<UserData> = [];
    const conditions = createConditions(searchConditions);

    const usersQuery = query(
      collection(db, "users"),
      ...conditions,
      orderBy(item, direction),
      limit(tableRowsLimit)
    );
    const querySnapshot = await getDocs(usersQuery);

    querySnapshot.forEach(doc => {
      const element = doc.data() as UserData;
      elements.push(element);
    });

    return elements;
  } catch (error) {
    console.error(error);
    return [];
  }
};
