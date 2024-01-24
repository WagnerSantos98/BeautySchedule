import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsuario } from '../../store/modules/usuario/actions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const dispatch = useDispatch();
    const { usuario } = useSelector((state) => state.usuario);

    const handleLogin = (e) => {
        e.preventDefault();
    
        // Verifique se 'usuario' é verdadeiro antes de acessar suas propriedades
        if (usuario) {
            dispatch(loginUsuario({ email, senha })); // Passando as credenciais corretamente
        } else {
            // Lógica apropriada para lidar com 'usuario' sendo undefined
            console.error("Usuário não está definido.");
        }
    };

    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="card w-75 mt-5">
                        <div className="card-header">
                            <h4 className="card-title">Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
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
