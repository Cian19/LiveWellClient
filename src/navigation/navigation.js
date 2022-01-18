import './navigation.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';

const Navigation = ({authState, setAuthState}) => {

  const history = useHistory();
  const signOut = useCallback => {
        
    history.push('/login');
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
      
    return (
        <div>
          <Router>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="light">
              <Nav.Item>
                <Nav.Link href="/">LiveWell</Nav.Link>
              </Nav.Item>
              <Navbar.Toggle aria-controls="responsive=navbar-nav" className="justify-content-end"/>
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                  <Nav>
                      
                  {!authState.status ? 
                  (
                      <>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/register">Register</Nav.Link>
                      </>
                  ): 
                  (
                    <>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link>{authState.username}</Nav.Link>
                    {authState.status && <Nav.Link onClick={signOut}>Logout</Nav.Link>}
                    <Link to="/getplan">
                      <button>Get Meal Plan</button>
                    </Link>
                  </>
                  )
                  }
                  </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Router>
        </div>
    )
}

export default Navigation;
