import { Container, Group, NativeSelect } from "@mantine/core";
import { MdLanguage } from "react-icons/md";
import i18n from "@/shared/config/i18n";
import { Logo } from "@/shared/assets";

export function Header() {
  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <header>
      <Container size="xxl" p="md">
        <Group justify="space-between">
          <Logo />
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
