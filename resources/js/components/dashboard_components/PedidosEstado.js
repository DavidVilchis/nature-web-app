import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table, Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import NavigationDashboard from "./NavigationDashboard";
const Pedidos = () => {
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [showAgregar, setShowAgregar] = useState(false);
    const [edit, setEdit] = useState(false);
    const clearData = () => {
        data.producto_id = '';
        data.cantidad = '';
        data.total_consultora = '';
        data.total_venta = '';
        setDataProducto({
            nombre_producto: '',
            precio_consultora: '',
            precio_venta: ''
        })
    }
    const [data, setData] = useState({
        consultora_id: '',
        producto_id: '',
        cantidad: '',
        total_consultora: '',
        total_venta: ''
    });
    const [dataProducto, setDataProducto] = useState({
        nombre_producto: '',
        precio_consultora: '',
        precio_venta: ''
    })
    const [tabla, setTabla] = useState([]);
    const [tablaProductos, setTablaProductos] = useState([]);

    const handleSubmitAgregar = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('consultora_id', data.consultora_id)
        formData.append('producto_id', data.producto_id)
        formData.append('total_consultora', (data.total_consultora * data.cantidad))
        formData.append('total_venta', (data.total_venta * data.cantidad))
        formData.append('cantidad', data.cantidad)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/pedidos_store", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Nuevo pedido",
                    text: "Los campos están vacíos, verifique e ingrese los campos.",
                    icon: 'warning',
                });
            }
            else {
                console.log(response.data);
                setTabla(response.data);
                swal({
                    title: "Nuevo pedido",
                    text: "Se guardo correctamente.",
                    icon: 'success',
                });
                setShowAgregar(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const handleSubmitUpdateAgregar = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('consultora_id', data.consultora_id)
        formData.append('producto_id', data.producto_id)
        formData.append('total_consultora', (dataProducto.precio_consultora * data.cantidad))
        formData.append('total_venta', (dataProducto.precio_venta * data.cantidad))
        formData.append('cantidad', data.cantidad)
        const headers = {
            'Authorization': 'Bearer ' + location.state.token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        axios.post(
            "http://localhost/nature-web-app/public/api/pedidos_update", formData, { headers }
        ).then(response => {
            if (response.data.missing == "true") {
                swal({
                    title: "Actualización pedido",
                    text: "Algunos campos están vacíos, verifique e ingrese los campos.",
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
                setShowAgregar(false);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    const Buttons = (props) => {
        const actualizar = () => {
            data.producto_id = props.producto_id;
            data.cantidad = props.cantidad;
            let formData = new FormData();
            formData.append('id', props.producto_id);
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };

            axios.post(
                "http://localhost/nature-web-app/public/api/productos_id", formData, { headers }
            ).then((response) => {
                console.log(response.data);
                dataProducto.nombre_producto = response.data[0]["nombre_producto"];
                dataProducto.precio_consultora=response.data[0]["precio_consultora"];
                dataProducto.precio_venta=response.data[0]["precio_venta"];
                setShowAgregar(true);
            })
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
                    formData.append('consultora_id', props.consultora_id)
                    formData.append('producto_id', props.producto_id)
                    const headers = {
                        'Authorization': 'Bearer ' + location.state.token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    };

                    axios.post(
                        "http://localhost/nature-web-app/public/api/pedidos_destroy", formData, { headers }
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
                        setEdit(true);
                    }}
                >
                    Editar
                </Button>{' '}
            </>
        )
    }
    const ButtonsProductos = (props) => {
        const agregar = () => { 
            dataProducto.nombre_producto = props.nombre_producto
            data.producto_id = props.id;
            data.total_consultora = props.precio_consultora;
            data.total_venta = props.precio_venta;
        }
        return (
            <>
                <Button variant="outline-success" className="btn-outline-success" onClick={() => { setShowAgregar(true); agregar(); }}>Agregar Producto</Button>{' '}
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
    const ButtonSaveAgregar = () => {
        if (!edit) {
            return (
                <Button variant="primary" onClick={handleSubmitAgregar}>
                    Guardar
                </Button>
            )
        }
        else {
            return (
                <Button variant="secondary" onClick={handleSubmitUpdateAgregar}>
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
            const response = await axios.get("http://localhost/nature-web-app/public/api/pedidos_index", { headers })
            setTabla(response.data);
        }
        const getDataProductos = async () => {
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            const response = await axios.get("http://localhost/nature-web-app/public/api/productos_index", { headers })
            setTablaProductos(response.data);
        }
        const getDataInformation = async () => {
            let formData = new FormData();
            formData.append('email', location.state.email)
            const headers = {
                'Authorization': 'Bearer ' + location.state.token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
            await axios.post("http://localhost/nature-web-app/public/api/consultoras_index_email", formData, { headers }
            ).then((response) => {
                data.consultora_id = response.data[0]["id"];
            })

        }
        getDataInformation();
        getData();
        getDataProductos();
    }, [])
    return (
        <>
            <NavigationDashboard />
            <Modal show={showAgregar} onHide={() => setShowAgregar(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Form>
                            <Form.Group className="mb-3" controlId="formDataProducto">
                                <Row>
                                    <Col>
                                        <Form.Label>Nombre del producto:</Form.Label>
                                        <Form.Control type="text" name="nombre_producto" defaultValue={dataProducto.nombre_producto} disabled />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Cantidad*:</Form.Label>
                                        <Form.Control type="text" name="cantidad" defaultValue={data.cantidad} onChange={handleInputChange} placeholder="0" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonSaveAgregar />
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
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
                                {tablaProductos.map(dataItem => (
                                    <tr key={dataItem.id}>
                                        <td>{dataItem.id}</td>
                                        <td>{dataItem.nombre_producto}</td>
                                        <td>${dataItem.precio_consultora}</td>
                                        <td>${dataItem.precio_venta}</td>
                                        <td>{dataItem.descripcion}</td>
                                        <td>
                                            <ButtonsProductos
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
                    </Container>
                </Modal.Body>
            </Modal>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12} className="col-profile">
                        <h1 className="h1-title-sections">Pedidos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={3}>
                        <Button variant="success" onClick={() => { setShow(true); setEdit(false); clearData(); }}>Nuevo pedido</Button>
                    </Col>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Id consultora</th>
                                <th>Id producto</th>
                                <th>Cantidad</th>
                                <th>Precio para consultora</th>
                                <th>Precio de venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabla.map(dataItem => (
                                <tr key={dataItem.producto_id + ' ' + dataItem.consultora_id}>
                                    <td>{dataItem.consultora_id}</td>
                                    <td>{dataItem.producto_id}</td>
                                    <td>{dataItem.cantidad}</td>
                                    <td>${dataItem.total_consultora}</td>
                                    <td>${dataItem.total_venta}</td>
                                    <td>
                                        <Buttons
                                            consultora_id={dataItem.consultora_id}
                                            producto_id={dataItem.producto_id}
                                            cantidad={dataItem.cantidad}
                                            total_consultora={dataItem.total_consultora}
                                            total_venta={dataItem.total_venta}
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
export default Pedidos;