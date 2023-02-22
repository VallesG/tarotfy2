import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { getAccessToken } from './auth';

const spotifyApi = new SpotifyWebApi();

const PlaylistSelectionPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [selectedSpread, setSelectedSpread] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAccessToken()
      .then((access_token) => {
        spotifyApi.setAccessToken(access_token);
        return spotifyApi.getUserPlaylists();
      })
      .then((data) => {
        setPlaylists(data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectPlaylist = (event) => {
    setSelectedPlaylistId(event.target.value);
  };

  const handleSelectSpread = (event) => {
    setSelectedSpread(event.target.value);
  };

  const handleStartReading = () => {
    navigate(`/reading/${selectedPlaylistId}/${selectedSpread}`);
  };

  return (
    <div>
      <h2>Select a playlist and spread to start your reading:</h2>
      <label htmlFor="playlist-select">Select a playlist:</label>
      <select id="playlist-select" value={selectedPlaylistId} onChange={handleSelectPlaylist}>
        <option value="">-- Select a playlist --</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
        ))}
      </select>
      <br />
      <label htmlFor="spread-select">Select a spread:</label>
      <select id="spread-select" value={selectedSpread} onChange={handleSelectSpread}>
        <option value="">-- Select a spread --</option>
        <option value="relationship">Relationship spread</option>
        <option value="money">Money spread</option>
        <option value="future">Future spread</option>
      </select>
      <br />
      <button onClick={handleStartReading} disabled={!selectedPlaylistId || !selectedSpread}>Start Reading</button>
    </div>
  );
};

export default PlaylistSelectionPage;
