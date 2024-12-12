import React from 'react';
import '../Styles/PokemonCard.css';

function PokemonCard({ pokemonData }) {
    if (!pokemonData) {
      return <div>No se encontraron datos del Pokémon.</div>;
    }
  
    const {
      name = 'Desconocido',
      main_sprite = 'https://via.placeholder.com/150',
      types = [],
      abilities = [],
      height = 'N/A',
      weight = 'N/A',
      stats = {},
      shiny_sprites = 'https://via.placeholder.com/150',
      evolutions = [],
    } = pokemonData;
  
    return (
      <div className="pokemon-card">
        <h2>{name.toUpperCase()}</h2>
        <img src={main_sprite} alt={`Sprite principal de ${name}`} />
        <p><strong>Tipo:</strong> {types.length > 0 ? types.join(', ') : 'Desconocido'}</p>
        <p><strong>Habilidades:</strong> {abilities.length > 0 ? abilities.join(', ') : 'Desconocidas'}</p>
        <p><strong>Altura:</strong> {height} m</p>
        <p><strong>Peso:</strong> {weight} kg</p>
        <p><strong>Estadísticas:</strong></p>
        <ul>
          {Object.entries(stats).length > 0 ? (
            Object.entries(stats).map(([stat, value]) => (
              <li key={stat}>
                <strong>{stat}:</strong> {value}
              </li>
            ))
          ) : (
            <li>No hay estadísticas disponibles.</li>
          )}
        </ul>
        <div className="sprites">
          <p><strong>Shiny:</strong></p>
          <img src={shiny_sprites} alt={`Sprite shiny de ${name}`} />
        </div>
        <div className="evolutions">
            <p><strong>Evoluciones:</strong></p>
            <ul>
                {evolutions.length > 0 ? (
                evolutions.map((evolution, index) => (
                    <li key={index} className="evolution">
                    <img src={evolution.sprite} alt={evolution.name} className="evolution-sprite" />
                    <p>{evolution.name}</p>
                    {index < evolutions.length - 1 && <span className="arrow">➡️</span>}
                    </li>
                ))
                ) : (
                <li>No tiene evoluciones.</li>
                )}
            </ul>
        </div>

      </div>
    );
  }
  

export default PokemonCard;
