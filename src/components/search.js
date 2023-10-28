import React, { useState, useCallback, useEffect } from "react";
import "./search.css";

const Search = () => {
  const [motherId, setMotherId] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [loadingTitle, setLoadingTitle] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      debugger;
      const response = await fetch("http://172.31.158.228/distinct-values/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motherId, encounterId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("this is https");

      const data = await response.json();

      setOptions(data.distinct_values);
      setNoteTitle(data.distinct_values[0]);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }, [motherId, encounterId]);

  const handleNote = async () => {
    setLoadingTitle(true);
    try {
      const response = await fetch("http://172.31.158.228/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motherId, encounterId, noteTitle }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (
        result.Status === "Success" &&
        Array.isArray(result.Data) &&
        result.Data.length > 0
      ) {
        const data = result.Data[0];
        setNotes(data);
        setShowNotes(true);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoadingTitle(false);
    }
  };

  const handleSearch = async () => {
    setLoadingTitle(true);
    try {
      const response = await fetch("http://172.31.158.228/generate_response/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Update the content type
        },
        body: JSON.stringify({ query, result: notes }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setOutput(data.Data);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoadingTitle(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      <form>
        <label htmlFor="motherId">Mother ID:</label>
        <input
          type="text"
          value={motherId}
          onChange={(e) => setMotherId(e.target.value)}
          required
        />
        <br />

        <label htmlFor="encounterId">Encounter ID:</label>
        <input
          type="text"
          value={encounterId}
          onChange={(e) => setEncounterId(e.target.value)}
          required
        />
        <br />

        <label htmlFor="noteTitle">Note Title:</label>
        <select
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        >
          <option value="">Select a Note Title</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>

        <button type="button" onClick={handleNote}>
          Retrieve Note
        </button>

        <label htmlFor="query">Query:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <br />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>

      {loadingTitle && <div className="loader"></div>}
      {showNotes && notes && (
        <div className="result-container">
          <h3>Notes:</h3>
          <div className="scroll-box wider-box">{notes}</div>{" "}
          {/* Adjust width */}
          <br /> {/* Add line break */}
        </div>
      )}

      {output && (
        <div className="result-container">
          <h3>Answer:</h3>
          <div className="scroll-box">{output}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
