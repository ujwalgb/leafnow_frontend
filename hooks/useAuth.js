import React from "react";
import { connect } from "react-redux";
import fetchUserInfo from "../utils/getuser";

function useAuth({ setCart }) {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    fetchUserInfo()
      .then((response) => {
        console.log(response);
        const { error } = response;
        if (!error) {
          setAuth(response);
          setCart(response.cart);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return auth;
}

export default useAuth;
