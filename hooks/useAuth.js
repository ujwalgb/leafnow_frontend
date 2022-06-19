import React from "react";
import fetchUserInfo from "../utils/getuser";

function useAuth() {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    fetchUserInfo()
      .then((response) => {
        console.log(response);
        setAuth(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return auth;
}

export default useAuth;
