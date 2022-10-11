import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface EditTransactionProviderData {
  transaction: User;
  changeEditTransaction: (editTransaction: User) => void;
}

export const editTransactionContext =
  createContext<EditTransactionProviderData>({} as EditTransactionProviderData);

export const EditTransactionProvider = ({ children }: Ichildrentype) => {
  const [transaction, setTransaction] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const changeEditTransaction = (editTransaction: User) =>
    setTransaction({ ...transaction, ...editTransaction });

  return (
    <editTransactionContext.Provider
      value={{ transaction, changeEditTransaction }}
    >
      {children}
    </editTransactionContext.Provider>
  );
};

export const useEditTransaction = () => {
  const context = useContext(editTransactionContext);
  return context;
};
