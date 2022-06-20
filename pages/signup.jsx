/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React from "react";
import Cookies from "js-cookies";
import styles from "../styles/Auth.module.css";
import SignUp from "../utils/signup";
function FormField(props) {
  return (
    <div className={styles.form_field}>
      <label htmlFor={props.id} className="text-sm text-gray-500">
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        required={props.required}
        autoComplete="off"
        value={props.value}
        onChange={(e) => {
          props.setChange(e.target.value);
        }}
      />
    </div>
  );
}
function signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validateEmail = () => {
    if (!emailRegEx.test(email)) {
      return true;
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      alert("Please provide a valid email address");
      return;
    }

    SignUp(email, name, password)
      .then((response) => {
        console.log(response);
        const { error, message, token } = response;
        if (error) {
          alert(message);
          return;
        }
        if (token) {
          Cookies.setItem("token", token);
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className={styles.signup}>
      <div className={styles.signup_form__box}>
        <div className={styles.signup__form__content}>
          <h2>Welcome to Leafnow </h2>
          <p className="flex gap-2 text-gray-500">
            Already have an ccount?{" "}
            <Link href="/login">
              <a className="text-green-700 font-semibold underline">Log in</a>
            </Link>{" "}
          </p>

          <form
            className="mt-5 flex flex-col gap-5 items-start"
            onSubmit={handleSignUp}
          >
            <FormField
              name="email"
              id="email"
              placeholder="Your email address"
              type="email"
              required={true}
              label="Email"
              value={email}
              setChange={setEmail}
            />
            <FormField
              name="fname"
              id="fname"
              placeholder="Your Name"
              type="text"
              required={true}
              label="Full Name"
              value={name}
              setChange={setName}
            />
            <FormField
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              required={true}
              label="Password"
              value={password}
              setChange={setPassword}
            />

            <input
              type="submit"
              value="Create an account"
              className={`flex py-3 px-3 bg-black text-white font-bold rounded cursor-pointer`}
            />
          </form>
        </div>
      </div>
      <div className={styles.signup__sidebar}>
        <img
          src="https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default signup;
