import React, { useContext } from "react";
import { FormContext } from "./FormContext";

function SignupFormInput() {
  //check all field avail [email, name, username, password, confirmPassword]
  //check if error name === field name => light it up
  const {
    field,
    fieldName: errorCode,
    setField,
    error,
    description,
  } = useContext(FormContext);
  console.log(Object.keys(error)[0]);
  //TODO: Check what happen when login
  return (
    <div className="signupForm__container">
      <div
        className={`signupFormInput__container ${
          Object.keys(error)[0] === errorCode && "container--error"
        }`}
      >
        <span className="signupFormInput__description">{description}</span>
        <input
          type="email"
          className={`signupForm__input ${description}-input`}
          value={field}
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
