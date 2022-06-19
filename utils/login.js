import axios from "axios";

async function SignIn(email, password) {
  try {
    const r = await axios.post(
      "https://leafnowshop.herokuapp.com/api/auth/login",
      {
        email: email,
        password: password,
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
}

export default SignIn;
