// Методы, которые могут пригодиться:
// starWars.searchCharacters(query), 
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)


function getBlock(clasS) {
  let list = document.querySelector(`#${clasS} > select`);
  let input = document.querySelector(`#${clasS} > input`);
  let btn = document.querySelector(`#${clasS} > button`);

  return [list, input, btn]
};

function addClickEvent(block){
  getBlock(block)[2].onclick = () => getInfo(block);
};

async function getInfo(block){
  let [list, input, btn] = getBlock(block);
  if (!input.value) {
    createResult();
    return
  }
  if (block.includes('Query')) {
    createResult((await starWars.searchAll(input.value, list.value)).results[0]);
  } else {
    createResult(await starWars.getAllById(list.value, input.value));
  }
};

function clearResult(block, title, text){
  title.textContent = '';
  text.textContent = '';
  block.style.visibility = 'hidden';
};

async function createResult(data){
  let resultsBlock = document.querySelector('#result-container');
  let resultTitle = resultsBlock.querySelector('.message-header > p');
  let resultText = resultsBlock.querySelector('.message-body');
  let closeBtn = resultsBlock.querySelector('.delete');
  
  if(!data || data.detail === 'Not found') {
    clearResult(resultsBlock, resultTitle, resultText);
    return
  }

  clearResult(resultsBlock, resultTitle, resultText);

  closeBtn.onclick = () => {
    clearResult(resultsBlock, resultTitle, resultText);
    return
  }
  convertResult(data, resultText);
  resultsBlock.style.visibility = 'visible';
  resultTitle.textContent = data.name;
};

async function convertResult(data, resultText) {
  if (data.homeworld) {
  let home = (await starWars.getPlanet(data.homeworld)).name
  data.homeworld = home;
  };
  for (let key in data) {
    if (Array.isArray(data[key])) {
      resultText.textContent += `${key}:\n`;
      data[key].forEach(item => {
        resultText.textContent += `  ${item}\n`;
      });
    } else {
      resultText.textContent += `${key}: ${data[key]}\n`;
    }
  }
};



addClickEvent('byQueryBlock');
addClickEvent('ByIdBlock');
