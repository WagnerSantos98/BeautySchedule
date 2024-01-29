import React, {useEffect, useState} from 'react';
const Header = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('@user')))
    },[]);

    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div>
                    <span className="d-block m-0 p-0 text-white">Beauty Schedule</span>
                    <small className="m-0 p-0 text-white">{user?.nome}</small>
                </div>
                <img src={user?.foto} alt="Salão Logo" />
            </div>
        </header>
    );
};

export default Header;
