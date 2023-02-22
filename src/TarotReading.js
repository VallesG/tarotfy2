import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useParams } from 'react-router-dom';

import Card from './Card';
import card1 from './card1.png';
import card2 from './card2.png';
import card3 from './card3.png';

const spotifyApi = new SpotifyWebApi();

const TarotReading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { playlistId, spreadName } = useParams();

  useEffect(() => {
    getAccessToken()
      .then((access_token) => {
        spotifyApi.setAccessToken(access_token);
        return spotifyApi.getPlaylistTracks(playlistId);
      })
      .then((data) => {
        setTracks(data.items.map((item) => item.track));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [playlistId]);

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handlePlaySong = () => {
    setSelectedTrack(null);
    const randomTracks = getThreeRandomTracks(tracks);
    const cards = [card1, card2, card3];
    randomTracks.forEach((track, index) => {
      track.card = cards[index];
    });
    setTracks(randomTracks);
  };

  return (
    <div>
      <h2>{spreadName}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={handlePlaySong}>Play Song</button>
          {selectedTrack ? (
            <div>
              <h3>Selected Track:</h3>
              <p>{selectedTrack.name}</p>
            </div>
          ) : (
            <div>
              <h3>Tracks:</h3>
              {tracks.map((track) => (
                <div key={track.id} onClick={() => handleSelectTrack(track)}>
                  <p>{track.name}</p>
                </div>
              ))}
            </div>
          )}
          <div>
            <h3>Cards:</h3>
            {tracks.map((track) => (
              <div key={track.id}>
                <Card image={track.card} onClick={() => handleSelectTrack(track)} />
                <p>{track.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const getAccessToken = async () => {
  const response = await fetch('/api/token');
  const data = await response.json();
  return data.access_token;
};

const getThreeRandomTracks = (tracks) => {
  const shuffledTracks = shuffleArray(tracks);
  return shuffledTracks.slice(0, 3);
};

const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default TarotReading;
