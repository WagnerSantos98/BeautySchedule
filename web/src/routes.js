import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles.css';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Agendamentos from "./pages/Agendamentos";
import Clientes from "./pages/Clientes";
import Colaboradores from "./pages/Colaboradores"; 
import Servicos from "./pages/Servicos";
import Horarios from "./pages/Horarios";
import Usuarios from "./pages/Usuarios";

const App = () => {
    return (
        <>
            <Header/>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                        <Sidebar/>
                        <Routes>
                            <Route path="/" excat element={<Agendamentos />}/>
                            <Route path="/clientes" excat element={<Clientes />}/>
                            <Route path="/colaboradores" excat element={<Colaboradores />}/>
                            <Route path="/servicos" excat element={<Servicos />}/>
                            <Route path="/horarios" excat element={<Horarios />}/>
                            <Route path="/usuarios" excat element={<Usuarios />}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    );
};

export default App;