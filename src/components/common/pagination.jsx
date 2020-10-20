import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { totalMovies, numberOfMoviesEachPage } = props;
  const pagesCount = totalMovies / numberOfMoviesEachPage;
  if (pagesCount <= 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                props.currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => props.onClick(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  numberOfMoviesEachPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
