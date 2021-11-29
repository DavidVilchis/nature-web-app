import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import Navigation from "../Navigation";
const ConsultoraEstado = () => {
    return (
        <>
        <Navigation />
            <Container fluid>
                <Row className="row-background-consultora-estado">
                    <Col xs={12} md={12} xl={6} className="col-background-style">
                        <center>
                            <h1 className="h1-title-page">CONSULTORA<br />ESTADO</h1>
                            <h2 className="h2-subtitle-page">Crece en <b>Natur<label className="label-color-nature">é</label></b></h2>
                        </center>
                    </Col>
                    <Col xs={12} md={12} xl={6} className="col-background-style">

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
export default ConsultoraEstado;