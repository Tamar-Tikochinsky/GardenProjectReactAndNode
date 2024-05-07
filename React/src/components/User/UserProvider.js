import { useEffect, useState } from "react";
import { loginService } from "../../services";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setUser({ userToken }); // TODO: add username and id
    }
  }, []);

  const userLogin = (user) => {
    return new Promise((resolve, reject) => {
      loginService(user).then((response) => {
        if (response.loginStatus === "ok") {
          console.log(response.data,"aaaa")
          localStorage.setItem("userToken", response.data.userToken);
          setUser(response.data);
          resolve(response.data);
        }
        if (response.loginStatus === "unknown") {
          reject(new Error("unknown"));
        }
      });
    });
  };

  return (
    <UserContext.Provider value={{ user, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
