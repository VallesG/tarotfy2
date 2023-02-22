const CLIENT_ID = '4142f87e472445c182f3a15b1f1025cf';
const REDIRECT_URI = 'http://localhost:3000/playlist-selection-page'; // Replace with your own redirect URI

export const getAccessToken = () => {
  // Check if the access token is already stored in the session storage
  const accessToken = sessionStorage.getItem('spotify_access_token');
  const expiresAt = sessionStorage.getItem('spotify_access_token_expires_at');
  if (accessToken && expiresAt && new Date().getTime() < expiresAt) {
    // Access token is still valid, return it
    return Promise.resolve(accessToken);
  }

  // Access token is not stored or has expired, fetch a new one
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const newAccessToken = hashParams.get('access_token');
  const expiresIn = hashParams.get('expires_in');
  if (newAccessToken && expiresIn) {
    const expiresAt = new Date().getTime() + expiresIn * 1000;
    sessionStorage.setItem('spotify_access_token', newAccessToken);
    sessionStorage.setItem('spotify_access_token_expires_at', expiresAt);
    return Promise.resolve(newAccessToken);
  }

  // Access token is not available, redirect user to Spotify authorization
  const scope = encodeURIComponent('user-read-private playlist-read-private');
  window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scope}`;

  return Promise.reject('Access token not available');
};

export const getAuthUrl = () => `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent('user-read-private playlist-read-private')}`;
