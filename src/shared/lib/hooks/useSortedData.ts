import { type SetStateAction, useState, type Dispatch, useEffect } from "react";
import type { Direction, KeysUserData } from "@/shared/type";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import {
  makeClientsQuery,
  setTotalCountUsers,
  selectRowsLimit,
} from "@/entities/user";

interface SortedData {
  direction: Direction;
  setSortedItem: Dispatch<SetStateAction<KeysUserData>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

export const useSortedData = (): SortedData => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(selectRowsLimit);
  const [sortedItem, setSortedItem] = useState<KeysUserData>("username");
  const [direction, setDirection] = useState<Direction>("asc");

  useEffect(() => {
    dispatch(setTotalCountUsers());
    dispatch(makeClientsQuery({ sortedItem, direction }));
  }, [sortedItem, direction, dispatch, limit]);

  return { direction, setSortedItem, setDirection };
};
