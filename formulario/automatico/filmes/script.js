const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDE4Y2VmMjk0YTQwNzdhN2M0YWI1YTA2YTE1MzgyNiIsIm5iZiI6MTcyNDg5MDYyNi45ODAzMzEsInN1YiI6IjY1NjljYmM1NzFmMDk1MDBhYTBlYjUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dB_gJDUQofmvJ7Kph-YvBAcSKydSOXArS09R4m9FWHU';
const keywordId = 210024; // ID para a palavra-chave "anime"
const codeG = document.getElementById('codeG');
const closeModalButton = document.getElementById('closeModal'); // Botão para fechar o modal
const searchBar = document.getElementById('searchBar'); // Barra de pesquisa
const animeList = document.getElementById('animeList'); // Lista de animes
const paginationContainer = document.getElementById('pagination-controls'); // Contêiner de paginação
const pageInfo = document.getElementById('page-info'); // Contêiner para informações da página

const resultsPerPage = 20; // Número de resultados por página
let currentPage = 1;
let totalPages = 1;
let totalResults = 0; // Para manter a contagem total de animes
let totalAnimes = 0; // Variável para armazenar a contagem total de animes

// Função para atualizar a contagem total de animes
function updateTotalCount() {
    const totalCountElement = document.getElementById('total-count');
    totalCountElement.innerText = `Total de Animes: ${totalAnimes}`;
}

// Atualize a função fetchAnimes para definir totalAnimes
async function fetchAnimes(page = 1, query = '') {
  const baseURL = 'https://api.themoviedb.org/3';
  const url = query
      ? `${baseURL}/search/movie?api_key=${apiToken}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`
      : `${baseURL}/discover/movie?api_key=${apiToken}&with_keywords=${keywordId}&page=${page}&language=pt-BR`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        totalAnimes = data.total_results; // Atualiza a contagem total de animes
        totalPages = Math.ceil(totalAnimes / resultsPerPage); // Atualiza o número total de páginas

        displayAnimes(data.results);
        updatePaginationControls();
        updateSimplePaginationControls(); // Atualiza os controles de paginação
        updatePageInfo(); // Atualiza as informações da página
        updateTotalCount(); // Atualiza a contagem total de animes
    } catch (error) {
        console.error('Failed to fetch animes:', error);
    }
}



// LISTA DE ANIMES NA PÁGINA
async function displayAnimes(animes) {
  animeList.innerHTML = '';

  for (const [index, anime] of animes.entries()) {
      // Verifica a estrutura do objeto anime
      console.log(anime);

      const response = await fetch(`https://api.themoviedb.org/3/movie/${anime.id}?language=pt-BR`, {
          headers: {
              Authorization: `Bearer ${apiToken}`,
              'Content-Type': 'application/json',
          },
      });

      const animeDetails = await response.json();

      // Verifica se o campo do nome está correto
      const title = animeDetails.title || 'Indefinido'; // Ajuste o campo se necessário

      const runtime = animeDetails.runtime || 0; // Duração do filme em minutos
      const formattedRuntime = runtime > 0 ? `${runtime} min` : 'N/A'; // Formata a duração

      const releaseDate = animeDetails.release_date || 'N/A'; // Data de lançamento
      const formattedReleaseDate = releaseDate ? new Date(releaseDate).toLocaleDateString('pt-BR') : 'N/A'; // Formata a data

      const animeItem = document.createElement('div');
      animeItem.classList.add('animeItem');
      animeItem.setAttribute('data-id', anime.id); // Adiciona o atributo data-id
      animeItem.innerHTML = `
          <span class="anime-number">${(currentPage - 1) * resultsPerPage + index + 1}</span>
          <img src="https://image.tmdb.org/t/p/w500${anime.poster_path}" alt="${title}">
          <h3 class="titulo">${title}</h3>
          <h8>Data de Lançamento: ${formattedReleaseDate}</h8> <!-- Adiciona a data de lançamento -->
          <h8>Duração: ${formattedRuntime}</h8>
      `;

      animeItem.addEventListener('click', () => {
          const allAnimeItems = document.querySelectorAll('.animeItem');
          allAnimeItems.forEach(item => item.classList.remove('active'));
          animeItem.classList.add('active');
          openModal(anime.id);
      });

      animeList.appendChild(animeItem);
  }
}


