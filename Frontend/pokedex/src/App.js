import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'; // Asegúrate de tener este componente creado.
import PokemonStats from './components/PokemonStats';
import './Styles/App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Obtener datos de un Pokémon (por defecto, Pikachu)
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  return (
    <div className="App">
      {/* Componente del menú */}
      <Navbar />

      <main>
        {/* Contenido principal */}
        {pokemon ? (
          <div className="pokemon-card">
            <h2>{pokemon.name.toUpperCase()}</h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width="150"
            />
            <PokemonStats stats={pokemon.stats} />
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </main>
    </div>
  );
}

export default App;
