import axios from "axios";
import jsCookies from "js-cookies";

async function fetchUserInfo() {
  try {
    const r = await axios.get("https://leafnowshop.herokuapp.com/api/auth/me", {
      headers: {
        Authorization: `${jsCookies.getItem("token")}`,
      },
    });
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
}

export default fetchUserInfo;
