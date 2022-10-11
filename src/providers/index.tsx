import { Ichildrentype } from "../interface";
import { AuthProvider } from "./authtoken";
import { TransactionTypeProvider } from "./transactionForm";
import { TransactionsProvider } from "./transactions";
import { EditTransactionProvider } from "./edittransaction";
import { ModalProvider } from "./modal";
import { ModalTypeProvider } from "./modalType";
import { UserProvider } from "./user";

const Providers = ({ children }: Ichildrentype) => {
  return (
    <AuthProvider>
      <UserProvider>
        <TransactionsProvider>
          <TransactionTypeProvider>
            <EditTransactionProvider>
              <ModalTypeProvider>
                <ModalProvider>{children}</ModalProvider>
              </ModalTypeProvider>
            </EditTransactionProvider>
          </TransactionTypeProvider>
        </TransactionsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
