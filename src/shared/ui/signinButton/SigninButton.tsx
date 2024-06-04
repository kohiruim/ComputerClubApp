import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "@mantine/core";
import { GoogleIcon, GithubIcon } from "../../assets/";
import { useTranslation } from "react-i18next";

type DefaultInputProps = ComponentPropsWithoutRef<"button">;

type SigninButtonProps = Omit<DefaultInputProps, "className"> & {
  typeProvider: "google" | "github";
};

export const SigninButton: FC<SigninButtonProps> = ({
  typeProvider,
  onClick,
  ...otherProps
}) => {
  const { t } = useTranslation();

  if (typeProvider === "google") {
    return (
      <Button
        leftSection={<GoogleIcon />}
        variant="default"
        onClick={onClick}
        {...otherProps}
      >
        {t("continue with google")}
      </Button>
    );
  }
  return (
    <Button
      leftSection={<GithubIcon />}
      variant="filled"
      color="rgba(36, 36, 36, 94)"
      onClick={onClick}
      {...otherProps}
    >
      {t("continue with github")}
    </Button>
  );
};
