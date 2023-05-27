import React, { useState, useContext, useEffect, useRef } from "react";
import { useCallback } from "react";
import Paginate from "./components/Paginate";
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [cocktailsPage, setCocktailsPage] = useState([]);
  const [page, setPage] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const mounted = useRef(false);

  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      console.log(data);
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        setCocktails(Paginate(newCocktails));
        setFiltered(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);
  const searchedCocktails = () => {
    const filteredCocktails = filtered.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredCocktails;
  };
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (loading) return;

    setCocktails(Paginate(searchedCocktails()));
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        searchTerm,
        setSearchTerm,
        cocktailsPage,
        page,
        setCocktailsPage,
        setPage,
        setCocktails,
        filtered,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
