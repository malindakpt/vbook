import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from '../components/container/Home';
import { Login } from '../components/presentational/login/Login';

export const Router = () => {
  return (
    <BrowserRouter>
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
