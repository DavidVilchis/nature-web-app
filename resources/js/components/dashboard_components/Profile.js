import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Image, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NavigationDashboard from "./NavigationDashboard";
const Profile = () => {
    const location = useLocation();
    
    const [tabla, setTabla] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const formData = new FormData();
            formData.append("email", location.state.email)
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.post("http://localhost/nature-web-app/public/api/consultoras_information", formData, { headers })
            setTabla(response.data);
            localStorage.setItem('nivel_usuario', response.data[0]['nivel_consultora_id']);
        }
        getData()
    }, [])

    return (
        <>
            <NavigationDashboard />
            <Container fluid>
                <Row>
                    <Row>
                        <h1 className="h1-title-profile">¡Hola nuevamente!</h1>
                    </Row>
                    <Col xs={12} md={6} className="col-profile">
                        <center>
                            <Image className="image-profile" src="/nature-web-app/public/images/profile_logo.png" rounded />
                        </center>
                    </Col>
                    <Col xs={12} md={6} className="col-profile">
                        <Row>
                            <Col>
                                <h1 className="h1-title-sections">Perfil - Consultora</h1>
                            </Col>
                        </Row>
                        {tabla.map(dataItem => (
                            <>
                                <Row>
                                    <Col>
                                        <h3>Nombre de la consultora:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.nombre_consultora + " " + dataItem.apellido_paterno_consultora + " " + dataItem.apellido_materno_consultora}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Correo electrónico:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.email}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Estado:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.estado}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Red:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.nombre_red}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Teléfono celular:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.telefono}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Domicilio:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.domicilio}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h3>Consultora Red:</h3>
                                    </Col>
                                    <Col>
                                        <h3>{dataItem.consultora_red}</h3>
                                    </Col>
                                </Row>
                            </>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Profile;