// ATUALIZAR CONTROLES SIMPLES DE PAGINAÇÃO
function updateSimplePaginationControls() {
  const simplePaginationContainer = document.getElementById("pagination-simple-controls");
  simplePaginationContainer.innerHTML = ""; // Limpa os controles existentes

  // Não exibe se houver apenas uma página
  if (totalPages <= 1) return;

  // Botão Anterior
  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "simplePrev";
  prevButton.onclick = () => changePage(currentPage - 1);
  if (currentPage === 1) {
    prevButton.disabled = false; // Desabilita o botão se estiver na primeira página
  }
  simplePaginationContainer.appendChild(prevButton);

  // Botão Próximo
  const nextButton = document.createElement("button");
  nextButton.innerText = "Próximo";
  nextButton.className = "simpleNext";
  nextButton.onclick = () => changePage(currentPage + 1);
  if (currentPage === totalPages) {
    nextButton.disabled = true; // Desabilita o botão se estiver na última página
  }
  simplePaginationContainer.appendChild(nextButton);
}

// ATUALIZAR CONTROLES COMPLETOS DE PAGINAÇÃO
function updatePaginationControls() {
  paginationContainer.innerHTML = ""; // Limpa os controles existentes

  if (totalPages <= 1) return;

  // Botão Anterior
  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "bPreview";
  prevButton.onclick = () => changePage(currentPage - 1);
  paginationContainer.appendChild(prevButton);

  // Exibir no máximo 10 botões de página
  const maxVisibleButtons = 10;
  const sideButtons = 20; // Botões exibidos ao lado do atual

  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      createPageButton(i);
    }
  } else {
    createPageButton(1);

    let startPage = Math.max(2, currentPage - sideButtons);
    let endPage = Math.min(totalPages - 1, currentPage + sideButtons);

    if (startPage > 2) {
      const dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }

    for (let i = startPage; i <= endPage; i++) {
      createPageButton(i);
    }

    if (endPage < totalPages - 1) {
      const dots = document.createElement("span");
      dots.innerText = "...";
      paginationContainer.appendChild(dots);
    }

    createPageButton(totalPages - 1);
    createPageButton(totalPages);
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = "Próximo";
  nextButton.className = "bPreview";
  nextButton.onclick = () => changePage(currentPage + 1);
  paginationContainer.appendChild(nextButton);
}

// Função auxiliar para criar botões de página
function createPageButton(pageNumber) {
  const pageButton = document.createElement("button");
  pageButton.innerText = pageNumber;
  if (pageNumber === currentPage) {
    pageButton.disabled = true;
  }
  pageButton.onclick = () => changePage(pageNumber);
  paginationContainer.appendChild(pageButton);
}

// MUDAR DE PÁGINA
function changePage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  fetchAnimes(currentPage, searchBar.value); // Chama a função com a página atual
}

// Atualiza as informações da página e os controles de paginação
function updatePageInfo() {
  pageInfo.innerText = `Página ${currentPage}`;
}










