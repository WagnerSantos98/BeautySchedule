import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Carousel from './components/Carousel';

import Agendamentos from "./pages/Agendamentos";
import Sobre from "./pages/Sobre";
import Agendar from "./pages/Agendar";

//Css
import './styles.css';


const App = () => {
    return(
        <>
        <Header/>
        <div className="container-fluid h-100">
            <div className="row h-100">
            <Router>
                <Carousel/>
                <Routes>
                    <Route path="/" exact component={Agendamentos}/>
                    <Route path="/sobre-nos" exact component={Sobre}/>
                    <Route path="/agendar" exact component={Agendar}/>
                </Routes>
            </Router>
            </div>
        </div>
        </>
    );
};

export default App;