import {
  type Dispatch,
  type SetStateAction,
  type FC,
  type ReactNode,
  createContext,
  useState,
} from "react";
import type { UserData } from "@/shared";

interface UserContextType {
  userData: Nullable<UserData>;
  setUserData: Dispatch<SetStateAction<Nullable<UserData>>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<Nullable<UserData>>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
