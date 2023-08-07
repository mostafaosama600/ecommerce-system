/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext } from "react";
export const CounterContext = createContext(0);

const CounterContextProvider = (props) => {
  const value = {};

  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
