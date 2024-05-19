import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IoClose, IoSearch } from "react-icons/io5";
import type { FC, Dispatch, SetStateAction } from "react";
import { type SearchButtonType, useAppDispatch } from "@/shared";
import { makeClientsQuery, setSearchConditions } from "@/entities";

interface Form {
  values: {
    fullname: string;
    username: string;
  };
  reset: () => void;
}

interface Props {
  type: "search" | "reset";
  form: Form;
  setType: Dispatch<SetStateAction<SearchButtonType>>;
}

export const SearchButton: FC<Props> = ({ type, form, setType }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleResetForm = () => {
    form.reset();
    dispatch(setSearchConditions({ fullname: "", username: "" }));
    dispatch(makeClientsQuery({ item: "username", direction: "asc" }));
    setType("search");
  };

  if (type == "search") {
    return (
      <Button
        type="submit"
        variant="outline"
        color="indigo"
        mt="auto"
        leftSection={<IoSearch />}
      >
        {t("search")}
      </Button>
    );
  } else {
    return (
      <Button
        type="reset"
        variant="outline"
        color="indigo"
        mt="auto"
        leftSection={<IoClose />}
        onClick={handleResetForm}
      >
        {t("reset")}
      </Button>
    );
  }
};
