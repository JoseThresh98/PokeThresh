# models.py
import requests

class PokeAPIModel:
    @staticmethod
    def get_pokemon_data(pokemon_name):
        url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name.lower()}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None
