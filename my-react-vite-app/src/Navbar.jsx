import React from "react";
import { Link, useNavigate} from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/podcasts">Podcasts</Link>
      <Link to="/About">About</Link>
      <Link to="/Favorites">View Favorites</Link>
    </nav>
  );
}

export default Navbar;
