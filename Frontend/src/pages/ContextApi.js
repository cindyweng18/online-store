import React, { useState, createContext } from 'react';

export const ContextApi = createContext(true);
export const Context = (props) => {
  const [user, setUser] = useState({});
  return (
    <ContextApi.Provider
      value={{ User: [user, setUser] }}>
      {props.children}
    </ContextApi.Provider>
  );
}