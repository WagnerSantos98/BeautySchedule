import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Sidebar = () => {
    return (
        <sidebar className="col-2 h-100">
            <img src={logo} className="img-fluid px-3 py-4"/>
            <ul>
                <li>
                    <Link to="/">
                        <span className="mdi mdi-calendar-check"></span>
                        <text>Agendamentos</text>
                    </Link>
                </li>
                <li>
                    <Link to="/clientes">
                        <span className="mdi mdi-account-multiple"></span>
                        <text>Clientes</text>
                    </Link>
                </li>
            </ul>
        </sidebar>
    );
};

export default Sidebar;