import React, { createContext, useEffect, useState } from "react";

const searchContext = createContext();

const Provider = searchContext.Provider;

function AppSearch({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Provider
      value={{
        setSearchResults,
        searchResults,
        setNoResults,
        noResults,
        setSearch,
        search,
      }}
    >
      {children}
    </Provider>
  );
}

export { searchContext, AppSearch };
