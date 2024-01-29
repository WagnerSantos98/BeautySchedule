import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Importe o hook `useSelector` do react-redux

import './styles.css';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Agendamentos from "./pages/Agendamentos";
import Clientes from "./pages/Clientes";
import Colaboradores from "./pages/Colaboradores"; 
import Servicos from "./pages/Servicos";
import Horarios from "./pages/Horarios";
import Usuarios from "./pages/Usuarios";
import Saloes from "./pages/Saloes";
import Login from "./pages/Login";


const App = () => {
    const userData = JSON.parse(localStorage.getItem('@user'));
    const nivelAcesso = userData ? userData.nivelAcesso : null;

    const rotasNivelP = [
        { path: "/", element: <Agendamentos /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/colaboradores", element: <Colaboradores /> },
        { path: "/servicos", element: <Servicos /> },
    ];

    const rotasNivelA = [
        { path: "/", element: <Agendamentos /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/colaboradores", element: <Colaboradores /> },
        { path: "/servicos", element: <Servicos /> },
        { path: "/horarios", element: <Horarios /> },
        { path: "/usuarios", element: <Usuarios /> },
        { path: "/saloes", element: <Saloes /> },
    ];

    return (
        <>
            {userData && <Header />}
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                        {userData && <Sidebar />}
                        <Routes>
                            {userData && nivelAcesso === 'P' && rotasNivelP.map((rota, index) => (
                                <Route key={index} path={rota.path} element={rota.element} />
                            ))}
                            {userData && nivelAcesso === 'A' && rotasNivelA.map((rota, index) => (
                                <Route key={index} path={rota.path} element={rota.element} />
                            ))}
                            {!userData && <Route path="/" element={<Login />} />}
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    );
};

export default App;