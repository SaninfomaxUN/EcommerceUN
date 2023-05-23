import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
// import data from './data/data';
import './Styles/Results.css';
import Cookies from "js-cookie";
import Results from "./Results";
import axios from "axios";
import {CircularProgress} from "@mui/material";




const ResultsPage = () => {
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();
    const ImportedSearch = location.state.toString
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [cardsLimit, setCardsLimit] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        handleSearch(ImportedSearch)
    },[]);


    const searchProduct = (textToSearch) => {
        axios.post('http://localhost:5000/api/searchProduct', {toSearch: textToSearch})
            .then(res => {
                setLoaded(true)
                setData(res.data)
                console.log(data)
                console.log("---------------------")
            })
            .catch(err => {
                console.log("*************")
            });
        return data
    };

    const token = Cookies.get('token');
    const role = Cookies.get('role');
    let shopperConnected = false
    let sellerConnected = false
    if (token && role === 'comprador') {
        shopperConnected = true
    } else if (token && role === 'vendedor') {
        sellerConnected = true
    }

    const handleSearch = (text) => {
        console.log("wwwwwwwww" + text)
        searchProduct(text);
        setSearchText(text);
        setCurrentPage(1);
        console.log(data)
        console.log(data)
        const filtered = data.filter((item) =>
            item.N_PRODUCTO.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);

    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / cardsLimit)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
        {!loaded && <CircularProgress color="success"/>}
        {loaded &&
            <div>
            <Results shopperConnected={shopperConnected}
                     sellerConnected={sellerConnected}
                     handleSearch={handleSearch}
                     ImportedSearch={ImportedSearch}
                     filteredData={filteredData}
                     currentPage={currentPage}
                     cardsLimit={cardsLimit}
                     goToPreviousPage={goToPreviousPage}
                     goToNextPage={goToNextPage}
                     loaded={loaded}
            />
                </div>}
            {/*{shopperConnected && <NavbarShopper/>}
            {sellerConnected && <NavbarSeller/>}
            <header>
                <Link to='/'>
                    <button>Home</button>
                </Link>
                <SearchBar onSearch={handleSearch} inicialState={ImportedSearch}/>
                <Link to='/'>
                    <button>Carrito</button>
                </Link>
                <Link to='/'>
                    <button>Mi cuenta</button>
                </Link>
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
            <Footer/>*/}
        </div>
    );
}

export default ResultsPage;
