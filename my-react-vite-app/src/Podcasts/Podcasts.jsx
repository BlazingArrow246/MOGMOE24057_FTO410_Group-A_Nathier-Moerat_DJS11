import React from "react";
import { Link } from "react-router-dom";

function PodcastList() {
  const podcasts = [
    { id: 1, title: "Podcast One", description: "The first podcast" },
    { id: 2, title: "Podcast Two", description: "The second podcast" },
  ];

  return (
    <div>
      <h1>Podcasts</h1>
      {podcasts.map((podcast) => (
        <div key={podcast.id}>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <Link to={`/podcasts/${podcast.id}`}>View Seasons</Link>
        </div>
      ))}
    </div>
  );
}

export default PodcastList;
