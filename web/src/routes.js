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
    const logado = localStorage.getItem('@user');

    return (
        <>
            {logado &&<Header/>}
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                       {logado &&<Sidebar/>}
                        <Routes>
                            
                                    {logado && <Route path="/" element={<Agendamentos />} />}
                                    {logado && <Route path="/clientes" element={<Clientes />} />}
                                    {logado &&<Route path="/colaboradores" element={<Colaboradores />} />}
                                    {logado &&<Route path="/servicos" element={<Servicos />} />}
                                    {logado &&<Route path="/horarios" element={<Horarios />} />}
                                    {logado &&<Route path="/usuarios" element={<Usuarios />} />}
                                    {logado &&<Route path="/saloes" element={<Saloes />} />}   
                                    {!logado && <Route path="/" element={<Login />}/>}
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    );
};

export default App;
