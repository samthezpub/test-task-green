import React, { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ idInstance: "", apiTokenInstance: "" });

  const handleLogin = (idInstance, apiTokenInstance) => {
    setCredentials({ idInstance, apiTokenInstance });
    setIsLoggedIn(true);
  };

  return (
      <div className="app">
        {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
        ) : (
            <Chat idInstance={credentials.idInstance} apiTokenInstance={credentials.apiTokenInstance} />
        )}
      </div>
  );
};

export default App;