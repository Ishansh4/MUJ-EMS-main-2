import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/signup", {
        name,
        regno,
        email,
        password,
      });

      if (res.data === "exist") {
        alert("User already exists");
      } else if (res.data === "notexist") {
        history("/home", { state: { id: email, name, regno } });
      }
    } catch (e) {
      alert("wrong details");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>
      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <input
          type="number"
          onChange={(e) => {
            setRegno(e.target.value);
          }}
          placeholder="Registration No."
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/home">Login Page</Link>
    </div>
  );
}

export default Login;
