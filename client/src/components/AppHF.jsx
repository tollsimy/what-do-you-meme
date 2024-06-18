import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

function AppHeader() {
    return (
        <header>
            <Navbar className="bg-body-tertiary fixed-top">
                <Container fluid>
                    <Nav>
                        <Nav.Link href="/">
                            <i className="bi bi-house h3"></i>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Brand href="/">What do you meme?</Navbar.Brand>
                    <Nav>
                        <Navbar.Collapse id="navbar">
                            <Nav>
                                <Nav.Link href="/profile">
                                    <i className="bi bi-person-circle h3"></i>
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown id="nav-dropdown" align="end">
                                    <NavDropdown.Item href="/login">
                                        Login
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/signup">
                                        Signup
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout">
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
        <footer className="footer mt-auto py-3 bg-light fixed-bottom">
            <div className="container text-center">
                <span className="text-muted">Developed by tollsimy, 2024, WA1, PoliTO</span>
            </div>
        </footer>
    );
}

export { AppHeader, AppFooter }