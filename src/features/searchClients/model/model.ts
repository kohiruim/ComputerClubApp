import type { Dispatch, SetStateAction } from "react";
import type {
  SearchButtonType,
  AppDispatch,
  SearchConditionsUsers,
} from "@/shared";
import { setSearchConditions, makeClientsQuery } from "@/entities";

export const searchClientsForm = async (
  values: SearchConditionsUsers,
  dispatch: AppDispatch,
  setTypeSearchButton: Dispatch<SetStateAction<SearchButtonType>>
): Promise<void> => {
  if (values.username || values.fullname) {
    dispatch(setSearchConditions(values));
    await dispatch(makeClientsQuery({ item: "username", direction: "asc" }));
    setTypeSearchButton("reset");
  }
};
