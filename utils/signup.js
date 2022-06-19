import axios from "axios";

async function SignUp(email, name, password) {
  try {
    const r = await axios.post(
      "https://leafnowshop.herokuapp.com/api/auth/signup",
      {
        email: email,
        name: name,
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

export default SignUp;
