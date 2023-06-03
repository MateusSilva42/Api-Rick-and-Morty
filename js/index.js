async function getData(page, name) {
  try {
    const res = await api.get("/character", {
      params: {
        page: page,
        name: name,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getLocations() {
  try {
    const res = await api.get("/location");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getEpisodes() {
  try {
    const res = await api.get("/episode");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function renderCards(page, name = "") {
  const cardsContainer = document.querySelector("#cards-container");
  let counter = 1;
  let currentCharData = await getData(page);

  if (name) {
    currentCharData = await getData(page, name);
  }

  const charData = currentCharData;

  if(charData){
    charData.results.forEach((char) => {
        const article = document.createElement("article");
        article.classList.add("card");
    
        const divImgContainer = document.createElement("div");
        const imgEl = document.createElement("img");
        imgEl.classList.add("card-image");
        imgEl.src = char.image;
    
        const divCardData = document.createElement("div");
        divCardData.classList.add("card-data");
    
        const divCharStatus = document.createElement("div");
        divCharStatus.classList.add("char-status");
    
        const divStatusColor = document.createElement("div");
        divStatusColor.classList.add("status");
        divStatusColor.classList.add(char.status.toLowerCase());
    
        let cardH3 = document.createElement("h3");
        cardH3.innerText = char.name;
    
        let cardP = document.createElement("p");
        cardP.innerText = `${char.status} - ${char.species}`;
    
        divCharStatus.appendChild(divStatusColor);
        divCharStatus.appendChild(cardP);
    
        divCardData.appendChild(cardH3);
        divCardData.appendChild(divCharStatus);
    
        divImgContainer.appendChild(imgEl);
    
        article.appendChild(divImgContainer);
        article.appendChild(divCardData);
    
        cardsContainer.appendChild(article);
    
        if (counter % 2 === 0) {
          const hr = document.createElement("hr");
          hr.classList.add("separator");
          cardsContainer.appendChild(hr);
        }
    
        counter++;
      });
  } else {

    const notFound = document.createElement('article')
    notFound.setAttribute('id', 'not-found')

    const imgNotFound = document.createElement('img')
    imgNotFound.setAttribute('id', 'img-not-found')
    imgNotFound.src = './images/404.png'

    const notFoundH2 = document.createElement('h2')
    notFoundH2.innerText = '404 - Nenhum Personagem Encontrado :('

    notFound.appendChild(imgNotFound)
    notFound.appendChild(notFoundH2)

    cardsContainer.appendChild(notFound)

  }
  
}

async function renderPageButtons(currentPage, name = "") {
  let currentData = await getData();

  if (name) {
    currentData = await getData(1, name);
  }
  const data = currentData;
  const totalPages = data.info.pages;

  const pageNavEl = document.querySelector("#page-nav");

  for (i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.value = i;
    pageButton.innerText = i;
    pageButton.classList.add("page-button");

    if (i == currentPage) {
      pageButton.setAttribute("disabled", "");
    } else {
      pageButton.addEventListener("click", () => {
        renderPage(pageButton.value, name);
        window.scrollTo(0, 0);
      });
    }

    pageNavEl.appendChild(pageButton);
  }
}

function removerCards() {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.innerHTML = "";
}

function removerButtons() {
  const buttonsContainer = document.querySelector("#page-nav");

  buttonsContainer.innerHTML = "";
}

function renderPage(page, name = "") {
  removerCards();
  removerButtons();

  renderCards(page, name);
  renderPageButtons(page, name);
}

async function getOverallData() {
  const totalChar = await getData();
  const totalLocations = await getLocations();
  const totalEpisodes = await getEpisodes();

  const qtdCharEl = document.querySelector("#qtd-char");
  const qtdLocationsEl = document.querySelector("#qtd-locations");
  const qtdEpisodesEl = document.querySelector("#qtd-episodes");

  qtdCharEl.innerText = totalChar.info.count;
  qtdLocationsEl.innerText = totalLocations.info.count;
  qtdEpisodesEl.innerText = totalEpisodes.info.count;
}

async function buttonFunction() {
  const pageButtons = document.querySelectorAll(".page-button");
}

function search() {
  const searchForm = document.querySelector("#search-form");
  const searchBar = document.querySelector("#search");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = searchBar.value;
    renderPage(1, name);
  });
}

renderCards(1);
renderPageButtons(1);
getOverallData();
buttonFunction();
search();
