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
    const isAuthenticated = true;

    return (
        <>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                    {isAuthenticated && (
                    <>
                        <Header />
                        <Sidebar />
                    </>
                    )} 
                        <Routes>
                            {isAuthenticated ? (
                                <>
                                    <Route path="/" element={<Agendamentos />} />
                                    <Route path="/clientes" element={<Clientes />} />
                                    <Route path="/colaboradores" element={<Colaboradores />} />
                                    <Route path="/servicos" element={<Servicos />} />
                                    <Route path="/horarios" element={<Horarios />} />
                                    <Route path="/usuarios" element={<Usuarios />} />
                                    <Route path="/saloes" element={<Saloes />} />
                                </>
                            ) : (
                                // Redireciona para a página de login se o usuário não estiver autenticado
                                <Route path="/" element={<Navigate to="/login" />} />
                            )}
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    );
};

export default App;
