import React, { useState } from 'react';
import '../Styles/Home.css';
import PokemonCard from '../components/PokemonCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Por favor, introduce el nombre de un Pokémon.');
      setPokemonData(null);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/pokemon/${searchQuery.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`No se encontró el Pokémon ${searchQuery}.`);
      }

      const data = await response.json();
      setPokemonData(data); // Actualiza el estado con los datos del Pokémon
      setError(null);
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    }
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

      {error && <div className="error">{error}</div>}

      {pokemonData && (
        <div className="pokemon-result">
          <PokemonCard pokemonData={pokemonData} />
        </div>
      )}
    </div>
  );
}

export default Home;
