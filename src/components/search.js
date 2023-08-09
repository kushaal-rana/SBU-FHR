import React, { useState, useEffect } from "react";
import "./search.css";

const Search = () => {
  const [motherId, setMotherId] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [showNotes, setShowNotes] = useState(false); // Introduce state variable to control what to display

  useEffect(() => {
    // Fetch the options from the backend API
    const apiUrl = `http://172.31.158.228/distinct-values/?motherId=${encodeURIComponent(
      motherId
    )}&encounterId=${encodeURIComponent(encounterId)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.distinct_values);
        setNoteTitle(data.distinct_values[0]);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [motherId, encounterId]);

  const handleNote = () => {
    const apiUrl = `http://172.31.158.228/search/?motherId=${encodeURIComponent(
      motherId
    )}&encounterId=${encodeURIComponent(
      encounterId
    )}&noteTitle=${encodeURIComponent(noteTitle)}`;

    // Update the state with the API response
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setResult(data); // Store the API response in the "result" state
        setShowNotes(true); // Set showNotes to true to display only notes
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const handleNote = () => {
  //   const apiUrl = `http://127.0.0.1:8000/search/?motherId=${encodeURIComponent(
  //          motherId
  //       )}&encounterId=${encodeURIComponent(encounterId)}&noteTitle=${encodeURIComponent(
  //          noteTitle
  //       )}`;

  //   // First API call to get data
  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Store the API response in the "result" state
  //       //setResult(data);

  //       // Use the obtained data to form the URL for the second API call
  //       const prompt = "summarize the complete information into a table and return the response in json format";
  //       const secondApiUrl = `http://127.0.0.1:8000/generate-response/?query=${encodeURIComponent(
  //                  prompt
  //               )}&result=${encodeURIComponent(data.data)}`;

  //       // Make the second API call
  //       fetch(secondApiUrl)
  //         .then(response => response.json())
  //         .then(secondData => {

  //           setResult(secondData);
  //           setShowNotes(true);           // Do something with the second API response
  //           console.log('Second API Response:', secondData);
  //         })
  //         .catch(error => {
  //           console.error('Error in second API call:', error);
  //         });
  //     })
  //     .catch(error => {
  //       console.error('Error in first API call:', error);
  //     });
  // };

  const handleSearch = () => {
    // Call the "generate-response" API with the query and result
    const secondApiUrl = `http://172.31.158.228/generate-response/?query=${encodeURIComponent(
      query
    )}&result=${encodeURIComponent(result.data)}`;

    fetch(secondApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOutput(data);
        setShowNotes(false); // Set showNotes to false to display both answer and notes
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const renderTableRows = (data) => {
  //   return Object.entries(data).map(([sectionTitle, sectionData]) => (
  //     <React.Fragment key={sectionTitle}>
  //       <tr>
  //         <th colSpan="2">{sectionTitle}</th>
  //       </tr>
  //       {Object.entries(sectionData).map(([key, value]) => (
  //         <tr key={key}>
  //           <td>{key}</td>
  //           <td>{value}</td>
  //         </tr>
  //       ))}
  //     </React.Fragment>
  //   ));
  // };

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

      {/* Display the API response */}
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

export default Search;
