import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Text,
  Flex,
  FileInput,
  rem,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addQuiz } from "../model/addQuiz";
import { useAppDispatch } from "@/shared";
import { useTranslation } from "react-i18next";
import { MdUpload } from "react-icons/md";
import { useState } from "react";

interface Values {
  title: string;
  time: string;
  image: File | null;
}

export const AddQuizButton = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      time: "",
      image: null,
    },
  });

  const closeModal = () => {
    form.reset();
    setIsLoading(false);
    close();
  };

  const handleAddQuiz = async (values: Values) => {
    setIsLoading(true);
    await addQuiz(values, dispatch, closeModal);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={t("Add Quiz")}
        centered
      >
        <form
          onSubmit={form.onSubmit(values => {
            handleAddQuiz(values);
          })}
        >
          <TextInput
            withAsterisk
            label={t("Name of the quiz")}
            placeholder={t("Name of the quiz")}
            key={form.key("title")}
            mb={20}
            {...form.getInputProps("title")}
          />
          <NumberInput
            withAsterisk
            label={t("Time of the quiz")}
            placeholder={t("Time of the quiz")}
            key={form.key("time")}
            mb={20}
            allowDecimal={false}
            allowNegative={false}
            hideControls
            rightSection={<Text color="dimmed">min</Text>}
            {...form.getInputProps("time")}
          />
          <FileInput
            accept="image/png,image/jpeg"
            label={t("Add picture")}
            leftSection={
              <MdUpload style={{ width: rem(18), height: rem(18) }} />
            }
            required
            {...form.getInputProps("image")}
          />
          <Flex justify="flex-end" p={"md"}>
            <Button type="submit" color="indigo" loading={isLoading}>
              Add
            </Button>
          </Flex>
        </form>
      </Modal>

      <Button color="indigo" onClick={open}>
        {t("Add Quiz")}
      </Button>
    </>
  );
};
