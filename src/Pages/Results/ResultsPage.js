import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import './Styles/Results.css';
import Cookies from "js-cookie";
import Results from "./Results";
import axios from "axios";


const ResultsPage = () => {
    const location = useLocation();
    const ImportedSearch = location.state.toString
    const [notFoundAlert,setNotFoundAlert] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [cardsLimit, setCardsLimit] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const searchFirstTime = async () => {
        await axios.post(process.env.REACT_APP_API +'/searchProduct', {toSearch: ImportedSearch})
            .then(res => {
                setData(res.data)
                setFilteredData(res.data)
                setNotFoundAlert(false)
            })
            .catch(err => {
                setNotFoundAlert(true)
                console.log("*************000")
            });
    };


    useEffect(() => {
        // handleSearch(ImportedSearch)
        searchFirstTime().then()
    },[]);


    const searchProduct = (textToSearch) => {
        axios.post(process.env.REACT_APP_API +'/searchProduct', {toSearch: textToSearch})
            .then(res => {
                setData(res.data)
                setNotFoundAlert(false)
            })
            .catch(err => {
                setNotFoundAlert(true)
                console.log("*************111")
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
        searchProduct(text);
        setSearchText(text);
        setCurrentPage(1);
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
                     notFoundAlert={notFoundAlert}

            />
                </div>
        </div>
    );
}

export default ResultsPage;
