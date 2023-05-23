import NavbarShopper from "../../Components/Commons/NavbarShopper/NavbarShopper";
import NavbarSeller from "../../Components/Commons/NavbarSeller/NavbarSeller";
import {Link} from "react-router-dom";
import SearchBar from "../../Components/Commons/SearchBar/SearchBar";
import Card from "../../Components/Commons/Card/Card";
import Footer from "../../Components/Commons/Footer/Footer";
import React from "react";


const Results = (props) => {
    return(
        <div>
            {props.shopperConnected && <NavbarShopper/>}
            {props.sellerConnected && <NavbarSeller/>}
            <header>
                <Link to='/'>
                    <button>Home</button>
                </Link>
                <SearchBar onSearch={props.handleSearch} inicialState={props.ImportedSearch}/>
                <Link to='/'>
                    <button>Carrito</button>
                </Link>
                <Link to='/'>
                    <button>Mi cuenta</button>
                </Link>
            </header>
            <div className="card-container">
                {props.filteredData
                    .slice((props.currentPage - 1) * props.cardsLimit, props.currentPage * props.cardsLimit)
                    .map((item) => (
                        <Card
                            key={item.ID_PRODUCTO}
                            id={item.ID_PRODUCTO}
                            nombre={item.N_PRODUCTO}
                            precio={item.PRECIOBASE}
                            foto={item.IMAGEN}
                        />
                    ))}
            </div>
            <div className="pagination">
                <button
                    onClick={props.goToPreviousPage}
                    disabled={props.currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {props.currentPage}</span>
                <button
                    onClick={props.goToNextPage}
                    disabled={props.currentPage === Math.ceil(props.filteredData.length / props.cardsLimit)}
                >
                    Siguiente
                </button>
            </div>
            <Footer/>
        </div>
    )
}

export default Results