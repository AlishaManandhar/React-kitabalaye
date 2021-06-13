import React from "react";
import _ from "lodash";

class Pagination extends React.Component {
  renderPage = () => {
      const { itemsCount, currentPage, pageSize, onPageChange} = this.props
    const range = Math.ceil(itemsCount / pageSize);
    if (range === 1) return null;
    const pages = _.range(1, range + 1);
    

    return pages.map((page) => (
      <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
        <button
         href="#"
          onClick={() => onPageChange(page)}
          className="page-link"
        >
          {page}
        </button>
      </li>
    ));
  };

  render() {
    return (
      <nav>
        <ul className="pagination">
          {this.renderPage()}
       
        </ul>
      </nav>
    );
  }
}

export default Pagination;
