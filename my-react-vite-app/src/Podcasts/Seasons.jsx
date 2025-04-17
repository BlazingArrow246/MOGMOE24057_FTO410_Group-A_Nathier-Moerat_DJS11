import React from "react";
import { Link, useParams } from "react-router-dom";

function SeasonList() {
  const { podcastId } = useParams(); // Get podcast ID from URL
  const seasons = [
    { id: 1, seasonNumber: "Season 1", episodes: 10 },
    { id: 2, seasonNumber: "Season 2", episodes: 8 },
  ];

  return (
    <div>
      <h1>Seasons for Podcast {podcastId}</h1>
      {seasons.map((season) => (
        <div key={season.id}>
          <h2>{season.seasonNumber}</h2>
          <p>{season.episodes} Episodes</p>
          <Link to={`/podcasts/${podcastId}/seasons/${season.id}`}>View Episodes</Link>
        </div>
      ))}
    </div>
  );
}

export default SeasonList;
