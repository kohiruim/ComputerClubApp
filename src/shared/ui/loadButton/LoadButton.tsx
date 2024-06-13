import { Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/shared/lib";
import { useTranslation } from "react-i18next";
import {
  increaseTableRowsLimit,
  selectLoading,
  selectRowsLimit,
  selectTotalUsers,
} from "@/entities/user";

export const LoadButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectLoading);
  const totalCountUsers = useAppSelector(selectTotalUsers);
  const tableSize = useAppSelector(selectRowsLimit);
  const handleLoadClick = () => {
    dispatch(increaseTableRowsLimit());
  };

  return (
    tableSize < totalCountUsers && (
      <Button onClick={handleLoadClick} variant="light" loading={isLoading}>
        {t("load more")}
      </Button>
    )
  );
};
