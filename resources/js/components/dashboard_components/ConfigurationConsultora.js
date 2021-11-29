import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table, Form, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import NavigationDashboard from "./NavigationDashboard";
const ConfigurationConsultora = () => {
    const location = useLocation();

    const [disabledForm, setDisabledForm] = useState(true);
    const [edit, setEdit] = useState(false);

    const [data, setData] = useState({
        id: '',
        nombre_consultora: '',
        apellido_paterno_consultora: '',
        apellido_materno_consultora: '',
        email: '',
        estado: '',
        telefono: '',
        domicilio: '',
        redes_consultora_id: '',
        consultora_red: '',
        nivel_consultora_id: ''
    });

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        if (data.consultora_red == null) {
            data.consultora_red = '';
        }
        console.log(data);
        let formData = new FormData();
        formData.append('id', data.id)
        formData.append('nombre_consultora', data.nombre_consultora)
        formData.append('apellido_paterno_consultora', data.apellido_paterno_consultora)
        formData.append('apellido_materno_consultora', data.apellido_materno_consultora)
        formData.append('email', data.email)
        formData.append('estado', data.estado)
        formData.append('telefono', data.telefono)
        formData.append('domicilio', data.domicilio)
        formData.append('redes_consultora_id', data.redes_consultora_id)
        formData.append('consultora_red', data.consultora_red)
        formData.append('nivel_consultora_id', data.nivel_consultora_id)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/consultoras_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización consultora",
                    text: "Algunos campos están vacíos, verifique e ingrese todos los campos.",
                    icon: 'warning',
                });
            }
            else {
                setDisabledForm(true);
                swal({
                    title: "Actualización",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleInputChange = (e) => {
        e.persist();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const ButtonSave = () => {
        const handleCancelar = () =>{
            setDisabledForm(true);
            setEdit(false);
        }
        if (!edit) {
            return(<></>)
        }
        else {
            return (
                <>
                    <Button variant="secondary" onClick={handleSubmitUpdate}>
                        Guardar
                    </Button>{' '}
                    <Button variant="danger" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </>
            )
        }
    }
    const getData = async () => {
        let formData = new FormData();
        formData.append("email", location.state.email)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };
        const response = await axios.post("http://localhost/nature-web-app/public/api/consultoras_index_email", formData, { headers })
        setData({
            id: response.data[0]["id"],
            nombre_consultora: response.data[0]["nombre_consultora"],
            apellido_paterno_consultora: response.data[0]["apellido_paterno_consultora"],
            apellido_materno_consultora: response.data[0]["apellido_materno_consultora"],
            email: response.data[0]["email"],
            estado: response.data[0]["estado"],
            telefono: response.data[0]["telefono"],
            domicilio: response.data[0]["domicilio"],
            redes_consultora_id: response.data[0]["redes_consultora_id"],
            consultora_red: response.data[0]["consultora_red"],
            nivel_consultora_id: response.data[0]["nivel_consultora_id"]
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <NavigationDashboard />
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} className="col-profile">
                        <h1 className="h1-title-sections">Configuración</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={3}>
                        <Button variant="success" onClick={() => { setEdit(true); setDisabledForm(false);}} disabled={!disabledForm}>Actualizar datos</Button>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formPersonalData">
                            <Row>
                                <Col>
                                    <Form.Label>Nombre (s)*:</Form.Label>
                                    <Form.Control type="text" name="nombre_consultora" defaultValue={data.nombre_consultora} onChange={handleInputChange} placeholder="Ingresa los nombre(s)" disabled={disabledForm} />
                                </Col>
                                <Col>
                                    <Form.Label>Apellido Paterno*:</Form.Label>
                                    <Form.Control type="text" name="apellido_paterno_consultora" defaultValue={data.apellido_paterno_consultora} onChange={handleInputChange} placeholder="Ingresa el apellido paterno" disabled={disabledForm} />
                                </Col>
                                <Col>
                                    <Form.Label>Apellido Materno*:</Form.Label>
                                    <Form.Control type="text" name="apellido_materno_consultora" defaultValue={data.apellido_materno_consultora} onChange={handleInputChange} placeholder="Ingresa el apellido Materno" disabled={disabledForm} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Estado*:</Form.Label>
                                    <Form.Select aria-label="Select Estado" name="estado" disabled>
                                        <option value={data.estado}>{data.estado}</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Teléfono*:</Form.Label>
                                    <Form.Control type="text" name="telefono" defaultValue={data.telefono} onChange={handleInputChange} placeholder="1234567890" disabled={disabledForm} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Domicilio*:</Form.Label>
                                    <Form.Control type="text" name="domicilio" defaultValue={data.domicilio} onChange={handleInputChange} placeholder="Ingresa el domicilio" disabled={disabledForm} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email*:</Form.Label>
                                    <Form.Control name="email" defaultValue={data.email} onChange={handleInputChange} type="email" placeholder="example@mail.com" disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formSelects">
                            <Row>
                                <Col>
                                    <Form.Label>Redes consultora*:</Form.Label>
                                    <Form.Select aria-label="Select Redes Consultoras" name="redes_consultora_id" disabled>
                                        <option value={data.redes_consultora_id}>{data.redes_consultora_id}</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Niveles consultora*:</Form.Label>
                                    <Form.Select aria-label="Select Niveles Consultoras" name="nivel_consultora_id" onChange={handleInputChange} disabled>
                                        <option value={data.nivel_consultora_id}>{data.nivel_consultora_id}</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Consultora red:</Form.Label>
                                    <Form.Select aria-label="Select Consultoras Red" name="consultora_red" onChange={handleInputChange} disabled>
                                        <option value={data.consultora_red}>{data.consultora_red}</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <ButtonSave />
                    </Form>
                </Row>
            </Container>
        </>
    )
}
export default ConfigurationConsultora;