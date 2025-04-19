import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import PodcastList from './Podcasts/Podcasts';
import SeasonList from './Podcasts/Seasons';
import EpisodeList from './Podcasts/Episodes';
import EpisodeDetail from './Podcasts/EpisodeDetail';
import About from './Podcasts/About';
import FavoritesPage from '../src/Podcasts/Favorites';

function App() {
  return (
    <Router>
   <Navbar/>


      {/* Routes */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcasts" element={<PodcastList />} />
        <Route path="/podcasts/:podcastId" element={<SeasonList />} />
        <Route path="/about" element={<About />} />
        <Route path="/Favorites" element={<FavoritesPage />} />
        <Route path="/podcasts/:podcastId/seasons/:seasonId" element={<EpisodeList />} />
        <Route path="/podcasts/:podcastId/seasons/:seasonId/episodes/:episodeId" element={<EpisodeDetail />} />
      </Routes>
      
    </Router>

  );
}

export default App;

