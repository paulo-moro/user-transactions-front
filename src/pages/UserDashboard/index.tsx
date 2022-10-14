import { useEffect } from "react";
import TransactionList from "../../components/userdashboard/transactionList";
import DashboardModal from "../../components/userdashboard/dashboardModal";
import { useAuth } from "../../providers/authtoken";
import { useTransactions } from "../../providers/transactions";
import { useUser } from "../../providers/user";
import { StyledDashBoard } from "./styles";
import { useCnabFile } from "../../providers/CnabFile";

function UserDashoardPage() {
  const { getAuth } = useAuth();
  const { getTransactions } = useTransactions();
  const { getUser } = useUser();
  const { getCnabFile } = useCnabFile();
  useEffect(() => {
    getAuth();
    getUser();
    getTransactions();
    // getCnabFile();
  }, []);

  return (
    <StyledDashBoard>
      <TransactionList />

      <section className="side-screen">
        <DashboardModal />
      </section>
    </StyledDashBoard>
  );
}

export default UserDashoardPage;
