import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles.css';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Agendamentos from "./pages/Agendamentos";
import Clientes from "./pages/Clientes";

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
                        </Routes>
                    </Router>
                </div>
            </div>
        </>
    );
};

export default App;