import React from "react";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from "react-redux";
import Link from "next/link";
function Header({ user, cart, setCartPopup }) {
  console.log(user);
  return (
    <div className={styles.header}>
      <div className={styles.header_wrapper}>
        <a href="#logo">
          <img src="/logo.png" alt="brand-logo" />
        </a>

        <div className={styles.auth__nav}>
          <ul className="flex items-center gap-5">
            <li>
              {user ? (
                <button>
                  <img src="/u_avatar.svg" alt="" />
                </button>
              ) : (
                <Link href="/login">
                  <a>Login/Signup</a>
                </Link>
              )}
            </li>

            {user && (
              <li>
                <button
                  className={styles.cart_button}
                  onClick={() => {
                    setCartPopup(true);
                  }}
                >
                  <img src="/bag.svg" alt="" />
                  <span className={styles.cart_count}>{cart.length}</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        <button className={styles.menu_btn}>
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  cart: state.appReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setCartPopup: (cart_popup) =>
    dispatch({
      type: "SET_CART_POPUP",
      cart_popup,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
