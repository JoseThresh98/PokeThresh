import React, { useState } from 'react';
import '../Styles/Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchQuery);
    // Aquí puedes agregar la lógica para mostrar resultados de búsqueda
  };

  return (
    <div className="home">
      <h1>Bienvenido a PokéThresh</h1>
      <p>Busca tu Pokémon favorito:</p>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Home;