async function fetchEpisodes(animeId, seasonNumber, animeTitle) {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${animeId}/season/${seasonNumber}?language=pt-BR`, {
      headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json();

  // LInk dos eps
  function formatDate(date) {
    const year = date.getFullYear().toString().slice(-0); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    return `/${year}/${month}/`;
  }
  function formatAnimeTitle(animeTitle) {
    return animeTitle
        .toLowerCase()              
        .replace(/\s+/g, '-')      
        .replace(/[^\w\-]+/g, '');   
  }
  const animeTitleCustomLInk = formatAnimeTitle(animeTitle);
  // Sub texto formatado link
  const animeDubbedOrSubbed = document.getElementById('animeDubbedOrSubbed').value;
  function formatAnimeDubbedOrSubbed(animeDubbedOrSubbed) {
    return animeDubbedOrSubbed
        .toLowerCase()             
        .replace(/\s+/g, '-')        
        .replace(/[^\w\-]+/g, '');  
}
const animeDubbedOrSubbedFormatted = formatAnimeDubbedOrSubbed(animeDubbedOrSubbed);

const animeEpisodes = document.getElementById('animeEpisodes').value;

  // Obter o total de episódios de temporadas anteriores
  let totalEpisodesBeforeSeason = 0;
  for (let i = 1; i < seasonNumber; i++) {
    const prevSeasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${animeId}/season/${i}?language=pt-BR`, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        },
    });
    const prevSeasonData = await prevSeasonResponse.json();
    totalEpisodesBeforeSeason += prevSeasonData.episodes.length;
  }

  const episodesHTML = data.episodes.map((episode, index, array) => {
      const seasonLabel = seasonNumber === '00' ? 'Especiais' : `t${seasonNumber}`;

      // Determina a classe com base no índice do episódio
      const additionalClass = index === 0 ? 'Pep' : (index === array.length - 1 ? 'Uep' : '');

      // Verifica se o still_path é inválido
      const isInvalidImagePath = !episode.still_path || episode.still_path.includes('null');
      const imageSrc = isInvalidImagePath ? '' : `https://image.tmdb.org/t/p/w500${episode.still_path}`;

      return `
<!----- ${seasonLabel} - Episodio ${episode.episode_number}/${animeEpisodes}----------------------------------->
<main class="episodio items ${additionalClass}">
  <div class="vieweP" onclick="playSoundFour()" data-id="${totalEpisodesBeforeSeason + index + 1}">
      <a href="${episode.air_date ? formatDate(new Date(episode.air_date)) : '/aa/mm/'}${animeTitleCustomLInk}-${seasonLabel}-episodio${episode.episode_number}-${animeDubbedOrSubbedFormatted}.html" target="_blank" class="linkep">
        <img class="imgC" src="${imageSrc}"/>
        <h7>${episode.runtime || '24'} min</h7>
        <div class="epNumbers">
          <h8 class="epNN">${episode.episode_number}</h8>
        </div>
      </a>
      <h8 class="tituloN" data-numberT="${episode.episode_number}" data-name="${episode.name}"></h8>
      <h8 class="sinopseN" data-sinopse="${episode.overview}"></h8>
      <button class="noLInk"></button>
      <div class="item">
        <button class="view"></button>
        <span class="seasonN"></span>
        <span></span>
        <h8>${episode.air_date ? new Date(episode.air_date).toLocaleDateString('pt-BR') : 'dd/mm/aa'}</h8>
      </div>
  </div>
 </main> 
 `;
  }).join('');

  return episodesHTML;
}



// exibir Especiais
function clickActiveAnimeItem() {
  const activeAnimeItem = document.querySelector('.animeItem.active');
  if (activeAnimeItem) {
      activeAnimeItem.click();
  }
}

function isScreenWidthAboveThreshold() {
  return window.innerWidth > 1400;
}

document.getElementById('sim').addEventListener('change', (event) => {
  if (event.target.checked && isScreenWidthAboveThreshold()) {
      clickActiveAnimeItem(); 
  }
});

document.getElementById('nao').addEventListener('change', (event) => {
  if (event.target.checked && isScreenWidthAboveThreshold()) {
      clickActiveAnimeItem(); 
  }
});

let mostrarEspeciais = false;
function updateMostrarEspeciais() {
  mostrarEspeciais = document.getElementById("sim").checked;
}
document.querySelectorAll('input[name="especiais"]').forEach((input) => {
  input.addEventListener("change", updateMostrarEspeciais);
});

