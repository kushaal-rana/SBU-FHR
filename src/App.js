import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/TableComponent";
import { FaSearch } from "react-icons/fa";

function App() {
  const [data, setData] = useState([{}]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);

  const checkBackend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/members");
      setData(response.data);
    } catch (error) {
      console.error("Error searching items", error);
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
        console.log(results);
        setResults(results);
      });
  };

  // useEffect(() => {
  // checkBackend();
  //   fetch("http://localhost:5000/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  const handleChange = (event) => {
    setInputValue(event?.target?.value);
    fetchData(event?.target?.value);
  };

  const clearInput = (event) => {
    setInputValue("");
    fetchData(event?.target?.value);
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
              type="text"
              placeholder="Use this search bar to query the SBU FHR Database using natural language text"
              value={inputValue}
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="results-list">
            {console.log(results, "RESSS")}
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
          <button className="my-button">Submit</button>
        </div>
      </div>
      {/* {console.log(data, data.length, "WTDFFFF")} */}
      {data.length > 1 && <TableComponent data={data} />}
      {/* <div>
        {data.members.map((member) => (
          <p>member</p>
          ))}
        </div> */}
    </>
  );
}

export default App;
