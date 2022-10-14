import { createContext, useState, useContext } from "react";
import Api from "../../api";
import {
  Ichildrentype,
  ITransaction,
  ItransactionParcial,
} from "../../interface";
import { useAuth } from "../authtoken";

interface TransactionsProviderData {
  transactions: ITransaction[];
  transaction: ITransaction;
  addTransactions: (transaction: ITransaction) => void;
  getTransactions: () => void;
  updateTransactions: (id: number, newData: ItransactionParcial) => void;
  deleteTransactions: (id: number) => void;
  changeTransaction: (newTransaction: ITransaction) => void;
}

export const TransactionsContext = createContext<TransactionsProviderData>(
  {} as TransactionsProviderData
);

export const TransactionsProvider = ({ children }: Ichildrentype) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [transaction, setTransaction] = useState<ITransaction>(
    {} as ITransaction
  );
  const { auth } = useAuth();

  const changeTransaction = (newTransaction: ITransaction) => {
    setTransaction({ ...transaction, ...newTransaction });
  };

  const addTransactions = (transaction: ITransaction) =>
    setTransactions([transaction, ...transactions]);

  const getTransactions = () => {
    Api.get(`transactions/`, { headers: { Authorization: `Token ${auth}` } })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateTransactions = (id: number, newData: ItransactionParcial) => {
    Api.patch(`transaction/${id}`, newData, {
      headers: { Authorization: `Token ${auth}` },
    }).then((res) => {
      getTransactions();
    });
  };

  const deleteTransactions = (id: number) => {
    Api.delete(`transaction/${id}`, {
      headers: { Authorization: `Token ${auth}` },
    }).then((res) => {
      getTransactions();
    });
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transaction,
        addTransactions,
        updateTransactions,
        deleteTransactions,
        getTransactions,
        changeTransaction,
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
