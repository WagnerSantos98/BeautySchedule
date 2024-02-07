import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import app from '../../components/Header/app';


const Agendar = () => {
    const location = useLocation();
    

    return(
        <>
        {/*Navigation*/}
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#page-top">Fashion Hair</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#about">Sobr-nós</a></li>
                        <li class="nav-item"><a class="nav-link" href="#services">Serviços</a></li>
                        <li class="nav-item"><a class="nav-link" href="#group">Equipe</a></li>
                        <li class="nav-item"><a class="nav-link" href="#signup">Contato</a></li>
                        <li class="nav-item">
                            <Link to="/agendar" className={location.pathname === '/agendar' ? 'active' : ''}>
                            <a class="nav-link">Agendar Agora</a>
                            </Link>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="#login">Acessar</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Agendar Agora</h1>
                    </div>
                </div>
            </div>
        </header>

        <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Agendar Agora</h2>
                    </div>
                </div>        
        </div>

         {/*Contato*/}
         <section class="contact-section bg-black">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Endereço</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50">R. José Domingues, 750 - Centro, Bragança Paulista - SP</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-envelope text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Email</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50"><a href="mailto:fashion_hair@gmail.com">fashion_hair@gmail.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-mobile-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Telefone</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50">(11)4032-5589</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="social d-flex justify-content-center">
                    <a class="mx-2" href="#!"><i class="mdi mdi-twitter"></i></a>
                    <a class="mx-2" href="#!"><i class="mdi mdi-facebook"></i></a>
                    <a class="mx-2" href="#!"><i class="mdi mdi-instagram"></i></a>
                </div>
            </div>
        </section>
        
        {/*Footer*/}
        <footer class="footer bg-black small text-center text-white-50"><div class="container px-4 px-lg-5">Copyright &copy; Fashion Hair 2024</div></footer>
        
        <script type="text/javascript" src={app}></script>

        
        </>
    );
};

export default Agendar;