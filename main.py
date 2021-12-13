#main.py
# Import the Flask module that has been installed.
from flask import Flask, json
from flask import send_file
from flask_cors import CORS
import random

# Creating a new "app" by using the Flask constructor. Passes __name__ as a parameter.
app = Flask(__name__)
CORS(app)

file = open('./pokemons.json') 
#caricare la variabile che contiene i dati del json dentro data tramite il metodo load
data = json.load(file) 

# Annotation that allows the function to be hit at the specific URL.
@app.route("/")
# Generic Python function that returns "Hello world!"
def index():
    return "Hello World!"

@app.route("/all")
def all():
    return send_file('pokemons.json')

@app.route("/charmander")
@app.route("/bulbasaur")
@app.route("/snorlax")
@app.route("/pikachu")
def pokemonRnd():
    return random.choice(data['pokemons'])

# Checks to see if the name of the package is the run as the main package.
if __name__ == "__main__":
    # Runs the Flask application only if the main.py file is being run.
    app.run(host="localhost", port=5000)