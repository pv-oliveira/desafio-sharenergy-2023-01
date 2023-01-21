import React, { useState, useEffect } from "react";

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  paginate: Function
}

import "./pagination.styles.css";
const Pagination = ({totalPosts, postsPerPage, currentPage, paginate}: PaginationProps) => {
  const [items, setItems] = useState<Array<Object>>([]);  // Hook where access to pages is stored   // Hook em que acesso as paginas fica armazenado
  const pages = Math.ceil(totalPosts / postsPerPage);     // Variable that stores the total number of pages   //Varivael que armazena o total de páginas
  
  
  // Function called on component loading that is responsable for making list of pages
  // Função chamada no carregamento do componente que é responsável por fazer lista de páginas
  useEffect(() => {
    const pageNumbers = [];

    let i = 1;
    while (i <= pages) {
      const key = i;
      pageNumbers.push(
        <button
          className={key === currentPage ? "selected-page" : ""}
          key={key}
          onClick={() => paginate(key)}
        >
          {key}
        </button>
      );
      i++;
    }
    setItems(pageNumbers);
  }, [currentPage, totalPosts]);

  return (
      <div className="pagination-container">
        <span><>{items}</></span>
      </div>
  );
};

export default Pagination;
