import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import SearchBar from '../../Components/Commons/SearchBar/SearchBar';
import Card from '../../Components/Commons/Card/Card';
import Footer from '../../Components/Commons/Footer/Footer'; 
import data from './data/data';
import './Styles/Results.css';

const  ResultsPage = () => {
  const location = useLocation();
  const ImportedSearch = location.state.toString
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [cardsLimit, setCardsLimit] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(()=>{
    handleSearch(ImportedSearch)
  },[]);


  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1);
      console.log("PRUEBA")
      const filtered = data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);

  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log("PRUEBA1")
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / cardsLimit)) {
      setCurrentPage(currentPage + 1);
      console.log("PRUEBA2")
    }
  };

  return (
    <div>
      <header>
        <Link to='/'><button>Home</button></Link>
        <SearchBar onSearch={handleSearch} inicialState={ImportedSearch} />
        <Link to='/'><button>Carrito</button></Link>
        <Link to='/'><button>Mi cuenta</button></Link>
      </header>
      <div className="card-container">
        {filteredData
          .slice((currentPage - 1) * cardsLimit, currentPage * cardsLimit)
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              precio={item.precio}
              foto={item.foto}
            />
          ))}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(filteredData.length / cardsLimit)}
        >
          Siguiente
        </button>
      </div>
      <Footer /> 
    </div>
  );
}

export default ResultsPage;
