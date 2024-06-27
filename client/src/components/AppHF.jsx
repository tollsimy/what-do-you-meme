import React from 'react';
import { useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.mjs';
import { UserContext } from '../contexts/userContext.jsx';

function AppHeader() {

    const navigate = useNavigate();

    const { user, contextLogin, contextLogout } = useContext(UserContext);

    const logoutFunc = () => {
        API.logout()
            .then((response) => {
                if (response.status === 200) {
                    contextLogout();
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleOpenProfile = () => {
        if (!user) navigate('/login');
        else {
            navigate('/profile');
        }
    }

    return (
        <header style={{ paddingTop: '50px' }}>
            <Navbar className="header-footer-color fixed-top">
                <Container fluid>
                    <Nav>
                        <Nav.Link onClick={() => navigate("/")}>
                            <i className="bi bi-house h3"></i>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Brand>
                        <img
                            src="/images/site-images/logo.png"
                            width="300"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Nav>
                        <Navbar.Collapse id="navbar">
                            <Nav>
                                <Nav.Link onClick={handleOpenProfile}>
                                    <i className="bi bi-person-circle h3"></i>
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown id="nav-dropdown" align="end">
                                    <NavDropdown.Item onClick={() => navigate("/login")} hidden={user}>
                                        Login
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/signup")} hidden={user}>
                                        Signup
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/profile")} hidden={!user}>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutFunc} hidden={!user}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

function AppFooter() {
    return (
        <footer className="footer mt-auto py-3 header-footer-color fixed-bottom">
            <div className="container text-center">
                <span className="text-muted">Developed by tollsimy, 2024, WA1, PoliTO</span>
            </div>
        </footer>
    );
}

export { AppHeader, AppFooter }