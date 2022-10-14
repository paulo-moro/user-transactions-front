import styled from "styled-components";

export const StyledDashBoard = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--blue1);
  h2 {
    color: var(--blue4);
    font-family: "Roboto", Arial, Helvetica, sans-serif;
  }
  .list__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .user_container {
    display: flex;
    width: 90%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    section {
      display: flex;
      width: 80%;
      justify-content: space-around;
      align-items: center;
    }
  }
  .cnab__list--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    gap: 1rem;
    width: 90%;
    ul {
      display: flex;
      justify-content: space-around;
      width: 90%;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;

      li {
        background-color: var(--white);
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        padding: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 25%;
        font-size: 0.7rem;
        flex-direction: column;
        gap: 1rem;
        section {
          display: flex;
          gap: 1rem;
        }
        button {
          font-size: 1rem;
          padding: 0.3rem;
        }
        .delete-btn {
          background-color: var(--red);
          color: var(--white);
        }
      }
    }
  }

  .shop__transaction--container {
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background-color: var(--white);
    border: solid var(--blue1);
    h2 {
      padding: 1rem;
    }
    section {
      padding: 1rem;
    }
    li {
      display: flex;
      width: 80%;
      background-color: var(--white);
      color: var(--blue1);
      flex-wrap: wrap;
      border-bottom: solid var(--blue1);
      padding: 1rem;
      justify-content: space-evenly;
      gap: 1rem;
      span {
        width: 40%;
      }
    }
  }
`;
