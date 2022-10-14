import { useAuth } from "../../../providers/authtoken";
import { useTransactions } from "../../../providers/transactions";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { useUser } from "../../../providers/user";
import { StyledButton } from "../../../styles/Button/style";
import { useCnabFile } from "../../../providers/CnabFile";
import { ITransaction } from "../../../interface";

function TransactionList() {
  const { transactions, changeTransaction } = useTransactions();
  const { user } = useUser();
  const { changeModal } = useModal();
  const { changeModalType } = useModalType();
  const { getAuth } = useAuth();
  const { cnabList } = useCnabFile();

  const handleEdit = (transaction: ITransaction) => {
    changeTransaction(transaction);
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
          <h2>Welcome {user.username}</h2>
          <StyledButton onClick={logout}>logout</StyledButton>
        </section>
        <StyledButton
          onClick={() => {
            changeModal();
            changeModalType("add");
          }}
        >
          Add Cnab File
        </StyledButton>
      </div>
      <ul>
        {cnabList?.map((cnab) => {
          return (
            <li key={cnab.id}>
              <section>{cnab.title}</section>
              <button>Transcript</button>
            </li>
          );
        })}
      </ul>
      <ul>
        {transactions?.map((transaction) => {
          return (
            <li key={transaction.id}>
              <input value={transaction.type.description} disabled />
              <input value={transaction.type.nature} disabled />
              <input value={transaction.shop_name} disabled />
              <input value={transaction.shop_rep} disabled />
              <input value={transaction.amount} disabled />
              <input value={transaction.CPF} disabled />
              <input value={transaction.card} disabled />
              <input value={transaction.transaction_date} disabled />
              <input value={transaction.transaction_time} disabled />
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
