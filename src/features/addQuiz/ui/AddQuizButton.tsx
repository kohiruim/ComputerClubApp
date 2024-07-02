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
import { useAppDispatch, useAppSelector } from "@/shared";
import { useTranslation } from "react-i18next";
import { MdUpload } from "react-icons/md";
import { addQuiz, getQuizzesInDataBase, selectNewQuiz } from "@/entities";

interface Values {
  title: string;
  time: string;
  image: File | null;
}

export const AddQuizButton = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectNewQuiz);

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
    close();
  };

  const handleAddQuiz = async (values: Values) => {
    await dispatch(addQuiz(values));
    closeModal();
    dispatch(getQuizzesInDataBase({ itemLimit: 21 }));
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
            leftSection={<MdUpload width={rem(18)} height={rem(18)} />}
            required
            {...form.getInputProps("image")}
          />
          <Flex justify="flex-end" p={"md"}>
            <Button type="submit" color="indigo" loading={isLoading}>
              {t("Add")}
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
