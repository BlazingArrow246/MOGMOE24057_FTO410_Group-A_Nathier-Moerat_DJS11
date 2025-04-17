import React, { useState, useEffect } from "react";


function Home() {
  //Styles empty to test app
  const headerStyles = {};
  const mainStyles = { marginBottom: "20px" };
  const podcastCardStyles = {};
  const buttonStyles = {};
  const footerStyles = {};
  const audioStyles = { display: "block", marginTop: "10px" };

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch the podcasts from the API
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of podcasts, take only the first two for this example
        setPodcasts(data.slice(0, 2)); // Adjust as needed
      })
      .catch((error) => console.error("Error fetching podcasts:", error));
  }, []);
 
  return (
    <div>
      {/* Header Section */}
      <header style={headerStyles}>
        <h1>The Listening Lounge</h1>
        <p>Stream. Listen. Lounge.</p>
      </header>

      {/* Featured Episodes Section */}
      <main style={mainStyles}>
        <h2>Featured Episodes</h2>
        {podcasts.map((podcast, index) => (
          <div key={podcast.id} style={podcastCardStyles}>
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            
            {/* "Listen Now" Button */}
            <button
              style={buttonStyles}
              onClick={() => {
                const audioPlayer = document.getElementById(`audio-${index}`);
                if (audioPlayer) audioPlayer.play();
              }}
            >
              Listen Now
            </button>
            {/* Audio Element */}
            <audio id={`audio-${index}`} style={audioStyles} controls>
              <source src={podcast.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </main>

      {/* Footer Section */}
      <footer style={footerStyles}>
        <p>&copy; 2025 My Podcast | All rights reserved</p>
        <p>
          Follow us on <a href="#">Twitter</a> | <a href="#">Instagram</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
