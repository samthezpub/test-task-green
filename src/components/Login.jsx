import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(idInstance, apiTokenInstance);
    };

    return (
        <div className="login">
            <h2>Вход в GREEN-API</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Instance:</label>
                    <input
                        type="text"
                        value={idInstance}
                        onChange={(e) => setIdInstance(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>API Token Instance:</label>
                    <input
                        type="text"
                        value={apiTokenInstance}
                        onChange={(e) => setApiTokenInstance(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;