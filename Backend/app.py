from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todos los endpoints


# Ruta para obtener la información del Pokémon
@app.route('/pokemon/<string:pokemon_name>', methods=['GET'])
def get_pokemon(pokemon_name):
    # Hacer la solicitud a la API de PokeAPI para obtener solo la información esencial
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name.lower()}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        # Filtramos solo la información esencial que necesitamos
        filtered_data = {
            'name': data['name'],
            'sprites': data['sprites']['front_default'],
            'shiny_sprites': data['sprites']['front_shiny'],
            'types': [t['type']['name'] for t in data['types']],
            'abilities': [a['ability']['name'] for a in data['abilities']],
            'height': data['height'],
            'weight': data['weight'],
            'stats': {stat['stat']['name']: stat['base_stat'] for stat in data['stats']},
        }

        # Evitar incluir sprites de género si no están disponibles
        if 'front_female' in data['sprites']:
            filtered_data['female_sprites'] = data['sprites']['front_female']
        else:
            filtered_data['female_sprites'] = None

        if 'front_male' in data['sprites']:
            filtered_data['male_sprites'] = data['sprites']['front_male']
        else:
            filtered_data['male_sprites'] = None

        # Obtener la información de evoluciones
        species_url = data['species']['url']
        species_response = requests.get(species_url)
        if species_response.status_code == 200:
            species_data = species_response.json()
            evolution_chain_url = species_data['evolution_chain']['url']
            evolution_response = requests.get(evolution_chain_url)
            if evolution_response.status_code == 200:
                evolution_data = evolution_response.json()
                evolutions = []

                # Recorrer la cadena de evolución
                current_evolution = evolution_data['chain']
                while current_evolution:
                    evolutions.append(current_evolution['species']['name'])
                    current_evolution = current_evolution.get('evolves_to', [None])[0]

                filtered_data['evolutions'] = evolutions
            else:
                filtered_data['evolutions'] = None
        else:
            filtered_data['evolutions'] = None

        print(filtered_data)  # Depuración: muestra la información filtrada
        return jsonify(filtered_data)
    else:
        return jsonify({"error": "Pokemon not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
