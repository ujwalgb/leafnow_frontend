import axios from "axios";
import jsCookies from "js-cookies";
import React from "react";
import { connect } from "react-redux";
import styles from "./CartPopUp.module.css";

function CartItem({ item, removeFromCart }) {
  const handleRemove = async () => {
    removeFromCart(item.id);
    try {
      console.log("Run1");
      const r = await axios.delete(
        `https://leafnowshop.herokuapp.com/api/cart/remove/${item.id}`,

        {
          headers: {
            Authorization: `${jsCookies.getItem("token")}`,
          },
        }
      );
      console.log(r);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_image}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.cart_item_details}>
        <h3 className="text-black font-semibold uppercase">{item.name}</h3>
        <p>₹{item.price}</p>
        <button className="remove_button text-red-500" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
function CartPopUp({ cart, removeFromCart, disableCart }) {
  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += parseInt(item.price);
    });
    return total;
  };

  const handleClose = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("cart_overlay")) {
      disableCart(false);
    }
  };

  return (
    <div
      className={`${styles.cart_overlay} cart_overlay`}
      onClick={handleClose}
    >
      <div className={styles.cart_popup}>
        <div className={styles.cart_popup_content}>
          {cart.length > 0 ? (
            <div className={styles.cart_items}>
              {cart.map((cart_item, i) => {
                return (
                  <CartItem
                    item={cart_item}
                    key={i}
                    removeFromCart={removeFromCart}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-10 ">
              <h3 className="text-2xl text-center">Your cart is empty</h3>
            </div>
          )}
        </div>
        <div className={styles.cart_popup__footer}>
          <div className={styles.cart_footer__header}>
            <div className="cart__footer__header__left">
              <h3>Subtotal</h3>
            </div>
            <div className="cart__footer__header__right">
              <p>₹{getTotal()}</p>
            </div>
          </div>

          <button
            className={`cart_checkout_button bg-black text-white py-2 px-3 w-full mt-3 mb-3 ${
              cart.length == 0 && styles.disabled_button
            }`}
            disable={cart.length == 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.appReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (item_id) => dispatch({ type: "REMOVE_FROM_CART", item_id }),
  disableCart: (cart_popup) =>
    dispatch({
      type: "SET_CART_POPUP",
      cart_popup,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPopUp);
