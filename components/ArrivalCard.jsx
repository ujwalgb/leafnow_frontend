import React from "react";
import styles from "./ArrivalCard.module.css";
import { BiDonateHeart } from "react-icons/bi";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookies";
import axios from "axios";
import { connect } from "react-redux";
function ArrivalCard({
  image,
  name,
  price,
  addToCart,
  id,
  removeFromCart,
  cart,
  desc,
}) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const [added, setAdded] = React.useState(false);

  // check if this item already in the cart set the added to true

  React.useEffect(() => {
    const index = cart.findIndex((item) => item.id == id);
    if (index > -1) {
      setAdded(true);
    }
  }, []);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item: {
        name,
        price,
        image,
        description: desc,
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  const addCart = async () => {
    if (!added) {
      addToCart({
        name,
        price,
        image,
        id,
      });
      setAdded(true);

      try {
        console.log("Run1");
        const r = await axios.post(
          `https://leafnowshop.herokuapp.com/api/cart/add`,
          {
            item: {
              name,
              id,
              price,
              image,
            },
          },
          {
            headers: {
              Authorization: `${Cookies.getItem("token")}`,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      removeFromCart(id);
      setAdded(false);

      try {
        console.log("Run1");
        const r = await axios.delete(
          `https://leafnowshop.herokuapp.com/api/cart/remove/${id}`,

          {
            headers: {
              Authorization: `${Cookies.getItem("token")}`,
            },
          }
        );
        console.log(r);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className={styles.arrival_card}>
      <div className={styles.arrival_card_thumb}>
        <button
          className={styles.donate_button}
          title="Donate for Plant"
          onClick={createCheckOutSession}
        >
          <BiDonateHeart />
        </button>
        <img src={image} alt="arrival_thumb" />

        <button className={styles.item_add_to_cart_button} onClick={addCart}>
          <span>
            {!added ? "Add" : "Remove"} {!added ? "to" : "from"} cart
          </span>
          <img src="/arrow-right.png" alt="arrow-icon" />
        </button>
      </div>
      <div className="arrival_card__footer">
        <h3>{name}</h3>
        <p>₹{price}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.appReducer.cart,
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch({ type: "ADD_TO_CART", item }),
  removeFromCart: (item_id) => dispatch({ type: "REMOVE_FROM_CART", item_id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArrivalCard);
