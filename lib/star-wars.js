// Модуль для работы с API Star Wars. 
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)


// Код ниже разбирать не нужно. 
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.js.

const starWars = {

  // --- Search Methods ---

  searchAll: (query, type) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.py4e.com/api/${type}/?search=${query}`)
        .then(response => response.json())
        .then(characters => resolve(characters))
        .catch(err => console.log('searchAll error: ', err));
    });
  },

  // --- Get By Id Methods ---
  getAllById: (type, id) => {
    return new Promise ((resolve, reject) => {
      fetch(`https://swapi.py4e.com/api/${type}/${id}`)
      .then(response => response.json())
      .then(planets => resolve(planets))
      .catch(err => console.log('getById error: ', err));
    })
  },

  getPlanet: async (homeworld) => (await (
    await fetch(`${homeworld}`)
  ).json()),

}
