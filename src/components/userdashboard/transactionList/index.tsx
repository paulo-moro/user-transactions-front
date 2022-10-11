import { ItransactionType } from "../../../interface";
import { useAuth } from "../../../providers/authtoken";
import { useTransactions } from "../../../providers/transactions";
import { useEditTransaction } from "../../../providers/edittransaction";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { useUser } from "../../../providers/user";
import { StyledButton } from "../../../styles/Button/style";

function TransactionList() {
  const { transactions } = useTransactions();
  const { user } = useUser();
  const { changeModal } = useModal();
  const { changeModalType } = useModalType();
  const { changeEditTransaction } = useEditTransaction();
  const { getAuth } = useAuth();

  const handleEdit = (transaction: ItransactionType) => {
    changeEditTransaction(transaction);
    changeModalType("edit");
    changeModal();
  };
  const logout = () => {
    localStorage.clear();
    getAuth();
  };
  return (
    <section className="list__container">
      <div className="user_container">
        <section>
          <h2>Welcome {user.name}</h2>
          <StyledButton onClick={logout}>logout</StyledButton>
        </section>
        <StyledButton
          onClick={() => {
            changeModal();
            changeModalType("add");
          }}
        >
          Add contact
        </StyledButton>
      </div>
      <ul>
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id}>
              <input value={transaction.name} disabled />
              <input value={transaction.phone} disabled />
              <input value={transaction.email} disabled />
              <section>
                <button onClick={() => handleEdit(transaction)}>Edit</button>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TransactionList;
