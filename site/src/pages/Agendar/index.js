import React from 'react';
import { useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Button, Drawer } from 'rsuite';
import Table from '../../components/Table';
import moment from 'moment';
import 'rsuite/dist/rsuite.css';
import { useDispatch, useSelector } from 'react-redux';
import { allServicos, updateServico, addServico } from '../../store/modules/servico/actions';
import { updateForm, updateAgendamento } from '../../store/modules/salao/actions';
import consts from '../../consts';
import util from '../../util';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Agendar = ({ agenda = [], dataSelecionada, horaSelecionada, horariosDisponiveis}) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const { servicos, servico, form, components, behavior } = useSelector((state) => state.servico);
    const { salao } = useSelector((state) => state.salao);

    

    const setComponent = (component, state) => {
        dispatch(updateServico({
            components: { ...components, [component]: state }, 
        }));
    };

    const setServico = (key, value) => {
        dispatch(
            updateServico({
                servico: { ...servico, [key]: value },
            }));
    }

    const save = () => {
        dispatch(addServico());
    };

    
    useEffect(() => {
        dispatch(allServicos());        
    },[dispatch]);

        
        const setAgendamento = (value, isTime = false) => {
            const { horariosDisponiveis } = util.selectAgendamento(agenda, isTime ? dataSelecionada : value);
            let data = !isTime ? `${value}T${horariosDisponiveis[0][0]}` : `${dataSelecionada}T${value}`;
            dispatch(updateAgendamento({data}))
        }

        //Swiper
        /*const swiper = new Swiper('.carousel-container', {
            slidesPerView: 5,
            spaceBettween: 10,
            navigation: {
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
            },
        });*/

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
                        <h2 className="mb-4 mt-0">{salao?.nome}</h2>
                        <label>{salao?.endereco?.cidade}</label>
                    </div>
                </div>
        </div>
        
        <div className="col p-5 overflow-auto h-100">
            <Drawer 
            
            open={components.drawer}
            size="sm"
            onHide={() => {
                setComponent('drawer', false);
            }}
            onClose={() => {
                setComponent('drawer', false);
            }}
            >
                <Drawer.Body>
                    <h3>{behavior === 'create' ? '' : 'Finalizar' } agendamento</h3>
                    <div className="row mt-3">
                        <div className="form-group col-6">
                            <b>Título</b><br></br>
                            <label>{servico?.titulo}</label>
                        </div>
                        <div className="form-group col-3">
                            <b>Preço</b><br></br>
                            <label>R$ {servico?.preco.toFixed(2)}</label>
                        </div>
                        <div className="form-group col-4 mt-3">
                            <b className="">Duração</b><br></br>
                            <label>{moment(servico?.duracao).format('HH:mm')} min</label>
                        </div>
                        <div className="form-group col-12 mt-3">
                            <b>Descrição</b>
                            <textarea
                            disabled 
                                className="form-control"
                                rows="5"
                                placeholder="Descrição do servico..."
                                value={servico?.descricao}
                                onChange={(e) => setServico('descricao', e.target.value)}
                            >
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </textarea>
                        </div>
                        <div className="form-group col-12 mt-3">
                            <b className="d-block">Imagem do serviço</b>
                            <img src={`${ consts.bucketUrl }/${servico?.arquivos[0]?.caminho}`} style={{width: 100, height: 120, borderRadius: 3}}/>
                        </div>
                        <div className="form-group col-12 mt-3">
                            <div className="carousel-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Dom</h2>
                                        <p className="title-day-week">01</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Seg</h2>
                                        <p className="title-day-week">02</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Ter</h2>
                                        <p className="title-day-week">03</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Qua</h2>
                                        <p className="title-day-week">04</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Qui</h2>
                                        <p className="title-day-week">05</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Sex</h2>
                                        <p className="title-day-week">06</p>
                                    </div>
                                    <div className="swiper-slide">
                                        <h2 className="title-week">Sáb</h2>
                                        <p className="title-day-week">07</p>
                                    </div>
                                </div>

                                <div className="custom-swiper-button custom-swiper-button-prev">&#9664;</div>
                                <div className="custom-swiper-button custom-swiper-button-next">&#9664;</div>
                            </div>
                        </div>
                    </div>
                    <Button 
                        block
                        className="mt-3"
                        appearance="primary"
                        color={behavior === 'create' ? 'green' : 'primary'}
                        size="lg"
                        loading={form.saving}
                        onClick={() => save()}
                    >
                       {behavior === 'create' ? 'Salvar' : 'Finalizar'} agendamento
                    </Button>
                                
                </Drawer.Body>
            </Drawer>

           
            
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Serviços({servicos.length})</h2>
                        <input
                            className="form-control"
                            placeholder="Digite o nome do serviço..." 
                            onChangeText={(value) => dispatch(updateForm({ inputFiltro: value }))}
                            onFocus={() => dispatch(updateForm({ inputFiltroFoco: true }))}   
                            onBlur={() => dispatch(updateForm({ inputFiltroFoco: false }))} 
                        />
                    </div>
                    <Table
                    loading={form.filtering}
                    data={servicos}
                    config={[
                        { label: 'Imagem', key: 'foto', content: (servico) => <img src={`${consts.bucketUrl}/${servico?.arquivos[0]?.caminho}`}/>, width: 100, height: 50, fixed: true},
                        { label: 'Título', key: 'titulo'},
                        { label: 'Preço R$', content: (servico) => `R$ ${servico?.preco?.toFixed(2)}` },
                        { label: 'Duração', key: 'duracao', content: (servico) => moment(servico.duracao).format('HH:mm')},
                    ]}
                    actions={(servico) => (
                        <Button color="primary" size="xs"><i className="mdi mdi-clock-check-outline"></i> Agendar</Button>
                    )}
                    onRowClick={(servico) => {
                        dispatch(
                            updateServico({
                                behavior: 'update',
                            })
                        );
                        dispatch(
                            updateServico({
                                servico,
                            })
                        );
                        setComponent('drawer', true);
                    }}
                    />
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

       
        </>
    );
};

export default Agendar;