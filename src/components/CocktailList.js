import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useEffect } from "react";
import { useGlobalContext } from "../context";
import NumberedPages from "./NumberedPages";
import Pagination from "./Paginate";
export default function CocktailList() {
  const {
    cocktails,
    loading,
    cocktailsPage,
    page,
    setCocktailsPage,
    run,
    setRun,
    setSearchTerm,
  } = useGlobalContext();
  useEffect(() => {
    if (loading) return;

    setCocktailsPage(cocktails[page]);

    // eslint-disable-next-line
  }, [page, loading, cocktails]);
  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  if (!cocktailsPage) return <div>no pages to show</div>;
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktailsPage.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
      <NumberedPages />
    </section>
  );
}
