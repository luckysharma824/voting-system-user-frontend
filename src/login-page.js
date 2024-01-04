import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./AppContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleFormEvent = (event) => {
    const { name, value } = event.target;
    setLoginForm((form) => ({ ...form, [name]: value }));
  };

  async function handleLogin(event) {
    event.preventDefault();
    console.log(
      "form submitted..., username: " +
        loginForm.username +
        ", password: " +
        loginForm.password
    );
    let url = "http://localhost:8080/user/login";
    const response = await restCall(url, "POST", loginForm);
    if (response.isSuccess) {
      console.log(response.result);
      user.username = response.result.username;
      user.password = response.result.password;
      navigate("/home");
    }
  }

  async function restCall(url, httpMethod, data) {
    const requestOptions = {
      method: httpMethod,
      headers: { "Content-Type": "application/json" },
      body: data === null ? null : JSON.stringify(data),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data_1 = await response.json();
      console.log(data_1);
      alert(data_1.message);
      return data_1;
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    return null;
  }

  return (
    <div className="text-center">
      <div>Welcome To The Voting System : {user.username}</div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Enter username:</label>
          <input
            className="form-control-sm"
            id="username"
            type="text"
            name="username"
            autoComplete="false"
            //value={loginForm.username}
            onChange={handleFormEvent}
          />
        </div>
        <div className="form-group">
          <label>Enter password:</label>
          <input
            className="form-control-sm"
            id="password"
            type="password"
            name="password"
            autoComplete="false"
            //value={loginForm.password}
            onChange={handleFormEvent}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
