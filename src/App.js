import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import PlaylistSelectionPage from './PlaylistSelectionPage';
import RandomSongPlayer from './RandomSongPlayer';
import TarotReading from './TarotReading';
import card1 from './card1.png';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playlist-selection-page" element={<PlaylistSelectionPage />} />
        <Route path="/reading/:playlistId/:spread" element={<TarotReading />} />
        <Route path="/random-song-player/:playlistId" element={<RandomSongPlayer cardImage={card1} />} />
      </Routes>
    </Router>
  );
};

export default App;