// Função para atualizar o conteúdo baseado nos inputs
async function updateSeasonContent(animeId, regularSeasons) {
  const animeCover = document.getElementById('animeCover').value;
  const animeTitle = document.getElementById('animeTitle').value;
  const seasonsNumber = document.getElementById('seasons').value;
  const animeReleaseYear = document.getElementById('animeReleaseYear').value;
  const animeOverview = document.getElementById('animeOverview').value;
  const animeAverageRuntime = document.getElementById('animeAverageRuntime').value;
  const animeRating = document.getElementById('animeRating').value;
  const site = document.getElementById('site').value;
  const animeStatus = document.getElementById('animeStatus').value;
  const animeReleaseDate = document.getElementById('animeReleaseDate').value;
  const animeStudio = document.getElementById('animeStudio').value;
  const animeDubbedOrSubbed = document.getElementById('animeDubbedOrSubbed').value;
  const animeStation = document.getElementById('animeStation').value;
  const animeAdm = document.getElementById('animeAdm').value;
  const animeTitleJapanese = document.getElementById('animeTitleJapanese').value;
  const linkconvert = document.getElementById('linkconvert').value;
  const idUnico = document.getElementById('idUnico').value;
  const linkcapa01 = document.getElementById('linkcapa01').value;
  const linkcapa02 = document.getElementById('linkcapa02').value;
  const linkcapa03 = document.getElementById('linkcapa03').value;
  const linkcapa04 = document.getElementById('linkcapa04').value;
  const linkcapa05 = document.getElementById('linkcapa05').value;
  const imagescontainer = [linkcapa01, linkcapa02, linkcapa03, linkcapa04, linkcapa05].filter((url) => url);
  const imagesContainerHTML = imagescontainer.map((url) => `<img src="${url}" alt="Capa" />`).join('');
  // Generos list
  const animeGenres = document.getElementById('animeGenres').value;
  const animeGenresArray = animeGenres.split(',').map((genre) => genre.trim());
  const genresHTML = animeGenresArray.map((genre) => `<h8>${genre}</h8>`).join('');
  const animeEpisodes = document.getElementById('animeEpisodes').value;
     // Generos Marcadores
     const animeGenresMarcadores = animeGenres.split(',').map((genre) => genre.trim());
     const genresMarcadores = animeGenresMarcadores.map((genre) => `${genre}, `).join('');
   
  // Processa as temporadas
  const seasons = regularSeasons.map(season => ({
      number: season.season_number.toString().padStart(2, '0'),
      coverLink: season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : ''
  }));
  // capturar todas as capas
  const animeCapasTotais = document.getElementById("animeCapasTotais");
  const capasHTML = regularSeasons
  .filter(season => mostrarEspeciais || season.season_number !== 0) // Exibe especiais se mostrarEspeciais for true
  .map((season) => {
    const seasonLabel = season.season_number === 0 ? 'Temporada de especiais' : `Temporada ${String(season.season_number).padStart(2, "0")}`;
    return `${seasonLabel}:\n${
      season.poster_path
        ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
        : "Sem capa disponível"
    }\n`;
  }).join("");
  animeCapasTotais.value = capasHTML;


  // exibir sesons especiais
  const specialsSeason = seasons.find((season) => season.number === "00");
  const sortedSeasons = mostrarEspeciais
    ? [
        ...seasons.filter((season) => season.number !== "00"),
        specialsSeason,
      ].filter(Boolean)
    : seasons.filter((season) => season.number !== "00");

  // CODE BUTTONS SEASONS
// CODE BUTTONS SEASONS
const otherSeasonsHTML = sortedSeasons
  .map((season, index) => {
    const clickedClass = index === 0 ? 'clicked' : ''; 
    const seasonClass = season.number === '00' ? 'sesp' : '';// Adiciona a classe ao primeiro span
    return `
            <span class="${clickedClass}${seasonClass}" data-capa="${season.coverLink}" data-season="${season.number}" onclick="playSoundFour(), altcapa(event)">${season.number === "00" ? "Especiais" : season.number}</span>`;
  })
  .join("");




  // Formatados do code

  // formated data 01
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Obtém o dia e formata para dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtém o mês e formata para dois dígitos
    const year = date.getFullYear(); // Obtém o ano
    return `${day}/${month}/${year}`; 
  }
  const FormatedanimeDate = formatDate(animeReleaseDate);

// formated data 02
  function formatReleaseDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear(); // Obtém o ano
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês (0-11)
    return `/${year}/${month}/`; // Formata a string
  }
  const FormatedanimeReleaseDate = formatReleaseDate(animeReleaseDate);

