import React from "react";

const Paginate = (newCocktails) => {
  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(newCocktails.length / itemsPerPage);
  const finalCocktails = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    return newCocktails.slice(start, end);
  });
  console.log(finalCocktails, "final-cocktails");
  return finalCocktails;
};

export default Paginate;

// function pagination(arr, page, prePage) {
//   const start = (page - 1) * prePage;
//   const end = page * prePage;
//   return arr.slice(start, end);
// }
