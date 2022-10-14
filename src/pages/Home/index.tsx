import { useEffect } from "react";
import HomeModal from "../../components/Home/homeModal";
import LoginForm from "../../components/Home/loginForm";
import { useAuth } from "../../providers/authtoken";
import { useModal } from "../../providers/modal";
import { useModalType } from "../../providers/modalType";
import { StyledHomePage } from "./styles";

function HomePage() {
  const { modalType } = useModalType();
  const { modal } = useModal();
  const { getAuth } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <StyledHomePage>
      <section className="first_section">
        <h2>Neo Transactions</h2>
      </section>
      <section className="second_section">
        <LoginForm />
      </section>
      {modalType === "register" && modal && <HomeModal />}
    </StyledHomePage>
  );
}

export default HomePage;
