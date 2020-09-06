import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import "./SignupNLogin.css";
import SignupFormInput from "./SignupFormInput";
import { FormContext } from "./FormContext";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const history = useHistory();
  const [buttonIsDisable, setButtonIsDisable] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  //Disable button when email and password is empty
  useEffect(() => {
    if (email !== "" && password !== "") {
      setButtonIsDisable(false);
    } else {
      setButtonIsDisable(true);
    }
    // console.log(buttonIsDisable);
  }, [email, password]);
  const loginSubmit = async () => {
    //while waiting for the token be return show a loading circle
    setIsLogin(true);
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      //login success return a token => store it somewhere
      //if login success => it will run code after this line
      //login success push to home page "/" with history
      // removeCookie("authorization", {
      //   domain: "https://asia-east2-twitter-clone-53ba9.cloudfunctions.net",
      //   path: "/",
      //   maxAge: 3600 * 30,
      //   secure: true,
      //   sameSite: "none",
      //   // httpOnly: true,
      // });
      // console.log("%cLogin successfully", "color:pink");
      // setCookie("authorization", `Bearer ${res.data.accessToken}`, {
      //   domain: "https://asia-east2-twitter-clone-53ba9.cloudfunctions.net",
      //   path: "/",
      //   maxAge: 3600 * 30,
      //   secure: true,
      //   sameSite: "none",
      //   // httpOnly: true,
      // });
      setIsLogin(false);
      history.push("/");
    } catch (axiosError) {
      //check if dat error is about auth or the other one
      //if it is about auth change the error and set the error to null
      console.error(axiosError.response);
      setIsLogin(false);
      // setError(axiosError.response.data.error);
    }
  };
  return (
    <div>
      <div className="login">
        <TwitterIcon className="login__twitterIcon twitterIcon"></TwitterIcon>
        <form className="login__form">
          <h2 className="loginForm__header">Login to your account</h2>
          {/* email input */}
          <FormContext.Provider
            value={{
              field: email,
              errorCode: "email",
              setField: setEmail,
              error,
              description: "Email",
            }}
          >
            <SignupFormInput />
          </FormContext.Provider>
          {/* password input */}
          <FormContext.Provider
            value={{
              field: password,
              errorCode: "password",
              setField: setPassword,
              error,
              description: "Password",
            }}
          >
            <SignupFormInput />
          </FormContext.Provider>
          {isLogin ? (
            <ClipLoader
              loading={isLogin}
              size={50}
              className="isLoading"
            ></ClipLoader>
          ) : (
            <Button
              onClick={() => {
                loginSubmit();
              }}
              className={`login__button submit-button ${
                buttonIsDisable && "disabled-button"
              }`}
              color="primary"
              variant="contained"
              disableElevation
              disabled={buttonIsDisable}
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
