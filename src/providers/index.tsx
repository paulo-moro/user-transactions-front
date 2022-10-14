import { Ichildrentype } from "../interface";
import { AuthProvider } from "./authtoken";
import { TransactionTypeProvider } from "./transactionForm";
import { TransactionsProvider } from "./transactions";
import { ModalProvider } from "./modal";
import { ModalTypeProvider } from "./modalType";
import { UserProvider } from "./user";
import { CnabFileProvider } from "./CnabFile";

const Providers = ({ children }: Ichildrentype) => {
  return (
    <AuthProvider>
      <UserProvider>
        <TransactionsProvider>
          <TransactionTypeProvider>
            <ModalTypeProvider>
              <ModalProvider>
                <CnabFileProvider>{children}</CnabFileProvider>
              </ModalProvider>
            </ModalTypeProvider>
          </TransactionTypeProvider>
        </TransactionsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
