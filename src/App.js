import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/TableComponent";

function App() {
  const [data, setData] = useState([{}]);
  const [inputValue, setInputValue] = useState("");

  const checkBackend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/members");
      setData(response.data);
    } catch (error) {
      console.error("Error searching items", error);
    }
  };

  useEffect(() => {
    // checkBackend();
    fetch("http://localhost:5000/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const clearInput = (event) => {
    setInputValue("");
  };
  return (
    <div className="App">
      <div className="input">
        <h1> SBU-FHR Database </h1>
        <br />
        <input
          className="large-input"
          type="text"
          placeholder=" Use this search bar to query the SBU FHR Database using natural language text"
          value={inputValue}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <div className="btn">
          <button className="my-button" onClick={clearInput}>
            Clear
          </button>
          <button className="my-button">Submit</button>
        </div>
      </div>
      <TableComponent data={data} />
      {/* <div>
        {data.members.map((member) => (
          <p>member</p>
        ))}
      </div> */}
    </div>
  );
}

export default App;
