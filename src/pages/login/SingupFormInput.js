import React from "react";

function SingupFormInput({ placeholder }) {
  let inputType, description;
  if (placeholder === "password" || placeholder === "confirmPassword") {
    inputType = "password";
  } else if (placeholder === "email") {
    inputType = "email";
  } else {
    inputType = "text";
  }
  switch (placeholder) {
    case "password":
      description = "Password";
      break;
    case "confirmPassword":
      description = "Password confirmation";
      break;
    case "name":
      description = "Name";
      break;
    case "email":
      description = "Email";
      break;
    case "username":
      description = "Username";
      break;
    default:
      break;
  }
  return (
    <div className="signupFormInput__container">
      <span className="signupFormInput__description">{description}</span>
      <input
        type={`${inputType}`}
        className={`signupForm__input ${placeholder}-input`}
      />
    </div>
  );
}
export default SingupFormInput;
