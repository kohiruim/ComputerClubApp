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
import { useAppDispatch, useAppSelector } from "@/shared";
import { MdUpload } from "react-icons/md";

interface Values {
  title: string;
  time: string;
  image: string;
}

export const AddQuizButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.quizSlice.isLoading);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      time: "",
      image: "",
    },
  });

  const closeModal = () => {
    form.reset();
    close();
  };

  const handleAddQuiz = (values: Values) => {
    addQuiz(values, dispatch, close);
  };

  return (
    <>
      <Modal opened={opened} onClose={closeModal} title="Add Quiz" centered>
        <form
          onSubmit={form.onSubmit(values => {
            handleAddQuiz(values);
          })}
        >
          <TextInput
            withAsterisk
            label="Name of the quiz"
            placeholder={"Name of the quiz"}
            key={form.key("title")}
            mb={20}
            {...form.getInputProps("title")}
          />
          <NumberInput
            withAsterisk
            label="Time of the quiz"
            placeholder="Time of the quiz"
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
            label="Add picture"
            leftSection={
              <MdUpload style={{ width: rem(18), height: rem(18) }} />
            }
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
        Add Quiz
      </Button>
    </>
  );
};
