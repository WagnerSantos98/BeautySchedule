import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Agendar from "./pages/Agendar";
import Sobre from "./pages/Sobre";
import './styles.css';

const App = () => {
    return (
        <Router>
            <>
                <Header />
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <Routes>
                            <Route path="/agendar" excat element={<Agendar />} />
                            <Route path="/sobre-nos" excat element={<Sobre />} />
                        </Routes>
                    </div>
                </div>
            </>
        </Router>
    );
};

export default App;
