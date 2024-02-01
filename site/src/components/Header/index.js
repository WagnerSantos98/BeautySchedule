import React from 'react';
import Carousel from '../Carousel';

const Header = () => {
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link" href="#">Sobre nós</a>
                <a class="nav-item nav-link" href="#">Agendar</a>
            </div>
        </div>
        </nav>
        <Carousel/>
        </>
    );
};

export default Header;