import React from "react";

function Home() {
  //Styles empty to test app
  const headerStyles = {};
const navStyles = {};
const mainStyles = {};
const podcastCardStyles = {};
const buttonStyles = {};
const footerStyles = {};

  return (
    <div>
      {/* Header Section */}
      <header style={headerStyles}>
        <h1>Welcome to My Podcast</h1>
        <p>Your favorite destination for insightful discussions and endless entertainment.</p>
      </header>

      {/* Navigation Bar */}
      <nav style={navStyles}>
        <a href="#home">Home</a>
        <a href="#episodes">Episodes</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Featured Episodes Section */}
      <main style={mainStyles}>
        <h2>Featured Episodes</h2>
        <div style={podcastCardStyles}>
          <h3>Episode 1: The Beginning</h3>
          <p>Join us as we dive into what inspired this podcast.</p>
          <button style={buttonStyles}>Listen Now</button>
        </div>
        <div style={podcastCardStyles}>
          <h3>Episode 2: Exploring the Unknown</h3>
          <p>Deep conversations about the mysteries of the universe.</p>
          <button style={buttonStyles}>Listen Now</button>
        </div>
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
