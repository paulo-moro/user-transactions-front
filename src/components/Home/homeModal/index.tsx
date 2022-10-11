import { useModal } from "../../../providers/modal";
import { StyledButton } from "../../../styles/Button/style";
import RegisterForm from "../registerForm";
import { StyledModal } from "./styles";

function HomeModal() {
  const { changeModal } = useModal();

  return (
    <>
      <StyledModal>
        <section className="modal_first_section">
          <StyledButton onClick={changeModal}>x</StyledButton>
        </section>
        <section className="modal_second_section">
          <h2>Register</h2>
          <RegisterForm />
        </section>
      </StyledModal>
    </>
  );
}

export default HomeModal;
