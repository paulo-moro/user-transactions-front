import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface TransactionProviderData {
  transactionType: string;
  changeTransaction: (type: string) => void;
}

export const TransactionTypeContext = createContext<TransactionProviderData>(
  {} as TransactionProviderData
);

export const TransactionTypeProvider = ({ children }: Ichildrentype) => {
  const [transactionType, setTransactionType] = useState<string>("");

  const changeTransaction = (type: string) => setTransactionType(type);

  return (
    <TransactionTypeContext.Provider
      value={{ changeTransaction, transactionType }}
    >
      {children}
    </TransactionTypeContext.Provider>
  );
};

export const useTransactionType = () => {
  const context = useContext(TransactionTypeContext);
  return context;
};
