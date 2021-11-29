import React, { useState } from "react";
import { Container, Row, Offcanvas, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavigationDashboard = () => {
    const location = useLocation();
    function NavigationUser() {
        let nivelUsuario = localStorage.getItem('nivel_usuario');
        if (nivelUsuario == 1) {
            return (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="offcanvas-options" as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }}>Perfil</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/pedidos' state={{ token: location.state.token, email: location.state.email }}>Pedidos</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/configuration/consultora' state={{ token: location.state.token, email: location.state.email }}>Configuración</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options-logout" as={Link} to="/nature-web-app/public/">Cerrar sesión</Nav.Link>
                </Nav>
            );
        }
        else if (nivelUsuario == 2) {
            return (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="offcanvas-options" as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }}>Perfil</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/pedidos' state={{ token: location.state.token, email: location.state.email }}>Pedidos</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/configuration/consultora' state={{ token: location.state.token, email: location.state.email }}>Configuración</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options-logout" as={Link} to="/nature-web-app/public/">Cerrar sesión</Nav.Link>
                </Nav>
            );
        }
        else if (nivelUsuario == 3) {
            return (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="offcanvas-options" as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }}>Perfil</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/pedidos/estado' state={{ token: location.state.token, email: location.state.email }}>Pedidos</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/configuration/consultora/estado' state={{ token: location.state.token, email: location.state.email }}>Configuración - Usuarios</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options-logout" as={Link} to="/nature-web-app/public/">Cerrar sesión</Nav.Link>
                </Nav>
            );
        }
        else if (nivelUsuario == 4) {
            return (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="offcanvas-options" as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }}>Perfil</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/pedidos/estado' state={{ token: location.state.token, email: location.state.email }}>Pedidos</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/configuration/consultora/estado' state={{ token: location.state.token, email: location.state.email }}>Configuración - Usuarios</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options" as={Link} to='/nature-web-app/public/login/productos' state={{ token: location.state.token, email: location.state.email }}>Productos</Nav.Link>
                    <Row className="row-divider " />
                    <Nav.Link className="offcanvas-options-logout" as={Link} to="/nature-web-app/public/">Cerrar sesión</Nav.Link>
                </Nav>
            );
        }
    }
    return (
        <>
            <Navbar className="nav-style" variant="dark" expand={false}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                        scroll={true}
                        backdrop={true}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel"><label className="offcanvas-title"><b>Menú Principal</b></label></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <NavigationUser />
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Brand as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }}>
                        <Navbar.Brand as={Link} to="/nature-web-app/public/login/profile" state={{ token: location.state.token, email: location.state.email }} className="nav-title">Dashboard - Naturé</Navbar.Brand>
                        <img
                            src="/nature-web-app/public/images/ne_logo.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Container>

            </Navbar>
        </>
    )
}
export default NavigationDashboard;