import React from "react";
import "../App.css";
import "./searchQuery.css";
import { useState, useRef } from "react";
import TableComponent from "./TableComponent";
import { FaSearch } from "react-icons/fa";
import Spinner from "./Spinner";

export default function SearchQuery() {
  const [apiData, setApiData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const textareaRef = useRef(null);
  const [sqlQuery, setSqlQuery] = useState(null);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSqlChange = (event) => {
    setFlag(true);
    setSqlQuery(event.target.value);
  };
  const handleSubmit = async () => {
    setApiData([]);
    setLoading(true);

    const formData = new FormData();
    if (flag == false) {
      formData.append("nlq", inputValue);
    } else {
      formData.append("nlq", sqlQuery);
    }
    const response = await fetch("http://172.31.158.228/generate/", {
      method: "POST",
      body: formData,
    });
    if (response.status != 500) {
      const data = await response.json();
      setApiData(data);
      setSqlQuery(data.SQL);
      setLoading(false);
    }
  };

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (event) => {
    setInputValue(event?.target?.value);
    fetchData(event?.target?.value);
    if (event.target.value == "") {
      setApiData([]);
    }
  };

  const clearInput = (event) => {
    setInputValue("");
    fetchData(event?.target?.value);
    setApiData([]);
  };
  return (
    <>
      <div className="body">
        <h1> SBU-FHR Database </h1>
        <br />
        <div className="search-bar-container">
          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Query using Natural Language. Try: How many mothers are there in database? "
              value={inputValue}
              onChange={(event) => handleChange(event)}
            />
          </div>
          {apiData?.Status == "Failed" && (
            <div>
              <div className="query-error">
                No Results Generated, Please edit the SQL query
              </div>
              <textarea
                ref={textareaRef}
                className="sql-query"
                value={sqlQuery}
                onChange={handleSqlChange}
              />
            </div>
          )}

          <div className="results-list">
            {results.length > 0 &&
              results.map((result, index) => {
                return (
                  <div
                    className="search-result"
                    onClick={(e) => alert(`You Clicked on ${result.name}`)}
                    key={index}
                  >
                    {result.name}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="btn">
          <button className="my-button" onClick={clearInput}>
            Clear
          </button>
          <button className="my-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {loading && <Spinner />}
      {apiData?.Rows?.length >= 1 && <TableComponent data={apiData} />}
      {/* {<TableComponent data={apiData} />} */}
      {/* <div>
            {apiData.Columns.map((member) => (
              <p>{member}</p>
            ))}
          </div> */}
    </>
  );
}
