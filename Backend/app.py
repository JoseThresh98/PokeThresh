from flask import Flask, jsonify
from flask_cors import CORS  # Importar CORS
import requests

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Función para obtener las evoluciones de un Pokémon
def get_evolutions(species_url):
    try:
        # Solicitar los datos de la especie para obtener el ciclo de evolución
        response = requests.get(species_url)
        if response.status_code != 200:
            print(f"Error al obtener datos de la especie: {species_url}")
            return []

        species_data = response.json()

        # Verificar si la evolución está presente en los datos
        if 'evolution_chain' in species_data:
            evolution_url = species_data['evolution_chain']['url']
            evolution_response = requests.get(evolution_url)
            if evolution_response.status_code != 200:
                print(f"Error al obtener datos de la cadena de evolución: {evolution_url}")
                return []

            evolution_data = evolution_response.json()
            evolutions = []

            # Recorrer la cadena de evoluciones
            current_evolution = evolution_data['chain']
            while current_evolution:
                evolutions.append(current_evolution['species']['name'])
                # Avanzar a la siguiente evolución
                if 'evolves_to' in current_evolution and len(current_evolution['evolves_to']) > 0:
                    current_evolution = current_evolution['evolves_to'][0]
                else:
                    break

            return evolutions
        else:
            print(f"No se encontró evolución para la especie: {species_url}")
            return []
    except Exception as e:
        print(f"Error al obtener evoluciones: {e}")
        return []

# Ruta para obtener la información de un Pokémon
@app.route('/pokemon/<pokemon_name>', methods=['GET'])
def get_pokemon(pokemon_name):
    try:
        # Realizar la petición a la API de Pokémon
        url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"
        response = requests.get(url)

        if response.status_code != 200:
            return jsonify({'error': f"No se encontró el Pokémon {pokemon_name}"}), 404

        pokemon_data = response.json()

        # Obtener la URL de la especie para buscar las evoluciones
        species_url = pokemon_data['species']['url']
        evolutions = get_evolutions(species_url)

        # Obtener los sprites shiny de las diferentes generaciones si están disponibles
        shiny_sprites = ""
        
        # Verificar si hay sprites shiny en la generación V (Black-White)
        if 'sprites' in pokemon_data:
            shiny_sprites = pokemon_data['sprites'].get('versions', {}).get('generation-v', {}).get('black-white', {}).get('shiny', "")
        
        # Si no se encontró shiny, intentar buscar en otra generación o dejar vacío
        if not shiny_sprites:
            shiny_sprites = pokemon_data['sprites'].get('front_shiny', "")

        # Si shiny_sprites sigue vacío, asignar un valor por defecto
        if not shiny_sprites:
            shiny_sprites = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/0.png"  # Imagen por defecto

        # Obtener el sprite principal del Pokémon
        main_sprite = pokemon_data['sprites'].get('front_default', "")  # Sprite principal

        # Si no hay sprite principal, asignar un valor por defecto
        if not main_sprite:
            main_sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png"  # Imagen por defecto

        # Imprimir los sprites para depuración
        print(f"Shiny sprites para {pokemon_name}: {shiny_sprites}")
        print(f"Sprite principal para {pokemon_name}: {main_sprite}")

        # Construir el objeto de respuesta
        pokemon_info = {
            'name': pokemon_data['name'],
            'types': [type_info['type']['name'] for type_info in pokemon_data['types']],
            'abilities': [ability['ability']['name'] for ability in pokemon_data['abilities']],
            'height': pokemon_data['height'] / 10,  # Convertir de decímetros a metros
            'weight': pokemon_data['weight'] / 10,  # Convertir de hectogramos a kilogramos
            'stats': {stat['stat']['name']: stat['base_stat'] for stat in pokemon_data['stats']},
            'shiny_sprites': shiny_sprites,
            'main_sprite': main_sprite,  # Agregar el sprite principal
            'evolutions': evolutions if evolutions else ['No tiene evoluciones.']
        }

        return jsonify(pokemon_info)
    except Exception as e:
        print(f"Error al obtener información de {pokemon_name}: {e}")
        return jsonify({'error': 'Error al obtener la información del Pokémon'}), 500

if __name__ == '__main__':
    app.run(debug=True)
