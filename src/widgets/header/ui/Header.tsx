import type { ChangeEvent } from "react";
import { Container, Group, NativeSelect } from "@mantine/core";
import { MdLanguage } from "react-icons/md";
import i18n from "@/shared/config/i18n";
import { Logo } from "@/shared/assets";
import { InputSearchUsers } from "@/features/searchUsers";
import type { UserData } from "@/shared/type";
import { useAppSelector } from "@/shared/lib";
import { supportedLanguages } from "../lib";
import { selectIsAuth, selectCurrentUser } from "@/entities/user";

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser: UserData = useAppSelector(selectCurrentUser);

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value) {
      i18n.changeLanguage(event.currentTarget.value);
    }
  };

  return (
    <header>
      <Container size="xxl" p="md">
        <Group justify="space-between">
          <Logo />
          <Group justify="space-between">
            {isAuth && currentUser.username && <InputSearchUsers />}
            <NativeSelect
              leftSection={<MdLanguage />}
              data={supportedLanguages}
              onChange={handleChangeLanguage}
            />
          </Group>
        </Group>
      </Container>
    </header>
  );
};
