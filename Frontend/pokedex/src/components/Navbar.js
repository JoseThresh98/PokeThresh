import React, { useState } from 'react';
import '../Styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">PokéThresh</div>
      <button id="menu-icon" className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul id="nav-links" className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <a href="#" className="nav-link">Buscador</a>
        </li>
        <li>
          <a href="#" className="nav-link">Tipos</a>
        </li>
        <li className="menu-item">
          <a href="#" className="nav-link">Regiones</a>
          <ul className="sub-menu">
            <li><a href="#" className="nav-link">Kanto</a></li>
            <li><a href="#" className="nav-link">Johto</a></li>
            <li><a href="#" className="nav-link">Hoenn</a></li>
            <li><a href="#" className="nav-link">Sinnoh</a></li>
            <li><a href="#" className="nav-link">Teselia/Unova</a></li>
            <li><a href="#" className="nav-link">Kalos</a></li>
            <li><a href="#" className="nav-link">Alola</a></li>
            <li><a href="#" className="nav-link">Galar</a></li>
            <li><a href="#" className="nav-link">Paldea</a></li>
          </ul>
        </li>
        <li><a href="#" className="nav-link">Bayas</a></li>
        <li><a href="#" className="nav-link">Items</a></li>
        <li><a href="#" className="nav-link">Movimientos</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
