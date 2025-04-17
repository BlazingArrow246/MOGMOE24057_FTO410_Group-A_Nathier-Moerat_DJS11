import React from "react";
import { Link, useParams } from "react-router-dom";

function EpisodeList() {
  const { podcastId, seasonId } = useParams(); // Get IDs from URL
  const episodes = [
    { id: 1, title: "Episode 1", description: "Introduction to the season" },
    { id: 2, title: "Episode 2", description: "The journey continues" },
  ];

  return (
    <div>
      <h1>Episodes for Podcast {podcastId}, Season {seasonId}</h1>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          <Link to={`/podcasts/${podcastId}/seasons/${seasonId}/episodes/${episode.id}`}>Play</Link>
        </div>
      ))}
    </div>
  );
}

export default EpisodeList;
