import { useEffect, useState } from "react";
import PageNav from "../components/PageNav/PageNav";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

function SignIn() {
  const navigate = useNavigate();
  // const [name, setname] = useState("");
  // const [phoneNo, setPhoneNo] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/", { replace: true });
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <PageNav />
      <main className={styles.signUp}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="text">Name</label>
            <input type="text" name="name" onChange={handleInputChange} />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Phone No</label>
            <input type="tel" name="phoneNo" onChange={handleInputChange} />
          </div>

          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>

          <div className={(styles.row, styles.perti)}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Button type="primary">Sign In</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
