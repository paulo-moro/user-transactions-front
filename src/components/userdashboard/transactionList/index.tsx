import { useAuth } from "../../../providers/authtoken";
import { useTransactions } from "../../../providers/transactions";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { useUser } from "../../../providers/user";
import { StyledButton } from "../../../styles/Button/style";
import { useCnabFile } from "../../../providers/CnabFile";
import { ITransaction } from "../../../interface";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { BiShow, BiHide } from "react-icons/bi";

function TransactionList() {
  const { transactions, changeTransaction, getTransactions } =
    useTransactions();
  const { transcriptFile, deleteCnabFile } = useCnabFile();
  const { user } = useUser();
  const { changeModal } = useModal();
  const { changeModalType } = useModalType();
  const { getAuth } = useAuth();
  const { cnabList } = useCnabFile();
  const [shops, setShops] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (transactions) {
      let shop_list = [] as string[];
      transactions.forEach((transaction) => {
        shop_list = [...shop_list, transaction.shop_name];
      });
      setShops(
        shop_list.filter((ele, pos) => {
          return shop_list.indexOf(ele) === pos;
        })
      );
    }
  }, [transactions]);

  const handleEdit = (transaction: ITransaction) => {
    changeTransaction(transaction);
    changeModalType("edit");
    changeModal();
  };

  const logout = () => {
    localStorage.clear();
    getAuth();
  };
  const getSubtotal = (
    listTransactions: ITransaction[],
    actualShop: string
  ) => {
    return listTransactions
      .filter((transaction) => {
        return actualShop === transaction.shop_name;
      })
      .reduce((previousValue, currentValue) => {
        return (
          previousValue +
          parseFloat(`${currentValue.type.signal}${currentValue.amount}`)
        );
      }, 0);
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
      <section className="cnab__list--container">
        <>
          <h2>Files to Transcript</h2>
          {show ? (
            <ul>
              {cnabList?.map((cnab) => {
                return (
                  <li key={cnab.id}>
                    <section>{cnab.title}</section>
                    <section>
                      <StyledButton onClick={() => transcriptFile(cnab.id)}>
                        <CgTranscript />
                      </StyledButton>

                      <StyledButton
                        className="delete-btn"
                        onClick={() => deleteCnabFile(cnab.id)}
                      >
                        <MdDeleteForever />
                      </StyledButton>
                    </section>
                  </li>
                );
              })}
              <StyledButton onClick={() => setShow(!show)}>
                <BiHide />
              </StyledButton>
            </ul>
          ) : (
            <StyledButton onClick={() => setShow(!show)}>
              <BiShow />
            </StyledButton>
          )}
        </>
      </section>
      {shops.map((shop, index) => {
        return (
          <>
            <ul key={index} className="shop__transaction--container">
              <h2>{shop}</h2>
              {transactions
                .filter((transaction) => {
                  return shop === transaction.shop_name;
                })
                .map((transaction) => {
                  return (
                    <li key={transaction.id}>
                      <span>{transaction.shop_rep}</span>
                      <span>{transaction.transaction_date}</span>
                      <span>{transaction.transaction_time}</span>
                      <span>
                        {transaction.type.signal} R$
                        {transaction.amount.replace(".", ",")}
                      </span>
                      <span>{transaction.type.description}</span>
                    </li>
                  );
                })}
              <section>
                Caixa :{" "}
                {getSubtotal(transactions, shop).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </section>
            </ul>
          </>
        );
      })}
    </section>
  );
}

export default TransactionList;
