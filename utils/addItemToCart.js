import axios from "axios";

async function addItemToCart(item) {
  try {
    const r = await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        item,
      },
      {
        headers: {
          Authorization: `${jsCookies.getItem("token")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
}

export default addItemToCart;
