import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import Login from '../components/presentational/login/LoginContainer';
import TopBarContainer from '../components/presentational/topBar/TopBarContainer';

export const Router = () => {
  return (
    <BrowserRouter>
      <TopBarContainer />
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/page">Sample Page</Link>
      <Routes>
        <Route path="/login" element={<Login isEnabled />} />
        <Route path="/page" element={<ArtistSearch />} />
        <Route path="/" element={<div>Root</div>} />
      </Routes>
    </BrowserRouter>
  );
};
