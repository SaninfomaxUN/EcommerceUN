import React, { useState } from 'react';
import "./Styles/SearchBar.css"

function SearchBar({ onSearch,inicialState}) {
  const [searchText, setSearchText] = useState(inicialState);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    onSearch(text); // Llama a la función de búsqueda con el texto actualizado
  };
  return (
    <nav className='navbar-search'>
      <input className='buscar'
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Buscar..."
      />
    </nav>
  );
}

export default SearchBar;
