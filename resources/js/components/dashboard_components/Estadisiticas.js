import React, { useState } from "react";
import { Container, Col, Row, Table, Image, Form, Button, Modal } from "react-bootstrap";
import NavigationDashboard from "./NavigationDashboard";
const Estadisticas = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <NavigationDashboard />
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} className="col-profile">
                        <h1 className="h1-title-sections">Estadísticas - Consultora</h1>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Container>
        </>
    )
}
export default Estadisticas;