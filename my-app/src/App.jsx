import logo from './pages./logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Podcasts from "./pages/Podcasts";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:podcastId/episodes" element={<Episodes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
      </div>

    </Router>
  );
}


