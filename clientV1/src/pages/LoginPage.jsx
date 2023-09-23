import PageNav from "../components/PageNav/PageNav";
import { useUni } from "../context/UniContext";
import styles from "./LoginPage.module.css";
import { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
  const [fName, setfName] = useState("");
  const [fEmail, setfEmail] = useState("");
  const [fPassword, setfPassword] = useState("");
  const { backInfo, isLoading, isAuthenticated, login } = useUni();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  if (isLoading === true || backInfo[0] === undefined) return <h1>Loading</h1>;

  function handelSubmit(e) {
    console.log("hello");
    e.preventDefault();
    console.log(fName);
    backInfo.forEach((info) => {
      if (
        fName === info.name &&
        fEmail === info.email &&
        fPassword === info.password
      ) {
        console.log("Success");
        login();
      }
    });
  }

  if (isAuthenticated) return;

  return (
    <div>
      <PageNav />
      <main className={styles.login}>
        <form className={styles.form} onSubmit={handelSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              onChange={(e) => setfName(e.target.value)}
              value={fName}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setfEmail(e.target.value)}
              value={fEmail}
            />
          </div>

          <div className={(styles.row, styles.perti)}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setfPassword(e.target.value)}
              value={fPassword}
            />
          </div>

          <div>
            <Button type="primary">Login</Button>
          </div>
          {/* <button onClick={handelSignIn}>SignIn</button> */}
          <Link
            to="/signIn"
            className={styles.signUpTag}
            // style={{ color: "white" }}
          >
            Sign In
          </Link>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
