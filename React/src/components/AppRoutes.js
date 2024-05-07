import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../components/User/UserContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotExist from "../pages/PageNotExist/PageNotExist";
import UpdateProduct from "../pages/Store/UpdateProduct";
import AddProduct from "../pages/Store/AddProduct"
import Maneger from "../pages/Store/Maneger"
import Customer from "../pages/Store/Customer"
import ShowBasket from "../pages/Store/ShowBasket";

const AppRoutes = () => {
  const authorizedRoutes = [{ path: "/customer", Component: Customer }];

  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/UpdateProduct" element={<UpdateProduct/>}></Route>
      <Route path="/addProduct" element={<AddProduct/>}></Route>
      <Route path="/maneger" element={<Maneger/>}></Route>
      <Route path="/customer" element={<Customer/>}></Route>
      <Route path="/showBasket" element={<ShowBasket/>}></Route>



            {authorizedRoutes.map((route) => {
        const userLoggedIn = !!user?.userToken;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              userLoggedIn ? (
                <route.Component></route.Component>
              ) : (
                <Login></Login>
              )
            }
          />
        );
      })}
      <Route path="*" element={<PageNotExist/>}></Route>
    </Routes>
  );
};

export default AppRoutes;
