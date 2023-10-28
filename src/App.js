import React from "react";
import SearchQuery from "./components/SearchQuery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mother from "./components/search";
import Child from "./components/searchChild";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Query FHR</Link>
            </li>
            <li></li>
            <li>
              <Link to="/searchMotherNotes">Mother Notes</Link>
            </li>
            <li>
              <Link to="/searchChildNotes">Child Notes</Link>
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
