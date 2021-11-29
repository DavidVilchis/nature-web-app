import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="nav-style">
            <Container>
                <Navbar.Brand as={Link} to="/nature-web-app/public/">
                    <img
                        src="/nature-web-app/public/images/ne_logo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand as={Link} to="/nature-web-app/public/" className="nav-title">Naturé</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/nature-web-app/public/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/nature-web-app/public/about">Nosotros</Nav.Link>
                        <NavDropdown title="Consultoras" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/nature-web-app/public/consultora">Consultora</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/nature-web-app/public/consultora/red">Consultora red</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/nature-web-app/public/consultora/estado">Consultora estado</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/nature-web-app/public/consultora/information">¿Cómo ser consultora?</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/nature-web-app/public/login">Iniciar sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation;