import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home_components/Home';
import About from './about_components/About';
import Consultora from './consultora_components/Consultora';
import ConsultoraRed from './consultora_components/ConsultoraRed';
import ConsultoraEstado from './consultora_components/ConsultoraEstado';
import ConsultoraInformation from './consultora_components/ConsultoraInformation';
import Login from './login_components/Login';
import Profile from './dashboard_components/Profile';
import Pedidos from './dashboard_components/Pedidos';
import Estadisticas from './dashboard_components/Estadisiticas';
import ConfigurationConsultora from './dashboard_components/ConfigurationConsultora';
import ConfigurationConsultoraEstado from './dashboard_components/ConfigurationConsultoraEstado';
import Productos from './dashboard_components/Productos';
import PedidosEstado from './dashboard_components/PedidosEstado';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import '../../css/app.css'


function Example() {
    return (
        <>
            <Router>
                <main>
                    <Routes>
                        <Route path="/nature-web-app/public/" element={<Home />} />
                        <Route path="/nature-web-app/public/about" element={<About />} />
                        <Route path="/nature-web-app/public/consultora" element={<Consultora />} />
                        <Route path="/nature-web-app/public/consultora/red" element={<ConsultoraRed />} />
                        <Route path="/nature-web-app/public/consultora/estado" element={<ConsultoraEstado />} />
                        <Route path="/nature-web-app/public/consultora/information" element={<ConsultoraInformation />} />
                        <Route path="/nature-web-app/public/login" element={<Login />} />
                        <Route path="/nature-web-app/public/login/profile" element={<Profile />} />
                        <Route path="/nature-web-app/public/login/stadistics" element={<Estadisticas />} />
                        <Route path="/nature-web-app/public/login/pedidos" element={<Pedidos />} />
                        <Route path="/nature-web-app/public/login/pedidos/estado" element={<PedidosEstado />} />
                        <Route path="/nature-web-app/public/login/configuration/consultora" element={<ConfigurationConsultora />} />
                        <Route path="/nature-web-app/public/login/configuration/consultora/estado" element={<ConfigurationConsultoraEstado />} />
                        <Route path="/nature-web-app/public/login/productos" element={<Productos />} />
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
