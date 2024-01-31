const Carousel = () => {
    return(
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="img-carosseel w-100" src="https://images.unsplash.com/photo-1561877202-53d0e24be55d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="First slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://images.unsplash.com/photo-1561622245-4d9cd72441a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Second slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://images.unsplash.com/photo-1508724735996-b41f69dfe2a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1156&q=80" class="d-block w-100" alt="Third slide"/>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
};

export default Carousel;