// formated data 03
function FormatedAnimeDateName(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Obtém o dia e formata para dois dígitos
  const monthIndex = date.getMonth(); // Obtém o índice do mês
  const year = date.getFullYear(); // Obtém o ano

  // Array com os meses abreviados
  const months = [
    'jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.',
    'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
  ];

  // Formata a string no formato "dd de mmm. de aaaa"
  return `${day} de ${months[monthIndex]} de ${year}`;
}





  function formatTitleC(title) {
    return title ? title.replace(/\s+/g, '') : '';
  }

  const FormatedDateName = FormatedAnimeDateName(animeReleaseDate);
  function formatTitleC(title) {
    return title ? title.replace(/\s+/g, '') : '';
  }
  function formatAnimeTitle(animeTitle) {
    // Mapeia caracteres acentuados para suas versões sem acento
    const accentsMap = {
      'á': 'a', 'ã': 'a', 'â': 'a', 'à': 'a', 'ä': 'a',
      'é': 'e', 'ê': 'e', 'ë': 'e',
      'í': 'i', 'î': 'i', 'ï': 'i',
      'ó': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
      'ú': 'u', 'û': 'u', 'ü': 'u',
      'ç': 'c'
    };
  
    // Remove os acentos do texto
    const normalizedTitle = animeTitle.replace(/[áãâàäéêëíîïóõôöúûüç]/g, (match) => accentsMap[match]);
  
    return normalizedTitle
        .toLowerCase()
        .replace(/\s+/g, '-')             // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '')         // Remove caracteres não alfanuméricos e hífens
        .replace(/-+$/, '');               // Remove hífens no final da string
  }
  const animeTitleCustomLInk = formatAnimeTitle(animeTitle);

  const animeDubbedOrSubbedDisplay = animeDubbedOrSubbed === 'Dublado' 
  ? `-${formatAnimeTitle(animeDubbedOrSubbed)}` 
  : '';

  const linkPage = FormatedanimeReleaseDate + animeTitleCustomLInk + animeDubbedOrSubbedDisplay;
  document.getElementById('linkPage').value = linkPage; 

  const i = '\\';

