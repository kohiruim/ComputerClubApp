import type { Dispatch, SetStateAction } from "react";
import type {
  SearchButtonType,
  AppDispatch,
  QueryConditionParams,
} from "@/shared/type";
import { makeClientsQuery, setSearchConditions } from "@/entities/user";

export const searchClientsForm = async (
  values: QueryConditionParams,
  dispatch: AppDispatch,
  setTypeSearchButton: Dispatch<SetStateAction<SearchButtonType>>
): Promise<void> => {
  if (values.username || values.fullname) {
    dispatch(setSearchConditions(values));
    await dispatch(
      makeClientsQuery({ sortedItem: "username", direction: "asc" })
    );
    setTypeSearchButton("reset");
  }
};
