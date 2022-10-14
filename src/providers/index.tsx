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
            <CnabFileProvider>
              <ModalTypeProvider>
                <ModalProvider>{children}</ModalProvider>
              </ModalTypeProvider>
            </CnabFileProvider>
          </TransactionTypeProvider>
        </TransactionsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
