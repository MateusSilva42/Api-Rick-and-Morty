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

  async function renderCard(){
    const charName = sessionStorage.getItem('Personagem')
    const charDataContainer = document.querySelector('#char-data')
    
    let charData = await getData(0, charName)
    let char = charData.results[0]
    let episode = await getEpisodes(true, char.episode[char.episode.length - 1]);
    // console.log(charData.results[0].name)
    

    //MONTAR CARD
    //row da imagem
    const colImage = document.createElement('div')
    colImage.classList.add('col', 'd-flex', 'justify-content-center', 'pt-4', 'pb-4', 'mb-3', 'bg-green', 'rounded')

    const divImage = document.createElement('div')

    const charImage = document.createElement('img')
    charImage.classList.add('img-fluid', 'rounded', 'h-100')
    charImage.src = char.image

    divImage.appendChild(charImage)
    colImage.appendChild(divImage)
    charDataContainer.appendChild(colImage)

    //row dos dados
     const colData = document.createElement('div')
     colData.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center')

     const divData = document.createElement('div')
     divData.classList.add('card-data', 'w-100')

     const cardTitle = document.createElement('h3')
     cardTitle.setAttribute('id', 'char-name')
     cardTitle.classList.add('fw-bold', 'text-center', 'display-1')
     cardTitle.innerText = char.name

     const divStatus = document.createElement('div')
     divStatus.classList.add('char-status', 'd-flex', 'justify-content-center')

     const currentStatusIcon = document.createElement('div')
     currentStatusIcon.classList.add('status', char.status.toLowerCase())

     const currentStatus = document.createElement('p')
     currentStatus.classList.add('fs-4')
     currentStatus.innerText = `${char.status} - ${char.species}`

     const divOtherData = document.createElement('div')
     divOtherData.classList.add('p-5')

     //Location
     const divLocation = document.createElement('div')
     divLocation.classList.add('mb-4')
     const locationTitle = document.createElement('p')
     locationTitle.classList.add('char-info-title', 'fs-3')
     locationTitle.innerText = ' Última localização conhecida:'
     const locationText = document.createElement('p')
     locationText.classList.add('char-info', 'fs-2')
     locationText.innerText = char.location.name

     divLocation.appendChild(locationTitle)
     divLocation.appendChild(locationText)

     //last Seen
     const divLastSeen = document.createElement('div')
     divLastSeen.classList.add('mb-4')
     const lastSeenTitle = document.createElement('p')
     lastSeenTitle.classList.add('char-info-title', 'fs-3')
     lastSeenTitle.innerText = ' Visto a última vez em:'
     const lastSeenText = document.createElement('p')
     lastSeenText.classList.add('char-info', 'fs-2')
     lastSeenText.innerText = episode.name

     divLastSeen.appendChild(lastSeenTitle)
     divLastSeen.appendChild(lastSeenText)

     //Gender
     const divGender = document.createElement('div')
     divGender.classList.add('mb-4')
     const genderTitle = document.createElement('p')
     genderTitle.classList.add('char-info-title', 'fs-3')
     genderTitle.innerText = ' Gênero'
     const genderText = document.createElement('p')
     genderText.classList.add('char-info', 'fs-2')
     genderText.innerText = char.gender

     divGender.appendChild(genderTitle)
     divGender.appendChild(genderText)

     //Origin
     const divOrigin = document.createElement('div')
     divOrigin.classList.add('mb-4')
     const originTitle = document.createElement('p')
     originTitle.classList.add('char-info-title', 'fs-3')
     originTitle.innerText = ' Origem:'
     const originText = document.createElement('p')
     originText.classList.add('char-info', 'fs-2')
     originText.innerText = char.origin.name

     divOrigin.appendChild(originTitle)
     divOrigin.appendChild(originText)

     //Episode List
     const divEpisodesList = document.createElement('div')
     divEpisodesList.classList.add('mb-4')
     const episodeListTitle = document.createElement('p')
     episodeListTitle.classList.add('char-info-title', 'fs-3')
     episodeListTitle.innerText = ' Lista de Episódios com o personagem:'

     divEpisodesList.appendChild(episodeListTitle)

     for(episode of char.episode){
        const charEpisode = await getEpisodes(true, episode)

        const episodeListText = document.createElement('p')
        episodeListText.classList.add('char-info', 'fs-5','mb-1')
        episodeListText.innerHTML = `<i class="bi bi-caret-right-fill text-success"></i> ${charEpisode.name}`
        divEpisodesList.appendChild(episodeListText)
     }

     //back Button
     const divBtnBack = document.createElement('div')
     divBtnBack.classList.add('mt-3')
     const btnBack = document.createElement('button')
     btnBack.classList.add('btn', 'btn-success', 'fs-2')
     const anchorBack = document.createElement('a')
     anchorBack.classList.add('text-decoration-none', 'text-light')
     anchorBack.href = "./index.html"
     
     const backIcon = document.createElement('i')
     backIcon.classList.add('bi', 'bi-caret-left-square-fill', 'fs-2', 'text-light')
     anchorBack.appendChild(backIcon)
     anchorBack.innerText = 'Voltar'

     btnBack.appendChild(anchorBack)
     divBtnBack.appendChild(btnBack)

     //divs principais
     divOtherData.appendChild(divLocation)
     divOtherData.appendChild(divLastSeen)
     divOtherData.appendChild(divGender)
     divOtherData.appendChild(divOrigin)
     divOtherData.appendChild(divEpisodesList)
     divOtherData.appendChild(divBtnBack)

     divStatus.appendChild(currentStatusIcon)
     divStatus.appendChild(currentStatus)

     divData.appendChild(cardTitle)
     divData.appendChild(divStatus)
     divData.appendChild(divOtherData)

     colData.appendChild(divData)

     charDataContainer.appendChild(colData)
    
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

  renderCard()
  getOverallData()



