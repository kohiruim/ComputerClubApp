import type { ChangeEvent, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { CgSearch } from "react-icons/cg";
import {
  TextInput,
  Combobox,
  useCombobox,
  LoadingOverlay,
  CloseButton,
} from "@mantine/core";
import { type UserData, Paths } from "@/shared/type";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Username } from "@/shared/ui";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import {
  selectFriends,
  selectLoading,
  selectFoundUser,
  setFoundUser,
  setFriends,
} from "../model";

export const InputSearchUsers = () => {
  const { t } = useTranslation();
  const combobox = useCombobox();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const friends = useAppSelector(selectFriends);
  const isLoading = useAppSelector(selectLoading);
  const comboboxValue = useAppSelector(selectFoundUser);

  const handleOptionClick = (user: UserData) => {
    return () => {
      dispatch(setFoundUser(""));
      combobox.targetRef.current?.blur();
      navigate(`${Paths.UserPage}/${user.id}`, {
        state: { user: user },
      });
    };
  };

  const createOptions = () => {
    if (friends.length) {
      const options = friends.map(item => (
        <Combobox.Option
          value={item.username}
          key={item.id}
          onClick={handleOptionClick(item)}
          mb="xs"
        >
          <Username user={item} size="small" />
        </Combobox.Option>
      ));
      return options;
    }
    return <Combobox.Empty p="lg">{t("nothing found")}</Combobox.Empty>;
  };

  const handleOpenDropdown = (event: MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      combobox.openDropdown();
    }
  };

  const handleChangeCombobox = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFoundUser(event.currentTarget.value));
    dispatch(setFriends(event.currentTarget.value));
    if (!event.currentTarget.value) {
      combobox.closeDropdown();
    } else {
      combobox.openDropdown();
    }
    combobox.updateSelectedOptionIndex();
  };

  return (
    <Combobox
      onOptionSubmit={optionValue => {
        dispatch(setFoundUser(optionValue));
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          miw={230}
          placeholder={t("search friends") + "..."}
          leftSection={<CgSearch />}
          rightSection={
            comboboxValue && (
              <CloseButton
                size="sm"
                onClick={() => {
                  dispatch(setFoundUser(""));
                }}
              />
            )
          }
          value={comboboxValue}
          onChange={handleChangeCombobox}
          onClick={handleOpenDropdown}
          onBlur={() => {
            combobox.closeDropdown();
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown mih={70} mah={310} style={{ overflowY: "auto" }}>
        <LoadingOverlay p="lg" visible={isLoading} />
        {!isLoading && createOptions()}
      </Combobox.Dropdown>
    </Combobox>
  );
};
