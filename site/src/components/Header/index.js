import React from 'react';
import salon from '../../assets/salon.jpg';
import demo_image_01 from '../../assets/demo_image_01.jpg';
import demo_image_02 from '../../assets/demo_image_02.jpg';
import ipad from '../../assets/ipad.png';

const Header = () => {
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
                        <li class="nav-item"><a class="nav-link" href="#login">Acessar</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        {/*Masthead*/}
        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Fashion Hair</h1>
                        <h2 class="text-white-50 mx-auto mt-2 mb-5"></h2>
                    </div>
                </div>
            </div>
        </header>
        
        {/*Sobre*/}
        <section class="about-section text-center" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-white mb-4">Sobre nós</h2>
                        <p class="text-white-50">
                        O Institut Belle Maison abriu suas portas pela primeira vez em 2012 e tem crescido desde então. Em 2014, abriu sua segunda unidade como resultado de muito trabalho e reconhecido sucesso! 
                        Somos uma rede familiar de salões que oferece serviços capilares, manicure, podologia, depilação, estética e dia da noiva.
                        </p>
                    </div>
                    <div class="col-lg-8">
                        <h2 class="text-white mb-4">Nossa visão</h2>
                        <p class="text-white-50">
                        Nossa missão é oferecer um verdadeiro momento de descontração, relaxamento e bem estar em uma atmosfera aconchegante por profissionais altamente qualificados e antenados nas novas tendências.
                        </p>
                    </div>
                </div>
                <img class="img-fluid" src={ipad}  alt="..." />
            </div>
        </section>
        
        {/*Serviços*/}
        <section class="projects-section bg-light" id="services">
            <div class="container px-4 px-lg-5">
                
                <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div class="col-xl-8 col-lg-7"><img class="img-fluid mb-3 mb-lg-0" src={salon} alt="..." /></div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="featured-text text-center text-lg-left">
                            <h4>Nossos Serviços</h4>
                            <p class="text-black-50 mb-0">Buscando excelência no atendimento aos seus clientes, o Fashion Hair conta com uma equipe de profissionais altamente qualificados oferencendo serviços personalizados.</p>
                        </div>
                    </div>
                </div>
                
                <section id="group">
                <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src={demo_image_01}  alt="..." /></div>
                    <div class="col-lg-6">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <h4 class="text-white">Equipe</h4>
                                    <p class="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="row gx-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src={demo_image_02}  alt="..." /></div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 class="text-white">Mountains</h4>
                                    <p class="mb-0 text-white-50">[Inserir carousel com a equipe]</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        </section>

        {/*Signup*/}
        <section class="signup-section" id="signup">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-md-10 col-lg-8 mx-auto text-center">
                        <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                        <h2 class="text-white mb-5">Entre em contato!</h2>
                    </div>
                </div>
            </div>
        </section>

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
                                <div class="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
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
        
        </>
    );
};

export default Header;