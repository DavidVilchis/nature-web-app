import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table, Form, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import NavigationDashboard from "./NavigationDashboard";
const ConfigurationConsultoraEstado = () => {
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalRedes, setShowModalRedes] = useState(false);
    const [edit, setEdit] = useState(false);
    const [showModalRedesForm, setShowModalRedesForm] = useState(false);
    const clearData = () => {
        setData({
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
        })
        setDataRedes({
            id: '',
            nombre_red: '',
            estado: ''
        })
    }
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
    const [dataUser, setDataUser] = useState({
        name: '',
        email: '',
        password: ' '
    })
    const [dataRedes, setDataRedes] = useState({
        id: '',
        nombre_red: '',
        estado: ''
    })
    const [tabla, setTabla] = useState([]);
    const [redesConsultora, setRedesConsultora] = useState([]);
    const [nivelesConsultora, setNivelesConsultora] = useState([]);
    const [consultoras, setConsultoras] = useState([]);
    const [redesConsultoraIndex, setRedesConsultoraIndex] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
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
            "http://localhost/nature-web-app/public/api/consultoras_store", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nueva consultora",
                    text: "Los campos están vacíos, verifique e ingrese sus credenciales.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setTabla(response.data);
                swal({
                    title: "Nueva consultora",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShow(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitRedes = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('nombre_red', dataRedes.nombre_red)
        formData.append('estado', dataRedes.estado)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/redes_consultoras_store", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nueva red",
                    text: "Los campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setRedesConsultoraIndex(response.data);
                swal({
                    title: "Nueva consultora",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShowModalRedesForm(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitUser = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(dataUser);
        formData.append('name', dataUser.name)
        formData.append('email', dataUser.email)
        formData.append('password', dataUser.password)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/register", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nueva consultora",
                    text: "Los campos están vacíos, verifique e ingrese sus credenciales.",
                    icon: 'warning',
                });
            }
            else {
                swal({
                    title: "Usuario",
                    text: "Se agrego correctamente el usuario.",
                    icon: 'success',
                });
                setShowModalUser(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitUpdateUser = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log(dataUser);
        formData.append('name', dataUser.name)
        formData.append('email', dataUser.email)
        formData.append('password', dataUser.password)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/user_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización",
                    text: "Ingresa una contraseña.",
                    icon: 'warning',
                });
            }
            else if (response.data.update == "false") {
                swal({
                    title: "Actualización",
                    text: "No se actualizo correctamente el usuario. Verifique.",
                    icon: 'warning',
                });
            }
            else {
                swal({
                    title: "Usuario",
                    text: "Se actualizo correctamente el usuario.",
                    icon: 'success',
                });
                setShowModalUser(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitDeleteUser = async (e) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez borrado, ya no podrás recuperar el registro",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((response) => {
            if (response) {
                let formData = new FormData();
                formData.append('email', dataUser.email)
                const headers = {
                    'Authorization': 'Bearer ' + location.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                };

                axios.post(
                    "http://localhost/nature-web-app/public/api/user_delete", formData, { headers }
                ).then((responseDelete) => {
                    swal("Se borro satisfactoriamente.", {
                        icon: "success",
                    });
                    setShowModalUser(false);
                })
            }
        });
    }
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
                    text: "Algunos campos están vacíos, verifique e ingrese sus credenciales.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setTabla(response.data);
                swal({
                    title: "Actualización",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShow(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitUpdateRedes = async (e) => {
        e.preventDefault();
        console.log(data);
        let formData = new FormData();
        formData.append('id', dataRedes.id)
        formData.append('nombre_red', dataRedes.nombre_red)
        formData.append('estado', dataRedes.estado)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/redes_consultoras_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización red",
                    text: "Algunos campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setRedesConsultoraIndex(response.data);
                swal({
                    title: "Actualización",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShowModalRedesForm(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const [user, setUser] = useState(false);
    const ModalTitle = () => {
        if (user) {
            return (<h3>Actualizar password</h3>);
        }
        else {
            return (<h3>Crear usuario</h3>);
        }
    }
    const Buttons = (props) => {
        const actualizar = () => {
            data.id = props.id;
            data.nombre_consultora = props.nombre_consultora;
            data.apellido_paterno_consultora = props.apellido_paterno_consultora;
            data.apellido_materno_consultora = props.apellido_materno_consultora;
            data.email = props.email;
            data.estado = props.estado;
            data.telefono = props.telefono;
            data.domicilio = props.domicilio;
            data.redes_consultora_id = props.redes_consultora_id;
            data.consultora_red = props.consultora_red;
            data.nivel_consultora_id = props.nivel_consultora_id;
            getDataRedes();
            getDataConsultorasRed();
        }
        const borrar = () => {
            swal({
                title: "¿Estás seguro?",
                text: "Una vez borrado, ya no podrás recuperar el registro",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    let formData = new FormData();
                    formData.append('id', props.id)
                    const headers = {
                        'Authorization': 'Bearer ' + location.state.token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    };

                    axios.post(
                        "http://localhost/nature-web-app/public/api/consultoras_destroy", formData, { headers }
                    ).then((responseDelete) => {
                        swal("Se borro satisfactoriamente.", {
                            icon: "success",
                        });
                        setTabla(responseDelete.data)
                    })
                }
            });
        }
        const usuario = (props) => {
            dataUser.email = props.email;
            dataUser.name = props.nombre_consultora;
            const getDataUsersExists = async () => {
                let formData = new FormData();
                formData.append("email", props.email)
                const headers = {
                    'Authorization': 'Bearer ' + location.state.token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                };
                const response = await axios.post("http://localhost/nature-web-app/public/api/usuarios_email", formData, { headers }
                ).then((response) => {
                    if (response.data.hasUser == 'true') {
                        setUser(true);
                    }
                    else {
                        setUser(false);
                    }
                })
            }
            getDataUsersExists();
        }
        return (
            <>
                <Button variant="outline-danger" className="btn-outline-danger" onClick={borrar}>Eliminar</Button>{' '}
                <Button variant="outline-primary" className="btn-outline-primary"
                    onClick={() => {
                        actualizar();
                        setShow(true);
                        setEdit(true);
                    }}
                >
                    Editar
                </Button>{' '}
                <Button variant="outline-success" className="btn-outline-primary"
                    onClick={() => {
                        usuario(props);
                        setShowModalUser(true)
                    }}>
                    Usuario
                </Button>
            </>
        )
    }
    const ButtonsRedes = (props) => {
        const actualizar = () => {
            dataRedes.id = props.id;
            dataRedes.nombre_red = props.nombre_red;
            dataRedes.estado = props.estado;
        }
        const borrar = () => {
            swal({
                title: "¿Estás seguro?",
                text: "Una vez borrado, ya no podrás recuperar el registro",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    let formData = new FormData();
                    formData.append('id', props.id)
                    const headers = {
                        'Authorization': 'Bearer ' + location.state.token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    };

                    axios.post(
                        "http://localhost/nature-web-app/public/api/redes_consultoras_destroy", formData, { headers }
                    ).then((responseDelete) => {
                        swal("Se borro satisfactoriamente.", {
                            icon: "success",
                        });
                        setRedesConsultoraIndex(responseDelete.data)
                    })
                }
            });
        }
        return (
            <>
                <Button variant="outline-danger" className="btn-outline-danger" onClick={borrar}>Eliminar</Button>{' '}
                <Button variant="outline-primary" className="btn-outline-primary"
                    onClick={() => {
                        actualizar();
                        setShowModalRedesForm(true);
                        setEdit(true);
                    }}
                >
                    Editar
                </Button>
            </>
        )
    }
    const handleInputChange = (e) => {
        e.persist();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleInputChangeUser = (e) => {
        e.persist();
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    }
    const handleInputChangeRedes = (e) => {
        e.persist();
        setDataRedes({
            ...dataRedes,
            [e.target.name]: e.target.value
        })
    }
    const getDataRedes = async () => {
        let formData = new FormData();
        formData.append("estado", data.estado)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };
        const response = await axios.post("http://localhost/nature-web-app/public/api/redes_consultoras_estado", formData, { headers })
        setRedesConsultora(response.data);
    }
    const getDataConsultorasRed = async () => {
        let formData = new FormData();
        formData.append("redes_consultora_id", data.redes_consultora_id)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };
        const response = await axios.post("http://localhost/nature-web-app/public/api/consultoras_redes", formData, { headers })
        setConsultoras(response.data);
    }
    const handleSelectRedesChange = (e) => {
        e.persist();
        if (e.target.value != 0 && e.target.value != '') {
            data.estado = e.target.value;
            getDataRedes();
        } else {
            setRedesConsultora([]);
        }
    }
    const handleSelectConsultorasChange = (e) => {
        e.persist();
        if (e.target.value != 0) {
            data.redes_consultora_id = e.target.value;
            getDataConsultorasRed();
        } else {
            setConsultoras([]);
        }
    }
    const ButtonSave = () => {
        if (!edit) {
            return (
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar consultora
                </Button>
            )
        }
        else {
            return (
                <Button variant="secondary" onClick={handleSubmitUpdate}>
                    Actualizar
                </Button>
            )
        }
    }
    const ButtonSaveRedes = () => {
        if (!edit) {
            return (
                <Button variant="primary" onClick={handleSubmitRedes}>
                    Guardar
                </Button>
            )
        }
        else {
            return (
                <Button variant="secondary" onClick={handleSubmitUpdateRedes}>
                    Actualizar
                </Button>
            )
        }
    }
    const ButtonSaveUser = () => {
        if (!user) {
            return (
                <Button variant="primary" onClick={handleSubmitUser}>
                    Guardar usuario
                </Button>
            )
        }
        else {
            return (
                <>
                    <Button variant="secondary" onClick={handleSubmitUpdateUser}>
                        Actualizar contraseña
                    </Button>{' '}
                    <Button variant="danger" onClick={handleSubmitDeleteUser}>
                        Borrar usuario
                    </Button>
                </>
            )
        }
    }
    useEffect(() => {
        const getData = async () => {
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.get("http://localhost/nature-web-app/public/api/consultoras_index", { headers })
            setTabla(response.data);
        }
        const getDataNiveles = async () => {
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.get("http://localhost/nature-web-app/public/api/niveles_consultora_index", { headers })
            setNivelesConsultora(response.data);
        }
        const getDataRedes = async () => {
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.get("http://localhost/nature-web-app/public/api/redes_consultoras_index", { headers })
            setRedesConsultoraIndex(response.data);
        }
        getDataRedes();
        getData();
        getDataNiveles();
    }, [])
    return (
        <>
            <NavigationDashboard />
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Consultora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formPersonalData">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre (s)*:</Form.Label>
                                        <Form.Control type="text" name="nombre_consultora" defaultValue={data.nombre_consultora} onChange={handleInputChange} placeholder="Ingresa los nombre(s)" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Apellido Paterno*:</Form.Label>
                                        <Form.Control type="text" name="apellido_paterno_consultora" defaultValue={data.apellido_paterno_consultora} onChange={handleInputChange} placeholder="Ingresa el apellido paterno" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Apellido Materno*:</Form.Label>
                                        <Form.Control type="text" name="apellido_materno_consultora" defaultValue={data.apellido_materno_consultora} onChange={handleInputChange} placeholder="Ingresa el apellido Materno" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Estado*:</Form.Label>
                                        <Form.Select aria-label="Select Estado" name="estado" onChange={handleSelectRedesChange}>
                                            <option value={data.estado}>{data.estado}</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Ciudad de Mexico">Ciudad de Mexico</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Coahuila">Coahuila</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="Estado de Mexico">Estado de Mexico</option>
                                            <option value="Michoacan">Michoacan</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo Leon">Nuevo Leon</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Queretaro">Queretaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosi">San Luis Potosi</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz">Veracruz</option>
                                            <option value="Yucatan">Yucatan</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>Teléfono*:</Form.Label>
                                        <Form.Control type="text" name="telefono" defaultValue={data.telefono} onChange={handleInputChange} placeholder="1234567890" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Label>Domicilio*:</Form.Label>
                                    <Form.Control type="text" name="domicilio" defaultValue={data.domicilio} onChange={handleInputChange} placeholder="Ingresa el domicilio" />
                                </Row>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email*:</Form.Label>
                                        <Form.Control name="email" defaultValue={data.email} onChange={handleInputChange} type="email" placeholder="example@mail.com" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formSelects">
                                <Row>
                                    <Col>
                                        <Form.Label>Redes consultora*:</Form.Label>
                                        <Form.Select aria-label="Select Redes Consultoras" name="redes_consultora_id" onChange={handleSelectConsultorasChange}>
                                            <option value={data.redes_consultora_id}>{data.redes_consultora_id}</option>
                                            {redesConsultora.map(dataItem => (
                                                <option key={dataItem.id} value={dataItem.id}>{dataItem.nombre_red}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>Niveles consultora*:</Form.Label>
                                        <Form.Select aria-label="Select Niveles Consultoras" name="nivel_consultora_id" onChange={handleInputChange}>
                                            <option value={data.nivel_consultora_id}>{data.nivel_consultora_id}</option>
                                            {nivelesConsultora.map(dataItem => (
                                                <option key={dataItem.id} value={dataItem.id}>{dataItem.nombre_nivel_consultora}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>Consultora red:</Form.Label>
                                        <Form.Select aria-label="Select Consultoras Red" name="consultora_red" onChange={handleInputChange}>
                                            <option value={data.consultora_red}>{data.consultora_red}</option>
                                            {consultoras.map(dataItem => (
                                                <option key={dataItem.id} value={dataItem.id}>{dataItem.nombre_consultora + ' ' + dataItem.apellido_paterno_consultora}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonSave />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showModalUser} centered size="lg" onHide={() => setShowModalUser(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Row>
                                <Col>
                                    <ModalTitle />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Row>
                                            <Col>
                                                <Form.Label>Email:</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control name="email" value={dataUser.email} onChange={handleInputChangeUser} type="email" readOnly />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label>Nombre:</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control name="name" value={dataUser.name} onChange={handleInputChangeUser} type="text" readOnly />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Label>Password:</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control name="password" onChange={handleInputChangeUser} type="password" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <ButtonSaveUser />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showModalRedes} fullscreen={true} onHide={() => setShowModalRedes(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Redes consultora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Button variant="success" onClick={() => { setShowModalRedesForm(true); setEdit(false); clearData(); }}>Nueva red</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de la red</th>
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {redesConsultoraIndex.map(dataItem => (
                                        <tr key={dataItem.id}>
                                            <td>{dataItem.id}</td>
                                            <td>{dataItem.nombre_red}</td>
                                            <td>{dataItem.estado}</td>
                                            <td>
                                                <ButtonsRedes
                                                    id={dataItem.id}
                                                    nombre_red={dataItem.nombre_red}
                                                    estado={dataItem.estado}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showModalRedesForm} onHide={() => setShowModalRedesForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Redes consultora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formPersonalData">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre de red*:</Form.Label>
                                        <Form.Control type="text" name="nombre_red" defaultValue={dataRedes.nombre_red} onChange={handleInputChangeRedes} placeholder="Ingresa los nombre(s)" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Estado*:</Form.Label>
                                        <Form.Select aria-label="Select Estado" name="estado" onChange={handleInputChangeRedes}>
                                            <option value={dataRedes.estado}>{dataRedes.estado}</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Ciudad de Mexico">Ciudad de Mexico</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Coahuila">Coahuila</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="Estado de Mexico">Estado de Mexico</option>
                                            <option value="Michoacan">Michoacan</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo Leon">Nuevo Leon</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Queretaro">Queretaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosi">San Luis Potosi</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz">Veracruz</option>
                                            <option value="Yucatan">Yucatan</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonSaveRedes />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} className="col-profile">
                        <h1 className="h1-title-sections">Configuración - Usuarios</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={3}>
                        <Button variant="success" onClick={() => { setShow(true); setEdit(false); clearData(); }}>Nueva consultora</Button>
                    </Col>
                    <Col xs={4} md={3}>
                        <Button variant="outline-primary" className="btn-outline-primary" onClick={() => setShowModalRedes(true)}>Redes consultora</Button>
                    </Col>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Email</th>
                                <th>Estado</th>
                                <th>Teléfono</th>
                                <th>Domicilio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla.map(dataItem => (
                                <tr key={dataItem.id}>
                                    <td>{dataItem.id}</td>
                                    <td>{dataItem.nombre_consultora}</td>
                                    <td>{dataItem.apellido_paterno_consultora}</td>
                                    <td>{dataItem.apellido_materno_consultora}</td>
                                    <td>{dataItem.email}</td>
                                    <td>{dataItem.estado}</td>
                                    <td>{dataItem.telefono}</td>
                                    <td>{dataItem.domicilio}</td>
                                    <td>
                                        <Buttons
                                            id={dataItem.id}
                                            nombre_consultora={dataItem.nombre_consultora}
                                            apellido_paterno_consultora={dataItem.apellido_paterno_consultora}
                                            apellido_materno_consultora={dataItem.apellido_materno_consultora}
                                            email={dataItem.email}
                                            estado={dataItem.estado}
                                            telefono={dataItem.telefono}
                                            domicilio={dataItem.domicilio}
                                            redes_consultora_id={dataItem.redes_consultora_id}
                                            consultora_red={dataItem.consultora_red}
                                            nivel_consultora_id={dataItem.nivel_consultora_id}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}
export default ConfigurationConsultoraEstado;