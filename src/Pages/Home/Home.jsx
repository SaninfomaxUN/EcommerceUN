import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import "./Styles/Home.css"

import laptop from "./Assets/Categories/laptop.jpg"
import car from "./Assets/Categories/car.jpg"
import gamer from "./Assets/Categories/gamer.jpg"
import pets from "./Assets/Categories/pets.jpg"
import tools from "./Assets/Categories/tools.jpg"
import belleza from "./Assets/Categories/belleza.jpg"
import celular from "./Assets/Categories/cel.jfif"


import img4 from './Assets/Carrousel/img4.jpg'
import img5 from './Assets/Carrousel/img5.jpg'
import img6 from './Assets/Carrousel/img6.jpg'


import Navbar from "../../Components/Commons/Navbar/Navbar.jsx"
import Deslice from "../../Components/Commons/Deslice/Deslice.jsx"




// Pages





export default function Home () {
return (
    <div>
    <Navbar /> 
   
    
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
<br />
<br />
  <h2 className='tittleP'>Productos populares</h2>
  <Deslice/>





<section className='offContainer'>
<div className='offtotal'>
  <div> 
    <br />
    <br />
    <h3 className='titleoff'>Descuentos </h3>
    <h3 className='titleoff'>del día</h3>
  </div>
 
<br />
<br />
</div>
</section>























<h2 className='tittleP2'>Categorias para ti</h2>
<div className='grap1'>
<div className="card cardContainer1" >
  
  <a href="/PageCompu" >
  <img src={laptop} className="card-img-top" to="/PageCategories" alt="..."/>
  </a>

  <div className="card-body">
    <h5 className="card-title">Computación</h5>

  </div>
</div>

<div className="card cardContainer1" >
  <img src={pets} className="card-img-top" height="250px"alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Mascotas</h5>
    
  </div>
</div>

<div className="card cardContainer1" >
  <img src={belleza} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Cuidado personal</h5>
 
  </div>
</div>

<div className="card cardContainer1" >
  <img src={gamer} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Gaming</h5>
   
  
  </div>
</div>


<div className="card cardContainer1" >
  <img src={car} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Vehiculos</h5>
    
  </div>
</div>

<div className="card cardContainer1" >
  <img src={celular} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Telefono, celular</h5>
   
  </div>
</div>

<div className="card cardContainer1" >
  <img src={tools} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Herramientas</h5>
    
  </div>
</div>
</div>

<h2 className='tittleP'>Categorias recomendadas</h2>
<div className='grap2'>
<div className="card cardContainer" >
<a href="/PageCompu" >
<span className="material-symbols-outlined">computer</span>
  </a>
    <div className="card-body">
    <p className="card-text">Tecnologia</p>
    </div>
</div>

<div className="card cardContainer" >
<span className="material-symbols-outlined">
checkroom
</span>
    <div className="card-body">
    <p className="card-text">Ropa y accesorios</p>
    </div>
</div>
<div className="card cardContainer" >
    <span></span>
    <div className="card-body">
    <span className="material-symbols-outlined">
pets
</span>
    <p className="card-text">Mascotas</p>
    </div>
</div>
<div className="card cardContainer" >
    <span></span>
    <div className="card-body">
    <span className="material-symbols-outlined ">
agriculture
</span>
    <p className="card-text">Agricultura</p>
    </div>
    </div>
<div className="card cardContainer" >
    <div className="card-body">
    <span className="material-symbols-outlined">
smartphone
</span>
    <p className="card-text">Celulares y telefonos</p>
    </div>
  </div>





 

<div className="card cardContainer" >

    <div className="card-body">
    <span className="material-symbols-outlined">
construction
</span>
    <p className="card-text">Herramientas</p>
    </div>
</div>
<div className="card cardContainer" >
    <span></span>
    <div className="card-body">
    <span className="material-symbols-outlined">
diversity_3
</span>
    <p className="card-text">Cuidado personal</p>
    
    </div>
</div>
<div className="card cardContainer" >
    <span></span>
    <div className="card-body">
    <span className="material-symbols-outlined">
stadia_controller
</span>
    <p className="card-text">Video juegos</p>
    </div>
    </div>
<div className="card cardContainer" >
   
    <div className="card-body">
    <span className="material-symbols-outlined">
directions_car
</span>
    <p className="card-text">Carros, vehiculos otros</p>
    </div>
  </div>

</div>
</div>
  )  
}



