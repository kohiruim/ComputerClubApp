import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared";
import { getQuizzesInDataBase } from "@/entities";

export const useGetQuizzesData = () => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(state => state.quizSlice.quizzesList.limit);

  useEffect(() => {
    dispatch(getQuizzesInDataBase({ itemLimit: limit }));
  }, [dispatch, limit]);
};
