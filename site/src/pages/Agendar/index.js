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
import { Touchable, Text } from 'react-native';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'

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
                            <label>{servico.titulo}</label>
                        </div>
                        <div className="form-group col-3">
                            <b>Preço</b><br></br>
                            <label>R$ {}</label>
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
                        <Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={-50}
  slidesPerView={3}
  navigation
  onSwiper={(swiper) => console.log(swiper)}
  onSlideChange={() => console.log('slide change')}
>
  {agenda && agenda.map((item) => {
    const date = moment(Object.keys(item)[0]);
    const dateISO = moment(date).format('YYYY-MM-DD');
    const selected = dateISO === dataSelecionada;

    return (
      <SwiperSlide key={dateISO}>
        <Touchable
          width="70px"
          height="80px"
          spacing="0 10px 0 0"
          rounded="10px"
          direction="column"
          justify="center"
          align="center"
          //border={`1px solid ${selected ? theme.colors.primary : util.toAlpha(theme.colors.muted, 50)}`}
          background={selected ? 'primary' : 'light'}
          onPress={() => setAgendamento(dateISO)}
        >
          <Text small color={selected ? 'light' : undefined}>{util.diasSemana[date.day()]}</Text>
          <Text small color={selected ? 'light' : undefined}>{date.format('DD')}</Text>
          <Text small color={selected ? 'light' : undefined}>{date.format('MMMM')}</Text>
        </Touchable>
      </SwiperSlide>
    );
  })}
</Swiper>
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
                        {label: 'Imagem', key: 'foto', width: 200, fixed: true},
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