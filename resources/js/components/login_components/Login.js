import React, { useState } from "react";
import { Container, Col, Row, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
import Navigation from "../Navigation";

const Login = () => {
    let navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        e.persist();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.email == "" || data.password == ""){
            swal({
                title: "Login",
                text: "Los campos están vacíos, verifique e ingrese sus credenciales.",
                icon: 'warning',
            });
            return;
        }
        let formData = new FormData();
        formData.append('email', data.email)
        formData.append('password', data.password)
        await Axios({
            method: 'post',
            url: 'http://localhost/nature-web-app/public/api/login',
            data: formData,
            config: { headers: { 'Content-Type:': 'multipart/form-data', 'Accept': 'application/json' } }
        }).then(response => {
            if (response.status == 200) {
                swal({
                    title: "Login",
                    text: "¡Bienvenid@!",
                    icon: 'success',
                });
                navigate('/nature-web-app/public/login/profile',{state:{token: response.data.token, email: data.email}});
            }
        }).catch(error => {
            swal({
                title: "Login",
                text: "Las credenciales son incorrectas, verifique.",
                icon: 'error',
            });
        });
    }
    return (
        <>
            <Navigation />
            <Container fluid>
                <Row className="row-background-style-login">
                    <Col xs={12} md={12} xl={6} className="col-background-style">
                        <Row className="row-login-form">
                            <h1>Iniciar <label className="label-color-nature">sesión</label></h1>
                        </Row>
                        <Row className="row-login-form-2">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="ejemplo@example.com" name="email" onChange={handleInputChange} />
                                    <Form.Text className="text-muted">
                                        Tu correo electrónico es único y no se compartirá jamás
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu contraseña" name="password" onChange={handleInputChange} />
                                </Form.Group>
                                <center>
                                    <Button variant="login" size="width-login" onClick={handleSubmit}>
                                        Iniciar
                                    </Button>
                                </center>
                            </Form>
                        </Row>
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
export default Login;