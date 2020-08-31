import React, { useContext } from "react";
import { FormContext } from "./FormContext";

function SignupFormInput() {
  //check all field avail [email, name, username, password, confirmPassword]
  //check if error name === field name => light it up
  const { field, errorCode, setField, error, description } = useContext(
    FormContext
  );
  let type;
  if (errorCode === "password" || errorCode === "confirmPassword") {
    type = "password";
  } else {
    type = "text";
  }
  return (
    <div className="signupForm__container">
      <div
        className={`signupFormInput__container ${
          Object.keys(error)[0] === errorCode && "container--error"
        }`}
      >
        <span className="signupFormInput__description">{description}</span>
        <input
          type={`${type}`}
          className={`signupForm__input`}
          onChange={(e) => {
            setField(e.target.value);
          }}
        />
      </div>
      {Object.keys(error)[0] === errorCode && (
        <span className="error-description">
          {error[Object.keys(error)[0]]}
        </span>
      )}
    </div>
  );
}
export default SignupFormInput;