// CODE SEASONS LIST
const seasonsHTML = [];
for (const season of sortedSeasons) {
  const seasonLabel =
    season.number === "00" ? "ESPECIAIS" : `TEMPORADA ${season.number} `;
  const episodesHTML = await fetchEpisodes(animeId, season.number, animeTitle);
  seasonsHTML.push(`

<!--/////////////////////////////////////////////////////////////////////////-->
<!--////////////  ${seasonLabel}  ////////////////////////////-->
<div class="listeps" id="season-${season.number}">
${episodesHTML}
</div>
<!--/////////////////////////////////////////////////////////////////////////-->`);
}
let escapedSeasonsHTML = seasonsHTML.join("");


  // Atualiza o conteúdo do <pre>
  seasonContent.textContent = `
  <!--------- ${animeTitle} // ${seasonsNumber} Seasons ----------------------->

<div class="trailerA" onclick="playSoundSec()">
  <div class="youtubeContainer" data-link-embed="${linkconvert}"></div>
  <iframe id="trailerVideo" src=""></iframe>
</div>
<section class="pageanime">
  <div class="wid01" id="image-container" style="background-image: url('${linkcapa01}');">
    <div class="moreinf">
      <div class="capa" onclick="playSoundSec()">
        <img class="imagem-capa" src="${animeCover}" alt="Imagem" />
      </div>
    </div>
    <div data-id="${formatTitleC(animeTitle)}${idUnico}${animeReleaseYear}" class="container infos"> <!-- Cada anime deve possuir um ID unico -->
      <span class="descrition" id="description">${animeOverview}
      </span>
        <!-- more -->
      <div class="subtitle">
        <h8 class="namealt">${animeTitleJapanese}</h8>
        <span>${animeDubbedOrSubbed}</span>
        <span>${animeAverageRuntime}</span>
      </div>
      <div class="titulos">
        <span id="titleanime">${animeTitle}</span>
        <div class="lowinfos">
          <span class="nota">${animeRating}</span>
          <h8>${site}</h8>
        </div>
      </div>
      <div class="detals">
        <h8 id="status">${animeStatus}</h8> 
        <!-- use 'Lançamento' se estiver lançando semanalmente -->
        <!-- use 'Em Pausa' se estiver aguardando próxima temporada -->
        <!-- use 'Completo' se já estiver finalizado -->
        <main>
          <span><h8 class="total-count"></h8></span>
          <span><h8 id="seasonN"></h8></span>
          <span class="cate"><h8>${FormatedanimeDate}</h8></span>
          <span class="cate"><h8>${animeStudio}</h8></span>
          <span><h8>${animeStation}</h8></span>
          <span class="adm"><h8>${animeAdm}</h8></span>
        </main>
      </div>
      <div class="geners">
        ${genresHTML}
        <a href="/search?q=${animeTitle}" target="_blank" data-anime="Ver mais de '${animeTitle}'"></a>
      </div>
      <script>
        const imagescontainer = [
          ${imagescontainer.map((url) => `"${url}"`).join(',\n  ')}
        ];
      </script>
      <div class="buttons">
        <div class="bA">
          <a href="" class="Play" target="_blank" onclick="playSoundSec()"><h8 id="nextviewep">Assistir Temporada 01 - Episódio 01</h8></a>
          <a class="trailer" onclick="playSoundSec()">Trailer</a>
        </div>
        <div class="barra">
          <div class="dadosepsp">
            <button id="secep" onclick="playSoundSec()"></button>
            <div>
              <span class="porceps">
                <h3>Completo 0%</h3>
                <span class="epsvistos">
                  <h8 class="marked-count">0</h8>
                  <h8 class="total-count">0</h8>
                </span>
              </span>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
          <div class="textB">
            <button></button>
            <span>
              <h2 class="historicoview">Último episódio assistido</h2>
              <h8 id="lastepview"></h8>
            </span>
          </div>
          <div class="todasimgs">
            <button></button>
            <span>
              <h2 class="historicoview">Galeria de imagens</h2>
              <h8>Imagens usadas na página</h8>
            </span>
            <span class="listimagens"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="pageanimeep temporadas">
    <div class="dadospesquisa">
      <div class="listtemporadas">
        <button id="scrollLeft"></button>
          <div>${otherSeasonsHTML}
          </div>
        <button id="scrollRight"></button>
      </div>
      <div class="filtrospesq">
         <button id="Olep" onclick="playSoundFour()"></button>
         <button id="Nvep" onclick="playSoundFour()"></button>
         <input type="number" class="search-bar" placeholder="Numero do episódio..."/>
      </div>
    </div>${escapedSeasonsHTML}
</section>  
<script>document.write('<script src="' + linkBase + 'PaginaAnime/linkspageanime.js"><${i}/script>');</script>
     
<!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/// Nome: 
${animeTitle}

/// Marcadores( USE NO MAXIMO 30 MARCADORES):
${seasonsNumber} Temporadas, ${animeEpisodes} Episodios, Lista, Nota ${animeRating}, Anime ${animeDubbedOrSubbed}, Animes, ${animeStation}, ${animeStation} ${animeReleaseYear}, ${animeReleaseYear}, ${animeStatus}, ${genresMarcadores}

    - Dias da semana (use um se o anime estiver em lançamento):
      Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sabado

    - Opcional Banner:
      Banner

    - Opcional Destaque: 
      Destaque01, Destaque02, Destaque03

    - Opcionais categorias:
      OVA, Shonen, Shojo, Manhwa, Yaoi, Yuri, Mecha, Ecchi, Harem, Isekai, Idol, Hentai


/// Data do Anime:
${FormatedDateName}

/// Link personalizado da page:
${animeTitleCustomLInk}${animeDubbedOrSubbedDisplay}

(seu link deve seguir essa estrutura)
https://seu-site.blogspot.com${linkPage}.html




/// Descrição de pesquisa (Use um desses):
01 - Acompanhe o anime ${animeTitle} repleto de desafios, descobertas e reviravoltas que prendem a atenção do início ao fim.

02 - Siga ${animeTitle}, uma história envolvente, cheia de emoções e personagens marcantes, em um mundo de descobertas e desafios.

03 - Mergulhe em ${animeTitle}, um trama cativante, repleto de mistérios, ação e relações inesperadas que irão surpreender a cada episódio.

04 - Vivencie uma jornada única em ${animeTitle} onde personagens enfrentam obstáculos, revelações e grandes transformações ao longo da trama.

05 - Explore ${animeTitle}, um mundo repleto de ação, mistério e aventura enquanto heróis enfrentam desafios incríveis.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
  `;
}



