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
  const [listFilm, setListFilm] = useState([]);
  const [state, setState] = useState(initialState);

  const getDataUser = async () => {
    const response = await axios.get("https://k8r87v-8080.csb.app/users");
    if (response.status === 200) {
      setListUser(response.data);
    }
  };

  const getDataFilm = async () => {
    const response = await axios.get("https://k8r87v-8080.csb.app/films");
    if (response.status === 200) {
      setListFilm(response.data);
    }
  };

  useEffect(() => {
    getDataUser();
    const userStore = window.localStorage.getItem("username");
    setState({ ...state, username: userStore });
  }, [setListUser]);

  useEffect(() => {
    getDataUser();
    getDataFilm();
  }, []);

  return (
    <Provider
      value={{
        listUser,
        listFilm,
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, MyContext };
