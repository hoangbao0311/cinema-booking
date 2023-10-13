import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

const Provider = Context.Provider;

const initialState = {
  email: "",
  password: "",
  username: "",
};

function MyContext({ children }) {
  const [listUser, setListUser] = useState([]);

  const [state, setState] = useState(initialState);

  const getDataUser = async () => {
    const response = await axios.get("http://localhost:3004/users");
    if (response.status === 200) {
      setListUser(response.data);
    }
  };

  useEffect(() => {
    getDataUser();
    const userStore = window.localStorage.getItem('username');
		setState({ ...state, username: userStore });
  }, [setListUser]);

  return (
    <Provider
      value={{
        listUser,
        state, setState
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, MyContext };
