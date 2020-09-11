import React, { createContext } from "react";

export const UserContext = createContext({});

export const withUserContext = (Component, userData) => {
  return (props) => {
    return (
      <UserContext.Provider value={userData}>
        <Component></Component>
      </UserContext.Provider>
    );
  };
};
