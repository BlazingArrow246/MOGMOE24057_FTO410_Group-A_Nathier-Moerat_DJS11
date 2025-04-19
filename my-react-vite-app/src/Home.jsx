import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

function Home() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch the podcasts from the API
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        //  take only the first two for this example
        setPodcasts(data.slice(0, 2));
      })
      .catch((error) => console.error("Error fetching podcasts:", error));
  }, []);
 
  return (
    <div>
      {/* Header Section */}
      <header >
        <h1>The Listening Lounge 🎧</h1>
        <p>Stream📽. Listen👂. Lounge💆.</p>
      </header>

      {/* Featured Episodes Section */}
      <main >
        <h2>Featured Episodes ❤️‍🔥</h2>
        {podcasts.map((podcast) => (

          <div key={podcast.id} >
            
            <h3>{podcast.title}</h3>

            {podcast.image && (
              <img
                src={podcast.image}
                alt={`${podcast.title} cover`}
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}

            <p>{podcast.description}</p>
            
          
            {/* "Listen Now" Button as a Link */}
            <Link to={`/podcasts/${podcast.id}`} style={{ textDecoration: 'none' }}>
              <button>Listen Now</button>
            </Link>
          </div>
        ))}
        
      </main>

      {/* Footer Section */}
      <footer style={{ marginTop: '20px' }}>
        <p>&copy; 2025 The Listening Lounge | All rights reserved</p>
        <p>
          Follow us on <a href="https://x.com/">Twitter</a> | <a href="https://www.instagram.com/">Instagram</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
