import React from "react";
import styles from "./ArrivalCard.module.css";
import { BiDonateHeart } from "react-icons/bi";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
function ArrivalCard({ image, name, price }) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item: {
        name,
        price,
        image,
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
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

        <button className={styles.item_add_to_cart_button}>
          <span>Add to cart</span>
          <img src="/arrow-right.png" alt="arrow-icon" />
        </button>
      </div>
      <div className="arrival_card__footer">
        <h3>Chinease Money Plant</h3>
        <p>$23.00</p>
      </div>
    </div>
  );
}

export default ArrivalCard;
