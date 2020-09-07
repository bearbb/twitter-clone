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
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      setIsLogin(false);
      console.log(res.data);
      //if login successfully then push to home page
      history.push("/");
    } catch (axiosErr) {
      console.error(axiosErr.response.data.error);
      setError(axiosErr.response.data.error);
      setIsLogin(false);
    }
  };
  return (
    <div>
      <div className="login">
        <TwitterIcon className="login__twitterIcon twitterIcon"></TwitterIcon>
        <form className="login__form">
          <h2 className="loginForm__header">Login to your account</h2>
          {Object.keys(error)[0] === "credential" && (
            <span className="error-description">
              Credential: Wrong credentials, pls try again
            </span>
          )}
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
