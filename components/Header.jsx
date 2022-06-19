import React from "react";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from "react-redux";
import Link from "next/link";
function Header({ user }) {
  console.log(user);
  return (
    <div className={styles.header}>
      <div className={styles.header_wrapper}>
        <a href="#logo">
          <img src="/logo.png" alt="brand-logo" />
        </a>
        <nav className={styles.header_nav}>
          <ul className="flex items-center gap-5">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Discussion</a>
            </li>
          </ul>
        </nav>

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
                <button className={styles.cart_button}>
                  <img src="/bag.svg" alt="" />
                  <span className={styles.cart_count}>0</span>
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
});

export default connect(mapStateToProps, null)(Header);
