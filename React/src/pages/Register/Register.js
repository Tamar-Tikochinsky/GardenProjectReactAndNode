import { useState } from "react";
import styles from "./Register.module.css";
import { registerService } from "../../services";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Input } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    registerService({ email, phone, userName, password })
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      if (error.message == "!כל השדות חובה") {
        alert("כל השדות חובה")
      }
    });
   
  };

  return (
    // <div className={styles.registerWrapper}>
    //   <Input
    //     placeholder="User name"
    //     onBlur={(e) => setUserName(e.target.value)}
    //   />
    //   <Input
    //     placeholder="Password"
    //     onBlur={(e) => setPassword(e.target.value)}
    //   />
    //   <Input placeholder="Email" onBlur={(e) => setEmail(e.target.value)} />
    //   <Input placeholder="Phone" onBlur={(e) => setPhone(e.target.value)} />
    //   <Button onClick={()=>register()}>להרשמה</Button>
    // </div>
    <div className={styles.repage}>
    <div className={styles.rewrapper}>
      <h1 className={styles.retitle}>:הרשמה</h1>
      <input
      className={styles.reinput}
        placeholder="name"
        onBlur={(e) => setUserName(e.target.value)}
      />
      <input className={styles.reinput} placeholder="Email"  required onBlur={(e) => setEmail(e.target.value)}  />
      <input  className={styles.reinput} placeholder="Phone" onBlur={(e) => setPhone(e.target.value)} />
      <input
      className={styles.reinput} 
        placeholder="User name"
        onBlur={(e) => setUserName(e.target.value)}
      />
      <input
      className={styles.reinput} 
        placeholder="Password"
        onBlur={(e) => setPassword(e.target.value)}
      />
      <button  className={styles.rebutton} onClick={register}>לסיום</button>

    </div>
    </div>
  );
};

export default Register;
