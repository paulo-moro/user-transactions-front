import styled from "styled-components";

export const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: column;

  section {
    display: flex;
    width: 60%;
    padding: 1em;
  }
  .modal_first_section {
    height: 0.8rem;
    flex-direction: row;
    justify-content: end;
  }
  .modal_second_section {
    gap: 1em;
    height: 50%;
    align-items: center;
    h2 {
      font-family: Arial, Helvetica, sans-serif, "Roboto";
      color: var(--blue4);
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    input {
      width: 80%;
    }
  }
`;
