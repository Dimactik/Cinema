import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkCredentials, logOff } from "../store/users-slice";

function Login({ setShowModal, showModal }) {
  const isLogon = useSelector((state) => state.users.logon);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    let combination = `${user}@${password}`;
    dispatch(checkCredentials(combination));
    combination = "";
    setUser("");
    setPassword("");
    setShowModal(false);
  }

  function handleUser(event) {
    setUser(event.target.value);
  }

  function handlePassowrd(event) {
    setPassword(event.target.value);
  }

  function handleLogOff() {
    dispatch(logOff());
  }

  if (isLogon) {
    return (
      <>
        <div id="myModal" className={showModal ? "modal active" : "modal"} onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setShowModal(false)}>
              x
            </button>
            <h1 className="loginHeader">Hello</h1>
            <form onSubmit={handleLogOff}>
              <label>
                <button id="submit">LogOff</button>
              </label>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="myModal" className={showModal ? "modal active" : "modal"} onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close" onClick={() => setShowModal(false)}>
            x
          </button>
          <h1 className="loginHeader">Please enter your credentials</h1>
          <form onSubmit={handleSubmit}>
            <label className="loginLabel">Login</label>
            <input type="text" name="login" className="loginField" value={user} onChange={handleUser} />
            <label className="loginLabel">Password</label>
            <input type="password" name="password" className="loginField" onChange={handlePassowrd} value={password} />
            <input type="submit" id="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
