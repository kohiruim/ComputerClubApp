import { Group, TextInput } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import type { SearchButtonType, QueryConditionParams } from "@/shared/type";
import { useAppDispatch } from "@/shared/lib";
import { SearchButton } from "@/shared/ui";
import { searchClientsForm } from "../model";
import { useTranslation } from "react-i18next";

export const SearchClientsForm = () => {
  const { t } = useTranslation();
  const [typeSearchButton, setTypeSearchButton] =
    useState<SearchButtonType>("search");
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: "",
      username: "",
    },
  });

  const handleSubmit = (values: QueryConditionParams) => {
    searchClientsForm(values, dispatch, setTypeSearchButton).catch(
      console.error
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(values => {
        handleSubmit(values);
      })}
    >
      <Group mb="xl">
        <TextInput
          label={t("fullname")}
          key={form.key("fullname")}
          {...form.getInputProps("fullname")}
        />
        <TextInput
          label={t("username")}
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <SearchButton
          type={typeSearchButton}
          form={form}
          setType={setTypeSearchButton}
        />
      </Group>
    </form>
  );
};
