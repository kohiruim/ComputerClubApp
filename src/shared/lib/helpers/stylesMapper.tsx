import type { Sizes } from "@/shared/type";

type ValueType = {
  sizeUsernameText: string;
  sizeFullnameText: string;
  colorText: string;
  width: string;
};

type Styles = Record<Sizes, ValueType>;

export const stylesMapper: Styles = {
  small: {
    sizeUsernameText: "sm",
    sizeFullnameText: "xs",
    colorText: "dimmed",
    width: "140",
  },
  medium: {
    sizeUsernameText: "md",
    sizeFullnameText: "md",
    colorText: "default",
    width: "100%",
  },
};
