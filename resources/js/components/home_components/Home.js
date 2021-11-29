import React from "react";
import { Carousel, Button, Container, Col, Row, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation";
const Home = () => {
    return (
        <>
        <Navigation />
            <Carousel variant="dark">
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="./images/slide1.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="./images/slide2.png"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Conoce más sobre esta información</h3>
                        <Button variant="dark">Descubre más</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/slide3.png"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Container fluid>
                <Row className="row-background-style-1">
                    <Col className="col-background-style" xs={12} md={6}>
                    </Col>
                    <Col className="col-background-style" xs={12} md={6}>
                        <h1 className="row-title-style">Cónoce más sobre <label className="label-color-nature">nosotros</label> y descubre cuál es nuestro objetivo</h1>
                        <center><Button as={Link} to="/nature-web-app/public/about" className="row-button-style" variant="light" size="lg"><b>NOSOTROS</b></Button></center>
                    </Col>
                </Row>
                <Row className="row-background-style-2">
                    <Col className="col-background-style" xs={12} md={6}>
                        <h1 className="row-title-style">Como consultora Natur<label className="label-color-nature">é</label> vive la experiencia que te espera</h1>
                        <center><Button as={Link} to="/nature-web-app/public/login" className="row-button-style" variant="light" size="lg"><b>INICIAR SESIÓN</b></Button></center>
                    </Col>
                    <Col className="col-background-style" xs={12} md={6}>
                    </Col>
                </Row>
                <Row className="row-background-style-3">
                    <Col className="col-background-style">
                        <center>
                            <h1 className="row-title-style">¿Aún no eres consultora Natur<label className="label-color-nature">é</label>?</h1>
                            <Button as={Link} to="/nature-web-app/public/consultora/information" className="row-button-style" variant="light" size="lg"><b>DESCUBRIR COMO</b></Button>
                        </center>
                    </Col>
                </Row>
                <Row className="row-footer">
                    <Row className="row-footer-color">
                        <center>Esta página web es un proyecto para Tópicos Web. No es real.</center>
                    </Row>
                    <Row className="row-footer-color">
                        <center>Es una simulación de lo que es la página de Natura </center>
                    </Row>
                    <Row className="row-footer-color">
                        <center>Derechos reservado 2021® | MagicSoft S.A de C.V </center>
                    </Row>
                    <Row>
                        <Col>
                            <center><Image className="image-footer" src="./images/ne_logo_footer.png" rounded /></center>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}
export default Home;