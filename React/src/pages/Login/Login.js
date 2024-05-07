import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Input } from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {

    if (!userName || !password) {
      return;
    }
    userLogin({ userName, password })
      .then(() => {
        if(userName=="1234" && password=="1234")
           navigate("/maneger")
        else
          navigate("/customer")
      })
      .catch((error) => {
        if (error.message == "unknown") {
          navigate("/register");
        }
      });
  };

  return (
    <div className={styles.loginpage}>
    <div className={styles.loginwrapper}>
      <h1 className={styles.logintitle}></h1><input
        placeholder="User name"
        onBlur={(e) => setUserName(e.target.value)}
        className={styles.logininput}
      />
      <br></br>
      <input
        placeholder="Password"
        type="password"
        onBlur={(e) => setPassword(e.target.value)}
        className={styles.logininput}
      />
      <button className={styles .loginbutton} onClick={() => login()}>להתחברות</button>
      <h1  className={styles.logintitle} >??את/ה לא רשום</h1>
      <button className={styles.loginbutton} onClick={() =>navigate("/register")}>להרשמה</button>
    </div>
    </div>
  );
};

export default Login;
