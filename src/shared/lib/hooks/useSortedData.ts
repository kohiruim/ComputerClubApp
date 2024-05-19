import { type SetStateAction, useState, type Dispatch, useEffect } from "react";
import {
  type Direction,
  type KeysUserData,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { makeClientsQuery, setTotalCountUsers } from "@/entities";

interface SortedData {
  direction: Direction;
  setItem: Dispatch<SetStateAction<KeysUserData>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

export const useSortedData = (): SortedData => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(state => state.userSlice.clientsTable.rowsLimit);
  const [item, setItem] = useState<KeysUserData>("username");
  const [direction, setDirection] = useState<Direction>("asc");

  useEffect(() => {
    dispatch(setTotalCountUsers());
    dispatch(makeClientsQuery({ item, direction }));
  }, [item, direction, dispatch, limit]);

  return { direction, setItem, setDirection };
};
