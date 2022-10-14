import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { StyledButton } from "../../../styles/Button/style";

import TransactionAddForm from "../transactionAddForm";
import TransactionEditForm from "../transactionEditAddForm";
import { StyledModal } from "./style";

function DashboardModal() {
  const { modalType } = useModalType();
  const { modal, changeModal } = useModal();

  return (
    <>
      {modalType === "add" && modal ? (
        <StyledModal>
          <section className="modal_first_section">
            <StyledButton onClick={changeModal}>x</StyledButton>
          </section>
          <section className="modal_second_section">
            <h2>Contact</h2>
            <TransactionAddForm />
          </section>
        </StyledModal>
      ) : (
        modalType === "edit" &&
        modal && (
          <StyledModal>
            <section className="modal_first_section">
              <StyledButton onClick={changeModal}>x</StyledButton>
            </section>
            <section className="modal_second_section">
              <h2>Transaction</h2>
              <TransactionEditForm />
            </section>
          </StyledModal>
        )
      )}
    </>
  );
}

export default DashboardModal;
