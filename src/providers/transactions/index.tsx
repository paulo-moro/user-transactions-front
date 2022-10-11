import { createContext, useState, useContext } from "react";
import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";

interface Transaction {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface TransactionPartial {
  name?: string;
  phone?: string;
  email?: string;
}

interface TransactionsProviderData {
  transactions: Transaction[];
  addTransactions: (transaction: Transaction) => void;
  getTransactions: () => void;
  updateTransactions: (id: string, newData: TransactionPartial) => void;
  deleteTransactions: (id: string) => void;
}

export const TransactionsContext = createContext<TransactionsProviderData>(
  {} as TransactionsProviderData
);

export const TransactionsProvider = ({ children }: Ichildrentype) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { auth } = useAuth();
  const addTransactions = (transaction: Transaction) =>
    setTransactions([transaction, ...transactions]);

  const getTransactions = () => {
    Api.get(`transactions/`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateTransactions = (id: string, newData: TransactionPartial) => {
    Api.patch(`transaction/${id}`, newData, {
      headers: { Authorization: `Bearer ${auth}` },
    }).then((res) => {
      getTransactions();
    });
  };

  const deleteTransactions = (id: string) => {
    Api.delete(`transaction/${id}`, {
      headers: { Authorization: `Bearer ${auth}` },
    }).then((res) => {
      getTransactions();
    });
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransactions,
        updateTransactions,
        deleteTransactions,
        getTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  return context;
};
