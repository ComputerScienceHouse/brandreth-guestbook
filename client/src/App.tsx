import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { NavBar } from './components/NavBar';
import { AddTrip } from './pages/AddTrip';
import { Home } from './pages/Home';
import { Trips } from './pages/Trips';

const App = () => (
  <Container className="main" fluid>
    <NavBar />
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/add-trip" element={<AddTrip />} />
      </Routes>
    </Container>
  </Container>
);

export default App;
