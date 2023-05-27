import React from "react";
import "./NumberedPages.css";
import { useGlobalContext } from "../context";

const NumberedPages = () => {
  const { cocktails, setPage, page, loading } = useGlobalContext();
  const handlePage = (index) => {
    setPage(index);
  };

  const numberedPages = cocktails.map((item, index) => {
    return (
      <button
        key={index}
        className={`pagination-btn ${page === index ? "active" : null}`}
        onClick={() => handlePage(index)}
      >
        {index + 1}
      </button>
    );
  });
  if (loading) return <div>loading...</div>;
  return <div className="pagination-box">{numberedPages}</div>;
};

export default NumberedPages;
