import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer__subscription_form}>
          <a href="#">
            <img src="/footer__logo.png" alt="footer Logo" />
          </a>
          <p className="mt-5 mb-5 text-gray-500">
            Sem magna ut pharetra vitae duis eu senectus sem risus. Morbi non,
            semper vestibulum euismod accumsan augue.
          </p>
        </div>
        <hr />
        <div className="developer_name">
          <p>
            Developed by <strong>Ujwal</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
