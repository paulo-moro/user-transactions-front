import { createContext, useState, useContext, useEffect } from "react";
import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";

interface User {
  id: string;
  last_login?: Date;
  is_superuser: boolean;
  date_joined: Date;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface UserProviderData {
  user: User;
  changeUser: (newUser: User) => void;
  getUser: () => void;
}

export const userContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const UserProvider = ({ children }: Ichildrentype) => {
  const [user, setUser] = useState<User>({} as User);
  const { auth } = useAuth();

  useEffect(() => {
    auth && setUser(JSON.parse(localStorage.getItem("@user")!));
  }, []);

  const changeUser = (newUser: User) => setUser({ ...user, ...newUser });
  const getUser = () => {
    Api.get("/users/profile ", {
      headers: { Authorization: `Token ${auth}` },
    }).then((res) => {
      changeUser(res.data);
      localStorage.setItem("@user", JSON.stringify(res.data));
    });
  };
  return (
    <userContext.Provider value={{ changeUser, user, getUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};
