import React, { useState, useEffect } from "react";
import "./search.css";

const SearchChild = () => {
  const [childPersonId, setChildPersonId] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [showNotes, setShowNotes] = useState(false); // Introduce state variable to control what to display

  // Fetch the options from the backend API
  useEffect(() => {
    const apiUrl = `http://172.31.158.228/distinct-values-child-notes/?childPersonId=${encodeURIComponent(
      childPersonId
    )}&encounterId=${encodeURIComponent(encounterId)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.distinct_values); // Store the fetched options in the "options" state
        setNoteTitle(data.distinct_values[0]); // Set the default value for the select element
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [childPersonId, encounterId]);

  const handleNote = () => {
    const apiUrl = `http://172.31.158.228/search-child-notes/?childPersonId=${encodeURIComponent(
      childPersonId
    )}&encounterId=${encodeURIComponent(
      encounterId
    )}&noteTitle=${encodeURIComponent(noteTitle)}`;

    // Update the state with the API response
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setShowNotes(true); // Store the API response in the "result" state
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = () => {
    // Call the "generate-response" API with the query and result
    const secondApiUrl = `http://172.31.158.228/generate-response/?query=${encodeURIComponent(
      query
    )}&result=${encodeURIComponent(result.data)}`;

    fetch(secondApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOutput(data);
        setShowNotes(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="childPersonId">Child Person ID:</label>
        <input
          type="text"
          value={childPersonId}
          onChange={(e) => setChildPersonId(e.target.value)}
          required
        />
        <br />

        <label htmlFor="encounterId">Child Encounter ID:</label>
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
            options.map(
              (
                option,
                index // Add a check for options before mapping
              ) => (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            )}
        </select>
        <br />

        <button type="button" onClick={handleNote}>
          Retrieve Note
        </button>
        <br />

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

      {result && (
        <div className="result-container">
          {showNotes ? (
            //      <div className="container mt-5">
            //      <Table striped bordered hover>
            //        <thead>
            //          <tr>
            //            <th>Field</th>
            //            <th>Value</th>
            //          </tr>
            //        </thead>
            //        <tbody>{renderTableRows(result)}</tbody>
            //      </Table>
            //    </div>
            // Display only notes
            <>
              <h3>Notes:</h3>
              <pre>{result.data}</pre>
            </>
          ) : (
            // Display both answer and notes
            <>
              <h3>Answer:</h3>
              <pre>{output}</pre>
              <h3>Notes:</h3>
              <pre>{result.data}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchChild;
