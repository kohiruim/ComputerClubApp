import type { FC, ComponentPropsWithoutRef } from "react";
import { Button } from "@mantine/core";
import { GoogleIcon, GithubIcon } from "../../assets/";

type DefaultInputProps = ComponentPropsWithoutRef<"button">;

type SigninButtonProps = Omit<DefaultInputProps, "className"> & {
  typeProvider: "google" | "github";
};

export const SigninButton: FC<SigninButtonProps> = ({
  typeProvider,
  onClick,
  ...otherProps
}) => {
  if (typeProvider === "google") {
    return (
      <Button
        leftSection={<GoogleIcon />}
        variant="default"
        onClick={onClick}
        {...otherProps}
      >
        Продолжить с Google
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
      Продолжить с Github
    </Button>
  );
};
