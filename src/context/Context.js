import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

const Provider = Context.Provider;

function MyContext({ children }) {
  const [listUser, setListUser] = useState([]);

  const getDataUser = async () => {
    const response = await axios.get("http://localhost:3004/users");
    if (response.status === 200) {
      setListUser(response.data);
    }
  };

  useEffect(() => {
    getDataUser();
  }, [setListUser]);

  return (
    <Provider
      value={{
        listUser,
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, MyContext };
