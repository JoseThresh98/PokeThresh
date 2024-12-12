document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const pokemonInfo = document.getElementById('pokemon-info');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    // Función para desplegar el menú en dispositivos móviles
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Función para realizar la búsqueda de un Pokémon
    searchButton.addEventListener('click', async () => {
        const pokemonName = document.getElementById('pokemon-name').value.trim().toLowerCase();
        
        // Validar que el usuario ingresó un nombre
        if (!pokemonName) {
            pokemonInfo.innerHTML = '<p>Por favor, ingresa un nombre de Pokémon.</p>';
            return;
        }
    
        try {
            // Llamar al backend para obtener información del Pokémon
            const response = await fetch(`http://127.0.0.1:5000/pokemon/${pokemonName}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Datos recibidos:', data); // Ver los datos recibidos en la consola
    
            // Verificar si el backend devolvió datos válidos
            if (data.error) {
                pokemonInfo.innerHTML = `<p>No se encontró información para "${pokemonName}".</p>`;
                return;
            }

            // Comprobar si shiny_sprites está vacío, asignar un valor por defecto si es el caso
            const shinySprite = data.shiny_sprites || 'default_shiny_sprite.png';

            // Mostrar la información del Pokémon en el DOM con tarjetas flotantes
            pokemonInfo.innerHTML = `
                <div class="pokemon-card">
                    <h2>${data.name.toUpperCase()}</h2>
                    <!-- Usar el main_sprite en lugar de una imagen predeterminada -->
                    <img src="${data.main_sprite}" alt="${data.name}">
                    <p><strong>Tipo:</strong> ${data.types.join(', ')}</p>
                    <p><strong>Habilidades:</strong> ${data.abilities.join(', ')}</p>
                    <p><strong>Altura:</strong> ${data.height} m</p>
                    <p><strong>Peso:</strong> ${data.weight} kg</p>
                    <p><strong>Estadísticas:</strong></p>
                    <ul>
                        ${Object.entries(data.stats).map(([stat, value]) => `<li><strong>${stat}:</strong> ${value}</li>`).join('')}
                    </ul>
                    <div class="sprites">
                        <p><strong>Shiny:</strong></p>
                        <img src="${shinySprite}" alt="Shiny Pokémon">
                    </div>
                    <div class="evolutions">
                        <p><strong>Evoluciones:</strong></p>
                        <ul>
                            ${data.evolutions && data.evolutions.length > 0 ? 
                                data.evolutions.map(evolution => `<li>${evolution}</li>`).join('') :
                                '<li>No hay evoluciones disponibles</li>'
                            }
                        </ul>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error al buscar datos:', error); // Mostrar error en consola
            pokemonInfo.innerHTML = `<p>Error al buscar información del Pokémon "${pokemonName}".</p>`;
        }
    });
    
    // Función para manejar la selección de región desde el menú
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const region = link.getAttribute('data-region');

            // Cambiar el contenido principal al seleccionar una región
            pokemonInfo.innerHTML = `<h2>Explorando la región ${region.charAt(0).toUpperCase() + region.slice(1)}</h2>`;
        });
    });
});
