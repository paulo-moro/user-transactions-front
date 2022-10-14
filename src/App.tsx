import React from "react";

import Routes from "./routes";
import GlobalStyle from "./styles/globalStyle";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <GlobalStyle />

      <Routes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
