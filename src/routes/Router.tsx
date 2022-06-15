import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import Login from '../components/presentational/login/LoginContainer';
import TopBarContainer from '../components/presentational/topBar/TopBarContainer';

const Container = styled.div`
  // margin-top: 50px;
`;
export const Router = () => {
  return (
    <BrowserRouter>
      <TopBarContainer />
      {/* <Link to="/page">Sample Page</Link> */}
      <Container>
        <Routes>
          <Route path="/login" element={<Login isEnabled />} />
          <Route path="/page" element={<ArtistSearch />} />]
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
