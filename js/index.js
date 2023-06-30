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

async function getEpisodes(char = false, episode) {
  if (char) {
    try {
      const res = await axios.get(episode);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const res = await api.get("/episode");
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function renderCards(page, name = "") {
  const cardsRow = document.querySelector("#cards-row");
  let currentCharData = await getData(page);

  if (name) {
    currentCharData = await getData(page, name);
  }

  const charData = currentCharData;
  let counter = 1

  if (charData) {
    charData.results.forEach(async (char) => {
      // console.log(char.location.name) -- traz ultima localização do personagem
      const episode = await getEpisodes(true, char.episode[char.episode.length - 1]);

      // DIVS pais
      const article = document.createElement("article");

      article.classList.add(
        "col-6",
        "col-xl-5",
        "h-50",
        "col-lg-5",
        "d-flex",
        "justify-content-center",
        "char-card",
        "text-light"
      );

      const divContainer = document.createElement("div");
      divContainer.classList.add(
        "container",
        "d-flex",
        "justify-content-lg-start",
        "justify-content-center",
        // "bg-dark",
        "rounded",
        "m-0",
        "p-0",
        "fit-content",
        "card-show"
      );

      const divRowIntern = document.createElement("div");
      divRowIntern.classList.add("row", "d-flex", "flex-column", "flex-lg-row");

      // DIV da imagem do personagem
      const divColImg = document.createElement("div");
      divColImg.classList.add(
        "col-12",
        "col-lg-5",
        "d-flex",
        "align-items-center"
      );

      const divImage = document.createElement("div");
      divImage.classList.add("fit-content", "m-1");

      const charImage = document.createElement("img");
      charImage.classList.add("img-fluid", "rounded", "h-100");
      charImage.src = char.image;

      // DIV dos dados dos personagens
      const divColData = document.createElement("div");
      divColData.classList.add(
        "col",
        "d-flex",
        "align-items-center",
        "pt-3",
        "pb-3"
      );

      const divCardData = document.createElement("div");
      divCardData.classList.add("card-data");

      const anchorChar = document.createElement('a')
      anchorChar.setAttribute('href', './character.html')
      anchorChar.classList.add('char-link')
      anchorChar.addEventListener('click', (e)=>{
        sessionStorage.setItem('Personagem', char.name)
      })
      anchorChar.addEventListener('mouseover', (e)=>{
        charImage.classList.add('img-shake')
        setTimeout(()=>{
          charImage.classList.remove('img-shake')
        }, 500)
      })

      const cardTitle = document.createElement("h3");
      cardTitle.classList.add("fw-bold");
      cardTitle.innerText = char.name;

      // CHAR STATUS
      const divCharStatus = document.createElement("div");
      divCharStatus.classList.add("char-status");

      const divCharActualStatus = document.createElement("div");
      divCharActualStatus.classList.add("status", char.status.toLowerCase());

      const divCharStatusText = document.createElement("p");
      divCharStatusText.innerText = `${char.status} - ${char.species}`;

      const divLastLocation = document.createElement("div");

      const pLastLocationTitle = document.createElement("p");
      pLastLocationTitle.classList.add("char-info-title");
      pLastLocationTitle.innerText = "Última localização conhecida";

      const pLastLocationText = document.createElement("p");
      pLastLocationText.classList.add("char-info");
      pLastLocationText.innerText = char.location.name;

      const DivLastSeen = document.createElement("div");

      const pLastSeenTitle = document.createElement("p");
      pLastSeenTitle.classList.add("char-info-title");
      pLastSeenTitle.innerText = "Visto a última vez em:";

      const pLastSeenText = document.createElement("p");
      pLastSeenText.classList.add("char-info");
      pLastSeenText.innerText = episode.name;

      //Montagem da estrutura
      //IMAGE
      divImage.appendChild(charImage);
      divColImg.appendChild(divImage);
      divRowIntern.appendChild(divColImg);

      //CHAR DATA
      divCharStatus.appendChild(divCharActualStatus);
      divCharStatus.appendChild(divCharStatusText);

      divLastLocation.appendChild(pLastLocationTitle);
      divLastLocation.appendChild(pLastLocationText);

      DivLastSeen.appendChild(pLastSeenTitle);
      DivLastSeen.appendChild(pLastSeenText);

      anchorChar.appendChild(cardTitle)
      divCardData.appendChild(anchorChar);
      divCardData.appendChild(divCharStatus);
      divCardData.appendChild(divLastLocation);
      divCardData.appendChild(DivLastSeen);

      divColData.appendChild(divCardData);
      divRowIntern.appendChild(divColData);

      divContainer.appendChild(divRowIntern);

      article.appendChild(divContainer);

      cardsRow.appendChild(article);
    });
  } else {
    const notFound = document.createElement("article");
    notFound.setAttribute("id", "not-found");

    const imgNotFound = document.createElement("img");
    imgNotFound.setAttribute("id", "img-not-found");
    imgNotFound.src = "./images/404.png";

    const notFoundH2 = document.createElement("h2");
    notFoundH2.innerText = "404 - Nenhum Personagem Encontrado :(";

    notFound.appendChild(imgNotFound);
    notFound.appendChild(notFoundH2);

    cardsRow.appendChild(notFound);
  }
}

//CRIA A ESTRUTURA DE CADA BOTÃO DE PÁGINA
function createpageBtn(currentPage, modifier, name, totalPages, disabled = false) {
  const ulPagination = document.querySelector("#ul-pagination");
  const typeMod = typeof modifier;

  const liEl = document.createElement("li");
  liEl.classList.add("page-item");

  const aEl = document.createElement("a");

  let pageButton = currentPage + modifier

  aEl.classList.add("page-link");

  typeMod == "string"
    ? (aEl.innerText = modifier)
    : (aEl.innerText = currentPage + modifier);

  if(pageButton <= 0) return

  if (disabled) {
    aEl.classList.add("btn-disabled");
    liEl.appendChild(aEl);
    ulPagination.appendChild(liEl);
    return;

  }
  aEl.setAttribute("href", "#");
  aEl.addEventListener("click", (e) => {
    e.preventDefault();

  

    if (modifier === "Anterior") {
      renderPage(currentPage - 1, name);
    } else if (modifier === "Próximo") {
      renderPage(currentPage + 1, name);
      console.log(currentPage +1)
    } else {
      renderPage(pageButton, name);
    }

    window.scrollTo(0, 0, "smooth");
  });

  liEl.appendChild(aEl);
  ulPagination.appendChild(liEl);

  return;
}

async function renderPageButtons(currentPage, name = "") {
  let currentData = await getData();
  let btnPreviousDisabled = false
  let btnNextDisabled = false

  if (name) {
    currentData = await getData(1, name);
  }

  const data = currentData;
  const totalPages = data.info.pages;
  let previousPage;
  let nextPage;

  currentPage === 1 ? (previousPage = 1) : (previousPage = currentPage - 1);
  nextPage === totalPages
    ? (nextPage = totalPages)
    : (nextPage = currentPage + 1);

 

  // TRAVAR RENDER SE NÃO TIVER MAIS PÁGINAS
  // if(currentPage >= (totalPages - 4)) return


  if(currentPage === 1) btnPreviousDisabled = true
    
  // if(currentPage === totalPages) btnNextDisabled = true

  createpageBtn(currentPage, "Anterior", name, totalPages, btnPreviousDisabled);
  createpageBtn(currentPage, -2, name, totalPages);
  createpageBtn(currentPage, -1, name, totalPages);
  createpageBtn(currentPage, 0, name, totalPages);
  createpageBtn(currentPage, 1, name, totalPages);
  createpageBtn(currentPage, 2, name, totalPages);
  createpageBtn(currentPage, "Próximo",name, totalPages, btnNextDisabled);

  // ------------------ANTIGO ---------------------------------------
  // const pageButton = document.createElement("button");
  // pageButton.value = i;
  // pageButton.innerText = i;
  // pageButton.classList.add("page-button");

  // if (i == currentPage) {
  //   pageButton.setAttribute("disabled", "");
  // } else {
  //   pageButton.addEventListener("click", () => {
  //     renderPage(pageButton.value, name);
  //     window.scrollTo(0, 0);
  //   });
  // }

  // pageNavEl.appendChild(pageButton);
}

function removerCards() {
  const cardsContainer = document.querySelector("#cards-row");

  cardsContainer.innerHTML = "";
}

function removerButtons() {
  const buttonsContainer = document.querySelector("#ul-pagination");

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
