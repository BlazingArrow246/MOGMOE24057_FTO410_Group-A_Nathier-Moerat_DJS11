import React, { useState, useEffect } from "react";


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
        <h1>The Listening Lounge</h1>
        <p>Stream. Listen. Lounge.</p>
      </header>

      {/* Featured Episodes Section */}
      <main >
        <h2>Featured Episodes</h2>
        {podcasts.map((podcast, index) => (
          <div key={podcast.id} >
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            
            {/* "Listen Now" Button */}
            <button
              onClick={() => {
                const audioPlayer = document.getElementById(`audio-${index}`);
                if (audioPlayer) audioPlayer.play();
              }}
            >
              Listen Now
            </button>
            {/* Audio Element */}
            <audio id={`audio-${index}`} controls>
              <source src={podcast.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </main>

      {/* Footer Section */}
      <footer >
        <p>&copy; 2025 My Podcast | All rights reserved</p>
        <p>
          Follow us on <a href="https://x.com/">Twitter</a> | <a href="https://www.instagram.com/">Instagram</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