// Ciar id unico
function generateUniqueCode() {
  const randomPart = Math.random().toString(36).substr(2, 4); 
const timePart = Date.now().toString(36).substr(-6); 
const codeID = randomPart + timePart; 
console.log(codeID);
  return randomPart + timePart;
}


// ABRIR MODAL
async function openModal(animeId) {
  // Seleciona o elemento .section01
  const section01 = document.querySelector('.section01');
  section01.style.display = 'flex';
  const response = await fetch(`https://api.themoviedb.org/3/tv/${animeId}?language=pt-BR`, {
      headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json();

   // Gera id unico
   const uniqueCode = generateUniqueCode();
   const idUnicoInput = document.getElementById('idUnico');
   if (idUnicoInput) {
     idUnicoInput.value = uniqueCode;
   }


   
  // Preencher os inputs
  let coverLink = '';
  for (let i = data.seasons.length - 1; i >= 0; i--) {
    if (data.seasons[i].poster_path) {
      coverLink = `https://image.tmdb.org/t/p/w500${data.seasons[i].poster_path}`;
      break; // Para assim que encontrar uma capa válida
    }
  }
 // Atribui o valor de coverLink ao input e à imagem
document.getElementById('animeCover').value = coverLink;
document.getElementById('animePreview').src = coverLink; // Define a src da imagem
document.getElementById('animePreview').style.display = 'flex'; // Adiciona display flex inicialmente

// Atualiza o src da imagem sempre que o valor de animeCover mudar
document.getElementById('animeCover').addEventListener('input', function() {
  const newCoverLink = this.value; // Obtém o novo valor do input
  document.getElementById('animePreview').src = newCoverLink; // Atualiza o src da imagem
  
  // Adiciona display flex se o novo src não estiver vazio
  if (newCoverLink) {
    document.getElementById('animePreview').style.display = 'flex';
  } else {
    document.getElementById('animePreview').style.display = 'none'; // Opcional: oculta a imagem se o src estiver vazio
  }
});






  document.getElementById('animeAverageRuntime').value = data.episode_run_time && data.episode_run_time[0] 
  ? `${data.episode_run_time[0]} min` 
  : '20 min';
  // Defina a data de lançamento, substituindo '-' por '/'
const rawReleaseDate = data.first_air_date || '';
const formattedReleaseDate = rawReleaseDate.replace(/-/g, '/');

// Atribua a data formatada ao campo de entrada
document.getElementById('animeReleaseDate').value = formattedReleaseDate;

  document.getElementById('animeReleaseYear').value = new Date(data.first_air_date).getFullYear() || '';
  document.getElementById('animeStudio').value = data.production_companies[0]?.name || '';
  document.getElementById('animeStation').value = ''; // Preencha conforme necessário
  const genreTranslation = {
    "Action": "Ação",
    "Adventure": "Aventura",
    "Animation": "Animação",
    "Comedy": "Comédia",
    "Crime": "Crime",
    "Documentary": "Documentário",
    "Drama": "Drama",
    "Family": "Família",
    "Fantasy": "Fantasia",
    "History": "História",
    "Horror": "Terror",
    "Music": "Música",
    "Mystery": "Mistério",
    "Romance": "Romance",
    "Science Fiction": "Ficção Científica",
    "TV Movie": "Filme para TV",
    "Thriller": "Suspense",
    "War": "Guerra",
    "Western": "Faroeste",
    "Kids": "Infantil",
    "Animation": "Animação",
    "Fantasy": "Fantasia",
    "Action & Adventure": "Ação & Aventura",
    "Sci-Fi & Fantasy": "Ficção Científica & Fantasia",
    "Mystery": "Mistério",
  };
document.getElementById('animeGenres').value =
data.genres
  .map((genre) => {
    const translatedGenre = genreTranslation[genre.name] || genre.name;
    return translatedGenre.replace(/&/g, ',');
  })
  .join(', ') || '';
  document.getElementById('animeRating').value =
  data.vote_average !== undefined ? data.vote_average.toFixed(1) : '6,0';
  document.getElementById('animeStatus').value = {
      'Returning Series': 'Em Pausa',
      Ended: 'Completo',
      Canceled: 'Completo',
      'In Production': 'Em Lançamento',
      Planned: 'Em Pausa',
  }[data.status] || '';
  document.getElementById('animeStation').value = getSeason(data.first_air_date) || '';
  function getSeason(airDate) {
    const month = new Date(airDate).getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Primavera';
    if (month >= 6 && month <= 8) return 'Verão';
    if (month >= 9 && month <= 11) return 'Outono';
    return 'Inverno';
  }
  document.getElementById('animeOverview').value = data.overview || '';
  document.getElementById('animeTitleJapanese').value = data.original_name || '';
  document.getElementById('animeTitle').value = data.name || ''; 
  document.getElementById('animeEpisodes').value = data.number_of_episodes || '';
  document.getElementById('seasons').value = data.seasons.length || '';

  // Atualiza o conteúdo inicialmente
  updateSeasonContent(animeId, data.seasons);

  // Adiciona ouvintes de evento para cada input
  document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => updateSeasonContent(animeId, data.seasons));
  });
}












































