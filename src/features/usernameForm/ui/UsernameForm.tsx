import { useContext } from "react";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserContext } from "@/shared";
import { handleSubmit, usernameRegex } from "../model";

export const UsernameForm = () => {
  const { userData } = useContext(UserContext);

  const form = useForm({
    initialValues: { username: "" },
    validate: {
      username: value =>
        !usernameRegex.test(value) ? "невалидный никнейм" : null,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        handleSubmit(form.values.username, userData);
      })}
    >
      <TextInput
        placeholder="Username"
        key={form.key("username")}
        style={{ width: "420px" }}
        {...form.getInputProps("username")}
      />
      <Button type="submit" mt="sm" color="violet" fullWidth>
        Submit
      </Button>
    </form>
  );
};
