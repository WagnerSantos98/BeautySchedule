import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsuario } from '../../store/modules/usuario/actions';

const Login = () => {
    
    const [credenciais, setCredenciais] = useState({
        email: '',
        senha: ''
    });
    const login = () => {
        console.log(credenciais);
    }
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="card w-75 mt-5">
                        <div className="card-header">
                            <h4 className="card-title">Login</h4>
                        </div>
                        <div className="card-body">
                            <>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setCredenciais({
                                                ...credenciais,
                                                email: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Senha"
                                        onChange={(e) => {
                                            setCredenciais({
                                                ...credenciais,
                                                senha: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onc>Login</button>
                            </>
                        </div>
                        <div className="card-footer">
                            <p className="text-muted mb-0">Esqueceu a senha? <Link to="/register">Clique aqui</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
