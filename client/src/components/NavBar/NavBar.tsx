import { useState } from 'react';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import useUser from '../../hooks/useUser';
import { Role } from '../../api/user.api';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();

  const isAdmin = user?.role === Role.POTTER_STEWARD;

  return (
    <Navbar color="primary" dark expand="lg" fixed="top">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Guestbook
        </NavLink>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/trips" className="nav-link">
                Trips
              </NavLink>
            </NavItem>
            {isAdmin && (
              <NavItem>
                <NavLink to="/add-trip" className="nav-link">
                  Add Trip
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav navbar className="ml-auto">
            <Profile />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
