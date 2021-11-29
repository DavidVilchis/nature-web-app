import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table, Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import NavigationDashboard from "./NavigationDashboard";
const Productos = () => {
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [showModalCampanias, setShowModalCampanias] = useState(false);
    const [edit, setEdit] = useState(false);
    const [showModalCompaniasForm, setShowModalCompaniasForm] = useState(false);
    const clearData = () => {
        setData({
            id: '',
            nombre_producto: '',
            precio_consultora: '',
            precio_venta: '',
            descripcion: ''
        })
        setDataCampanias({
            id: '',
            nombre_campaña: '',
            fecha_termino: ''
        })
    }
    const [data, setData] = useState({
        id: '',
        nombre_producto: '',
        precio_consultora: '',
        precio_venta: '',
        descripcion: '',
        campaña_id: ''
    });
    const [dataCampanias, setDataCampanias] = useState({
        id: '',
        nombre_campaña: '',
        fecha_termino: ''
    })
    const [tabla, setTabla] = useState([]);
    const [campanias, setCampanias] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('nombre_producto', data.nombre_producto)
        formData.append('precio_consultora', data.precio_consultora)
        formData.append('precio_venta', data.precio_venta)
        formData.append('descripcion', data.descripcion)
        formData.append('campaña_id', data.campaña_id)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/productos_store", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nuevo producto",
                    text: "Los campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setTabla(response.data);
                swal({
                    title: "Nuevo producto",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShow(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitCompanias = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('nombre_campaña', dataCampanias.nombre_campaña)
        formData.append('fecha_termino', dataCampanias.fecha_termino)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/campañas_store", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nueva campaña",
                    text: "Los campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setCampanias(response.data);
                swal({
                    title: "Nueva campaña",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShowModalCompaniasForm(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        console.log(data);
        let formData = new FormData();
        formData.append('id', data.id)
        formData.append('nombre_producto', data.nombre_producto)
        formData.append('precio_consultora', data.precio_consultora)
        formData.append('precio_venta', data.precio_venta)
        formData.append('descripcion', data.descripcion)
        formData.append('campaña_id', data.campaña_id)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/productos_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización producto",
                    text: "Algunos campos están vacíos, verifique e ingrese todos los campos.",
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
    const handleSubmitUpdateCompanias = async (e) => {
        e.preventDefault();
        console.log(data);
        let formData = new FormData();
        formData.append('id', dataCampanias.id)
        formData.append('nombre_campaña', dataCampanias.nombre_campaña)
        formData.append('fecha_termino', dataCampanias.fecha_termino)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/campañas_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización campaña",
                    text: "Algunos campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setCampanias(response.data);
                swal({
                    title: "Actualización",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShowModalCompaniasForm(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const Buttons = (props) => {
        const actualizar = () => {
            data.id = props.id;
            data.nombre_producto = props.nombre_producto;
            data.precio_consultora = props.precio_consultora;
            data.precio_venta = props.precio_venta;
            data.descripcion = props.descripcion;
            data.campaña_id = props.campaña_id;
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
                        "http://localhost/nature-web-app/public/api/productos_destroy", formData, { headers }
                    ).then((responseDelete) => {
                        swal("Se borro satisfactoriamente.", {
                            icon: "success",
                        });
                        setTabla(responseDelete.data)
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
                        setShow(true);
                        setEdit(true);
                    }}
                >
                    Editar
                </Button>{' '}
            </>
        )
    }
    const ButtonsCompanias = (props) => {
        const actualizar = () => {
            dataCampanias.id = props.id;
            dataCampanias.nombre_campaña = props.nombre_campaña;
            dataCampanias.fecha_termino = props.fecha_termino;
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
                        "http://localhost/nature-web-app/public/api/campañas_destroy", formData, { headers }
                    ).then((responseDelete) => {
                        swal("Se borro satisfactoriamente.", {
                            icon: "success",
                        });
                        setCampanias(responseDelete.data)
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
                        setShowModalCompaniasForm(true);
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
    const handleInputChangeCampanias = (e) => {
        e.persist();
        setDataCampanias({
            ...dataCampanias,
            [e.target.name]: e.target.value
        })
    }
    const ButtonSave = () => {
        if (!edit) {
            return (
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar producto
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
    const ButtonSaveCompanias = () => {
        if (!edit) {
            return (
                <Button variant="primary" onClick={handleSubmitCompanias}>
                    Guardar
                </Button>
            )
        }
        else {
            return (
                <Button variant="secondary" onClick={handleSubmitUpdateCompanias}>
                    Actualizar
                </Button>
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
            const response = await axios.get("http://localhost/nature-web-app/public/api/productos_index", { headers })
            setTabla(response.data);
        }
        const getDataCampañas = async () => {
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.get("http://localhost/nature-web-app/public/api/campañas_index", { headers })
            setCampanias(response.data);
        }
        getDataCampañas();
        getData();
    }, [])
    return (
        <>
            <NavigationDashboard />
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formPersonalData">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre del producto*:</Form.Label>
                                        <Form.Control type="text" name="nombre_producto" defaultValue={data.nombre_producto} onChange={handleInputChange} placeholder="Ingresa el nombre del producto" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Precio para la consultora*:</Form.Label>
                                        <Form.Control type="text" name="precio_consultora" defaultValue={data.precio_consultora} onChange={handleInputChange} placeholder="0.0" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Precio para la venta*:</Form.Label>
                                        <Form.Control type="text" name="precio_venta" defaultValue={data.precio_venta} onChange={handleInputChange} placeholder="0.0" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label>Campañas*:</Form.Label>
                                        <Form.Select aria-label="Select Consultoras Red" name="campaña_id" onChange={handleInputChange}>
                                            <option value={data.campaña_id}>{data.campaña_id}</option>
                                            {campanias.map(dataItem => (
                                                <option key={dataItem.id} value={dataItem.id}>{dataItem.nombre_campaña}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Ingresa una pequeña descripción*:</Form.Label>
                                        <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                                            <Form.Control
                                                as="textarea"
                                                defaultValue={data.descripcion}
                                                onChange={handleInputChange}
                                                placeholder="Descripcion"
                                                name="descripcion"
                                                style={{ height: '100px' }}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonSave />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showModalCampanias} fullscreen={true} onHide={() => setShowModalCampanias(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Campañas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Button variant="success" onClick={() => { setShowModalCompaniasForm(true); setEdit(false); clearData(); }}>Nueva campaña</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre de la campaña</th>
                                        <th>Fecha de termino</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campanias.map(dataItem => (
                                        <tr key={dataItem.id}>
                                            <td>{dataItem.id}</td>
                                            <td>{dataItem.nombre_campaña}</td>
                                            <td>{dataItem.fecha_termino}</td>
                                            <td>
                                                <ButtonsCompanias
                                                    id={dataItem.id}
                                                    nombre_campaña={dataItem.nombre_campaña}
                                                    fecha_termino={dataItem.fecha_termino}
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
            <Modal show={showModalCompaniasForm} onHide={() => setShowModalCompaniasForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Campañas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formPersonalData">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre de la campaña*:</Form.Label>
                                        <Form.Control type="text" name="nombre_campaña" defaultValue={dataCampanias.nombre_campaña} onChange={handleInputChangeCampanias} placeholder="Ingresa el nombre de la campaña" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Fecha de termino*:</Form.Label>
                                        <Form.Control type="text" name="fecha_termino" defaultValue={dataCampanias.fecha_termino} onChange={handleInputChangeCampanias} placeholder="AAAA/MM/DD" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonSaveCompanias />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} className="col-profile">
                        <h1 className="h1-title-sections">Productos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={3}>
                        <Button variant="success" onClick={() => { setShow(true); setEdit(false); clearData(); }}>Nuevo producto</Button>
                    </Col>
                    <Col xs={4} md={3}>
                        <Button variant="outline-primary" className="btn-outline-primary" onClick={() => setShowModalCampanias(true)}>Campañas</Button>
                    </Col>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre del producto</th>
                                <th>Precio para consultora</th>
                                <th>Precio de venta</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla.map(dataItem => (
                                <tr key={dataItem.id}>
                                    <td>{dataItem.id}</td>
                                    <td>{dataItem.nombre_producto}</td>
                                    <td>${dataItem.precio_consultora}</td>
                                    <td>${dataItem.precio_venta}</td>
                                    <td>{dataItem.descripcion}</td>
                                    <td>
                                        <Buttons
                                            id={dataItem.id}
                                            nombre_producto={dataItem.nombre_producto}
                                            precio_consultora={dataItem.precio_consultora}
                                            precio_venta={dataItem.precio_venta}
                                            descripcion={dataItem.descripcion}
                                            campaña_id={dataItem.campaña_id}
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
export default Productos;