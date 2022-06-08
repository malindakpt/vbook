import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import { Login } from '../components/presentational/login/Login';

export const Router = () => {
  return (
    <BrowserRouter>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/page">Sample Page</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<ArtistSearch />} />
        <Route path="/" element={<div>Root</div>} />
      </Routes>
    </BrowserRouter>
  );
};
