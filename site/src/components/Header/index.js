import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import salon from '../../assets/salon.jpg';
import ipad from '../../assets/ipad.png';

import app from './app';


const Header = () => {
    const location = useLocation();

    const [isDivVisible, setDivVisibility] = useState(false);
    const toggleDiv = () => {
        setDivVisibility(!isDivVisible);
    };

    return(
        <>
        {/*Navigation*/}
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="container px-4 px-lg-5">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    <a class="navbar-brand">Fashion Hair</a>
                </Link>
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

        {/*Masthead*/}
        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Fashion Hair</h1>
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
                <div class="row gx-0 mb-4 mb-lg-5">
                    <div class="col-xl-12 col-lg-7 d-flex justify-content-center">
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front card1">
                                    <h1>Cabelos</h1>
                                </div>
                                <div class="flip-card-back card1">
                                <p>Cortes, tratamentos, penteados</p> 
                                </div>
                            </div>
                        </div>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front card2">
                                    <h1>Mãos e pés</h1> 
                                </div>
                                <div class="flip-card-back card2">
                                <p>Manicure, pedicure, e muito mais</p> 
                                </div>
                            </div>
                        </div>
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front card3">
                                    <h1>Rosto e corpo</h1> 
                                </div>
                                <div class="flip-card-back card3">
                                <p>Epilação, massagem, maquiagem</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container px-4 px-lg-5 mb-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center align-items-center">
                        <div class="col-lg-8 text-center">
                            <h2 class="text-black mb-4">Conheça nossa lista completa de serviços</h2>
                            <button type="button" class="btn btn-outline-primary btn-lg" onClick={toggleDiv}> <i className="mdi mdi-format-list-bulleted" style={{fontSize: 16}}> Ver todos os serviços</i></button>
                        </div>                    
                    </div>
                </div>

                <div id="myDiv" class="container px-4 px-lg-5 mb-lg-5" className={isDivVisible ? 'visible' : 'hidden'}>
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-lg-4">
                            <h2 class="text-black mb-4 text-center">Cabelo</h2>
                            <div class="text-black-50">
                                <p><i className="mdi mdi-checkbox-marked"></i> Alinhamento capilar (com e sem formol)</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Alongamento capilar</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Coloração/Matização</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Corte</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Corte bordado</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Escova</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Mechas</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Penteado</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Tratamentos capilares (hidratação, nutrição, reconstrução e detox)</p>
                            </div>
                            
                        </div>
                        <div class="col-lg-4">
                            <h2 class="text-black mb-4 text-center">Maõs</h2>
                            <div class="text-black-50">
                                <p><i className="mdi mdi-checkbox-marked"></i> Alongamento de unhas</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Esmaltação em gel</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Manicure</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Massagem dos pés</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Pedicure</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Plástica dos pés</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Podal Russo</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> SPA das mãos e pés</p>
                            </div>
                            
                        </div> 
                        <div class="col-lg-4">
                            <h2 class="text-black mb-4 text-center">Rosto e Corpo</h2>
                            <div class="text-black-50">
                                <p><i className="mdi mdi-checkbox-marked"></i> Coloração de cílios e sobrancelhas</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Design de sobrancelha</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Equilação com cera (feminina e masculina)</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Equilação egípcia</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Lash Lifting</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Limpeza de pele</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Maquiagem</p>
                                <p><i className="mdi mdi-checkbox-marked"></i> Massagem</p>
                            </div>
                            
                        </div>                               
                    </div>
                </div>

        
                
                <section id="group">
                                
                
                <div class="row gx-0 justify-content-center">
                <div class="col-lg-12 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                <div class="testimonial-slider">
  <div id="carouselExampleControls" class="carousel carousel-dark">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class="testimonial-title">
            <i class="bi bi-quote display-1"></i>
            <h2 class="fw-bold display-6">Conheça nossa equipe</h2>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="col-md-8">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-1-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 1</h5>
                  <i class="bi bi-star-fill text-warning pe-1"></i>
                  <i class="bi bi-star-fill text-warning pe-1"></i>
                  <i class="bi bi-star-fill text-warning pe-1"></i>
                  <i class="bi bi-star-fill text-warning pe-1"></i>
                  <i class="bi bi-star-fill text-warning pe-1"></i>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 2</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-3-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 3</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-4-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 4</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-5-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 5</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card">
                <div class="img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-6-scaled.jpg" class="d-block w-100" alt="..."/> </div>
                <div class="card-body">
                  <h5 class="card-title">Card title 6</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up
                    the bulk of the
                    card's content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
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

export default Header;