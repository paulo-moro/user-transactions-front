import { useEffect } from "react";
import ContactList from "../../components/userdashboard/contactsList";
import DashboardModal from "../../components/userdashboard/dashboardModal";
import { useAuth } from "../../providers/authtoken";
import { useContacts } from "../../providers/contacts";
import { useUser } from "../../providers/user";
import { StyledDashBoard } from "./styles";

function UserDashoardPage() {
  const { getAuth } = useAuth();
  const { getContacts } = useContacts();
  const { getUser } = useUser();
  useEffect(() => {
    getAuth();
    getUser();
    getContacts();
  }, []);

  return (
    <StyledDashBoard>
      <ContactList />

      <section className="side-screen">
        <DashboardModal />
      </section>
    </StyledDashBoard>
  );
}

export default UserDashoardPage;
