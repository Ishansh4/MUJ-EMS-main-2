import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; // Import CSS file

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [regno, setRegno] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/", { email, password, name, regno })
                .then(res => {
                    if (res.data === "exist") {
                        history("/first", { state: { name, regno } });
                        history("/home", { state: { id: email } });
                    } else if (res.data === "notexist") {
                        alert("User has not signed up");
                    }
                })
                .catch(e => {
                    alert("Wrong details");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (

        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
            <p>OR</p>
            <Link to="/signup">Signup Page</Link>
        </div>
    );
}

export default Login;
