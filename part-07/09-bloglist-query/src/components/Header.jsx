/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  const { user, logoutUser, loggedUser } = useUser();

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div>
      <Navbar>
        <Container>
          <Nav className="me-auto" collapseOnSelect expand="lg">
            <Nav.Link>
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Navbar.Text>
                Signed in as: {user.name}{' '}
                <Button variant="outline-danger" onClick={logoutUser}>
                  logout
                </Button>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Blogs</h1>

      <Notification />
    </div>
  );
}

export default Header;
