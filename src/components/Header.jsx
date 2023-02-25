import Login from "./Login";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header({ setShowModal, showModal }) {
  const isLogon = useSelector((state) => state.users.logon);

  return (
    <header>
      <ul className="nav">
        <li>
          <Link to="/" id="home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" id="advisor">
            Movie advisor
          </Link>
        </li>
        <li>
          {" "}
          {isLogon ? (
            <button id="myBtn" className="login" onClick={() => setShowModal(true)}>
              Logoff
            </button>
          ) : (
            <button id="myBtn" className="login" onClick={() => setShowModal(true)}>
              Login
            </button>
          )}
          <Login showModal={showModal} setShowModal={setShowModal} />
        </li>
      </ul>
    </header>
  );
}

export default Header;
