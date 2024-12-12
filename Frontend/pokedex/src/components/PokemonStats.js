import React from 'react';
import '../Styles/PokemonStats.css';


function PokemonStats({ stats }) {
  return (
    <div>
      <h3>Estadísticas:</h3>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>
            <strong>{stat.stat.name.toUpperCase()}</strong>: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonStats;
