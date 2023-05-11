import React from 'react'

import img4 from "../Assets/asusimg.jpg"

import img5 from "../Assets/asusimg.jpg"

import img6 from "../Assets/asusimg.jpg"

const CarruselTop = () => {
  return (
    <div>
        <div className='carousel'>

    <div id="carouselExampleIndicators" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={img4} className="d-block w-100" height="300px" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img5} className="d-block w-100" height="300px" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img6} className="d-block w-100"  height="300px"alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>  
      




    </div>
  )
}

export default CarruselTop