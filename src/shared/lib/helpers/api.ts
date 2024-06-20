import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  type QueryConstraint,
} from "firebase/firestore";
import type {
  UserData,
  QueryConditions,
  Direction,
  KeysUserData,
} from "@/shared/type";
import { db } from "@/shared/config";

const createConditions = (
  searchConditions: QueryConditions
): Array<QueryConstraint> => {
  const conditions: Array<QueryConstraint> = [];

  const entries = Object.entries(searchConditions.conditions);
  if (searchConditions.conditionsType == "nonStrict") {
    entries.forEach(([key, value]) => {
      value && conditions.push(where(key, ">=", value));
      value && conditions.push(where(key, "<=", value + "\uf8ff"));
    });
  } else {
    entries.forEach(([key, value]) => {
      value && conditions.push(where(key, "==", value));
    });
  }

  return conditions;
};

export type ClientsQueryParams = {
  sortedItem?: KeysUserData;
  direction?: Direction;
  searchConditions: QueryConditions;
  tableRowsLimit?: number;
};

export const makeFirebaseQuery = async (
  params: ClientsQueryParams
): Promise<Array<UserData>> => {
  const {
    sortedItem,
    direction,
    tableRowsLimit = 0,
    searchConditions,
  } = params;
  try {
    const elements: Array<UserData> = [];
    const conditions = createConditions(searchConditions);

    const usersQuery = query(
      collection(db, "users"),
      ...conditions,
      ...(sortedItem && direction ? [orderBy(sortedItem, direction)] : []),
      ...(tableRowsLimit ? [limit(tableRowsLimit)] : [])
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
