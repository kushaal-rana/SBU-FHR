import React, { useState } from "react";

const TableComponent = (props) => {
  const itemsPerPage = 5; // Number of items to display per page
  const totalPages = Math.ceil(props.data.Rows.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.Rows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    const startButton =
      currentPage <= Math.ceil(maxButtonsToShow / 2)
        ? 1
        : currentPage >= totalPages - Math.floor(maxButtonsToShow / 2)
        ? totalPages - maxButtonsToShow + 1
        : currentPage - Math.floor(maxButtonsToShow / 2);

    for (let i = startButton; i < startButton + maxButtonsToShow; i++) {
      if (i <= totalPages) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePaginationClick(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="table-container">
      <h2>Table </h2>
      <div className="table-scrollable">
        <table className="table">
          <thead>
            <tr>
              {props?.data?.Columns?.map((colName, index) => (
                <th key={index}>{colName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((items, index) => (
              <tr key={index}>
                {items.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">{renderPaginationButtons()}</div>
    </div>
  );
};

export default TableComponent;
