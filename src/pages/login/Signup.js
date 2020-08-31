import React, { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import SignupFormInput from "./SignupFormInput";
import "./SignupNLogin.css";
import axios from "axios";
import { FormContext } from "./FormContext";
import { useHistory } from "react-router-dom";
axios.defaults.baseURL =
  "https://asia-east2-twitter-clone-53ba9.cloudfunctions.net/api";
function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [buttonIsDisable, setButtonIsDisable] = useState(true);
  const history = useHistory();
  //Disable button when input is all empty
  useEffect(() => {
    if (
      email !== "" &&
      name !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setButtonIsDisable(false);
    } else {
      setButtonIsDisable(true);
    }
  }, [email, password, name, username, confirmPassword]);
  const signupSubmit = async () => {
    //TODO: create a loading state
    try {
      const res = await axios.post("/signup", {
        email,
        password,
        confirmPassword,
        userName: username,
        displayName: name,
        avatar: "",
      });
      console.log(res.data);
      //if there is no error => use react router dom to push to home
      history.push("/");
    } catch (axiosError) {
      //if there is error => show error base on response in description
      console.log(axiosError.response.data.error);
      setError(axiosError.response.data.error);
    }
  };
  return (
    <div className="signup">
      <TwitterIcon className="signup__twitterIcon twitterIcon"></TwitterIcon>
      <form className="signup__form">
        <h2 className="signupForm__header">Create your account</h2>
        {/* UseContext to change email state on the higher components */}
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

        <FormContext.Provider
          value={{
            field: name,
            errorCode: "displayName",
            setField: setName,
            error,
            description: "Name",
          }}
        >
          <SignupFormInput />
        </FormContext.Provider>

        <FormContext.Provider
          value={{
            field: username,
            errorCode: "userName",
            setField: setUsername,
            error,
            description: "Username",
          }}
        >
          <SignupFormInput />
        </FormContext.Provider>
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
        <FormContext.Provider
          value={{
            field: confirmPassword,
            errorCode: "confirmPassword",
            setField: setConfirmPassword,
            error,
            description: "Password confirmation",
          }}
        >
          <SignupFormInput />
        </FormContext.Provider>
        <Button
          className={`signup__button submit-button ${
            buttonIsDisable && "disabled-button"
          }`}
          color="primary"
          variant="contained"
          onClick={() => {
            signupSubmit();
          }}
          disabled={buttonIsDisable}
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
export default Signup;
