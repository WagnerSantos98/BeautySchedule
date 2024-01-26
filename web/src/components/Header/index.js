
const Header = () => {
    

    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div>
                    <span className="d-block m-0 p-0 text-white">Beauty Schedule</span>
                    <small className="m-0 p-0">Plano Gold</small>
                </div>
                <img src="https://materializecss.com/images/yuna.jpg" alt="Salão Logo" />
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    );
};

export default Header;
