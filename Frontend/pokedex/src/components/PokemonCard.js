import React from 'react';
import '../Styles/PokemonCard.css'; // Importa el archivo CSS

function PokemonCard({ data, shinySprite }) {
  return (
    <div className="pokemon-card">
      <h2>{data.name.toUpperCase()}</h2>
      <img src={data.main_sprite} alt={data.name} />
      <p><strong>Tipo:</strong> {data.types.join(', ')}</p>
      <p><strong>Habilidades:</strong> {data.abilities.join(', ')}</p>
      <p><strong>Altura:</strong> {data.height} m</p>
      <p><strong>Peso:</strong> {data.weight} kg</p>
      <p><strong>Estadísticas:</strong></p>
      <ul>
        {Object.entries(data.stats).map(([stat, value]) => (
          <li key={stat}>
            <strong>{stat}:</strong> {value}
          </li>
        ))}
      </ul>
      <div className="sprites">
        <p><strong>Shiny:</strong></p>
        <img src={shinySprite} alt="Shiny Pokémon" />
      </div>
      <div className="evolutions">
        <p><strong>Evoluciones:</strong></p>
        <ul>
          {data.evolutions && data.evolutions.length > 0 ? (
            data.evolutions.map((evolution, index) => (
              <li key={index}>
                <img src={evolution.sprite} alt={`Evolución de ${data.name}`} />
              </li>
            ))
          ) : (
            <li>No hay evoluciones disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PokemonCard;
