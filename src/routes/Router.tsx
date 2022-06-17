import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import { LandingPage } from '../components/presentational/landingPage/LandingPage';
import Login from '../components/presentational/login/LoginContainer';
import TopBarContainer from '../components/presentational/topBar/TopBarContainer';

const Container = styled.div`
  margin-top: 50px;
`;
export const Router = () => {
  return (
    <BrowserRouter>
      <TopBarContainer />
      <Container>
        <Routes>
          <Route path="/login" element={<Login isEnabled />} />
          <Route path="/page" element={<ArtistSearch />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
