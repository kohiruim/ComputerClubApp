import { Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/shared";
import { useTranslation } from "react-i18next";
import { increaseTableRowsLimit } from "@/entities";

export const LoadButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.userSlice.isLoading);
  const totalCountUsers = useAppSelector(
    state => state.userSlice.clientsTable.totalCount
  );
  const tableSize = useAppSelector(
    state => state.userSlice.clientsTable.rowsLimit
  );
  const handleLoadClick = () => {
    dispatch(increaseTableRowsLimit());
  };

  return (
    tableSize < totalCountUsers && (
      <Button
        onClick={handleLoadClick}
        color="indigo"
        variant="light"
        loading={isLoading}
      >
        {t("load more")}
      </Button>
    )
  );
};