// ABRIR CODE
function editCode(event) {
  event.stopPropagation();
  const section = document.querySelector(".section01");
  section.style.display = "flex";
}

// VER CODE
function verCode(event) {
  event.stopPropagation();
  const code = document.querySelector(".code");
  code.style.display = "flex";
}

// COPIAR CODE
async function copyCode() {
  const content = document.getElementById('seasonContent').innerText;
  try {
      await navigator.clipboard.writeText(content);
      showMessage(); // Mostrar mensagem de sucesso
  } catch (err) {
      console.error('Erro ao copiar o conteúdo: ', err);
  }
}

function showMessage() {
  const mensagem = document.getElementById('mensagem');
  mensagem.style.display = 'flex'; // Mostrar a mensagem
  setTimeout(() => {
      mensagem.style.display = 'none'; // Esconder a mensagem após 3 segundos
  }, 3000);
}

// FECHAR CODE
function closeCode() {
  const codeElement = document.querySelector(".code");
  codeElement.style.display = "none";
}

// EXPANDIR CODE
function expandCode() {
  const codeElement = document.querySelector(".code");
  codeElement.classList.toggle("expand");
}

// FECHAR MODAL
function closeModal() {
  const section = document.querySelector(".section01");
  section.style.display = "none";
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

searchBar.addEventListener("input", (event) => {
  currentPage = 1;
  fetchAnimes(currentPage, event.target.value);
});




// SCROLLBAR 
function checkForScrollbar() {
  // Verifica se o body tem um scrollbar vertical
  const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;

  // Adiciona ou remove a classe .scroll no body
  if (hasScrollbar) {
      // Verifica se o scrollbar rolou mais de 200px
      if (window.scrollY > 100) {
          document.body.classList.add('scroll');
      } else {
          document.body.classList.remove('scroll');
      }
  } 
}

// Chama a função ao carregar a página
window.addEventListener('load', checkForScrollbar);

// Chama a função ao redimensionar a janela
window.addEventListener('resize', checkForScrollbar);

// Chama a função ao rolar a página
window.addEventListener('scroll', checkForScrollbar);




// BUTONS INPUT DE SUB AUDIO
window.onload = function() {
  document.getElementById("animeDubbedOrSubbed").value = document.querySelector('input[name="audio"]:checked').value;
  document.getElementById("site").value = document.querySelector('input[name="notaSite"]:checked').value;
  document.getElementById('nao').checked = true;
}
function updateSub(value) {
  document.getElementById("animeDubbedOrSubbed").value = value;
}

// BUTONS INPUT DE site nota
function updateSite(value) {
  document.getElementById("site").value = value;
}

fetchAnimes();