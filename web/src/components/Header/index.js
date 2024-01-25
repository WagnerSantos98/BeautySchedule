import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSalao } from "../../store/modules/salao/actions";

const Header = () => {
    const dispatch = useDispatch();
    const { salao } = useSelector((state) => state.salao);

    useEffect(() => {
        // Disparar a ação para obter as informações do salão quando o componente monta
        dispatch(getSalao());
    }, [dispatch]);

    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div>
                    <span className="d-block m-0 p-0 text-white">{salao.nome}</span>
                    <small className="m-0 p-0">Plano Gold</small>
                </div>
                <img src="https://materializecss.com/images/yuna.jpg" alt="Salão Logo" />
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    );
};

export default Header;
