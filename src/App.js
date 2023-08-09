import React from "react";
import SearchQuery from "./components/SearchQuery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Mother from "./components/search";
import Child from "./components/searchChild";

const App = () => {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <a href="/">Query FHR</a>
            </li>
            <li></li>
            <li>
              <a href="/searchMotherNotes">Mother Notes</a>
            </li>
            <li>
              <a href="/searchChildNotes">Child Notes</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<SearchQuery />} />
          <Route path="/searchMotherNotes" element={<Mother />} />
          <Route path="/searchChildNotes" element={<Child />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
