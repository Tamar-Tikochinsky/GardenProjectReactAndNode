import Login from "./pages/Login/Login";
import { useNavigate } from "react-router-dom"


const loginService = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  var token;
  await fetch("http://localhost:7001/api/auth/login", requestOptions)
    .then(response => response.json())
    // .then(a=>console.log(a))
    .then(result =>{token= result
    console.log(token);})
    .catch(error => console.log('error', error));
  return new Promise((resolve, reject) => {
    resolve({
      // loginStatus: "ok",
      loginStatus:!token.message|| token.message != '!לא מורשה'&& token.message != '!!!לא מורשה' ? "ok" : "unknown",
      data: {userToken:token.userToken,user:token.user}
      // { id: user._id, userName: user.userName, password: user.password, userToken: token },
    });
  });
}

const registerService = async (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password,
    "email": user.email,
    "phone": user.phone
  });

  // alert(user.userName)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  await fetch("http://localhost:7001/api/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  console.log("registered!");

}
export { loginService, registerService };