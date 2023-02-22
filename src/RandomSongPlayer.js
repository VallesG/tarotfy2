import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useParams } from 'react-router-dom';
import { getAccessToken } from './auth';

const spotifyApi = new SpotifyWebApi();

const RandomSongPlayer = ({ playlistId }) => {
  const [track, setTrack] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const { spreadName } = useParams();

  useEffect(() => {
    getAccessToken()
      .then((access_token) => {
        spotifyApi.setAccessToken(access_token);
        return spotifyApi.getPlaylistTracks(playlistId);
      })
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const track = data.items[randomIndex].track;
        setTrack(track);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [playlistId]);

  const handleCardClick = () => {
    setIsCardFlipped(true);
  };

  const handleCardClose = () => {
    setIsCardFlipped(false);
  };

  return (
    <div>
      <h2>{spreadName}</h2>
      {track ? (
        <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isCardFlipped ? (
            <div style={{ position: 'relative' }}>
              <img src={track.album.images[1].url} alt={track.album.name} style={{ maxWidth: '300px' }} />
              <audio src={track.preview_url} controls autoPlay style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 999 }} />
              <button onClick={handleCardClose} style={{ position: 'absolute', top: 0, right: 0 }}>X</button>
            </div>
          ) : (
            <div style={{ position: 'absolute', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={track.album.images[1].url} alt={track.album.name} style={{ maxWidth: '300px' }} />
              <button onClick={handleCardClick}>Flip Card</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading track...</p>
      )}
    </div>
  );
};

export default RandomSongPlayer;
