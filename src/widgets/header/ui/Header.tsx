import { Container, Group, NativeSelect, Text } from "@mantine/core";
import { MdLanguage } from "react-icons/md";
import i18n from "@/shared/config/i18n";
import { Logo } from "@/shared/assets";
import { Link } from "react-router-dom";
import { Paths, useAppSelector } from "@/shared";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  const isAuth = useAppSelector(state => state.userSlice.isAuth);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <header>
      <Container size="xxl" p="md">
        <Group justify="space-between">
          <Logo />

          {isAuth && (
            <Link
              to={Paths.Quizzes}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Text mb="lg">{t("Quizzes")}</Text>
            </Link>
          )}

          <NativeSelect
            leftSection={<MdLanguage />}
            data={["EN", "RU"]}
            onChange={event => {
              handleChangeLanguage(event.target.value);
            }}
          />
        </Group>
      </Container>
    </header>
  );
}
