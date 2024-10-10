
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDE4Y2VmMjk0YTQwNzdhN2M0YWI1YTA2YTE1MzgyNiIsIm5iZiI6MTcyNDg5MDYyNi45ODAzMzEsInN1YiI6IjY1NjljYmM1NzFmMDk1MDBhYTBlYjUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dB_gJDUQofmvJ7Kph-YvBAcSKydSOXArS09R4m9FWHU'; // Substitua pelo seu token real

const baseURL = 'https://api.themoviedb.org/3';
const keywordId = 210024; 
const animesPerPage = 20;// ID da palavra-chave para filtrar os animes
let currentPage = 1;
let totalPages = 1;
let allAnimes = [];
let totalAnimesCount = 0;
let currentFilter = 'tv'; // 'tv' para séries, 'movie' para filmes
let sortedAnimes = [...allAnimes];
let globalEpisodeCount = 0;

async function fetchAnimes(page = 1, query = '') {
    try {
        const endpoint = currentFilter === 'tv'
            ? `${baseURL}/discover/tv?api_key=${apiToken}&with_genres=16&with_keywords=${keywordId}&page=${page}&language=pt-BR`
            : `${baseURL}/discover/movie?api_key=${apiToken}&with_keywords=${keywordId}&page=${page}&language=pt-BR`;


            
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        allAnimes = data.results;
        totalPages = data.total_pages;
        totalAnimesCount = data.total_results;

        updateTotalAnimesCount();
        displayAnimes(allAnimes);
        updatePaginationControls();
    } catch (error) {
        console.error('Erro ao buscar animes:', error);
    }
}



function updateTotalAnimesCount() {
    const totalCountElement = document.getElementById('total-count');
    totalCountElement.innerText = `Total de Animes: ${totalAnimesCount}`;
}

function displayAnimes(animes) {
    const container = document.getElementById('animeList');
    const pageInfo = document.getElementById('page-info');
    container.innerHTML = '';
    pageInfo.innerHTML = `<h2>Página ${currentPage}</h2>`;

    animes.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        const releaseDate = new Date(anime.first_air_date || anime.release_date).toLocaleDateString('pt-BR');
        animeElement.classList.add('animeItem');
        animeElement.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${anime.poster_path}" alt="${anime.name || anime.title}">
    <h3 class="titulo">${(currentPage - 1) * animesPerPage + (index + 1)}. ${anime.name || anime.title}</h3>
    <p>Data de Lançamento: ${releaseDate}</p>
    <div class="${currentFilter === 'tv' ? 'anime-tag' : 'movie-tag'}">${currentFilter === 'tv' ? 'Anime' : 'Filme'}</div>
`;
animeElement.onclick = () => {
    if (currentFilter === 'tv') {
        showAnimeDetails(anime.id);
    } else {
        showMovieDetails(anime.id);
    }
};
container.appendChild(animeElement);
});
}

function updatePaginationControls() {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Anterior';
        prevButton.onclick = () => changePage(currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.onclick = () => changePage(i);
        paginationContainer.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Próximo';
        nextButton.onclick = () => changePage(currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    fetchAnimes(currentPage, document.getElementById('search-input').value);
}

async function searchAnimes(query) {
    if (!query) {
        // Se a pesquisa estiver vazia, carregue a lista original de animes
        await fetchAnimes(currentPage);
        return;
    }

    try {
        const endpoint = currentFilter === 'tv'
            ? `${baseURL}/search/tv?api_key=${apiToken}&query=${encodeURIComponent(query)}&language=pt-BR`
            : `${baseURL}/search/movie?api_key=${apiToken}&query=${encodeURIComponent(query)}&language=pt-BR`;

        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Atualiza o número total de animes de acordo com os resultados da pesquisa
        totalAnimesCount = data.results.length;
        updateTotalAnimesCount(); // Atualiza o contador na interface

        // Exibe os resultados da pesquisa
        displayAnimes(data.results);
    } catch (error) {
        console.error('Erro ao pesquisar animes:', error);
    }
}



function showAnimeDetails(animeId) {
    const url = `${baseURL}/tv/${animeId}?language=pt-BR`;
    fetch(url, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        const genres = data.genres.map(genre => genre.name).join(', ');
        const releaseDate = new Date(data.first_air_date).toLocaleDateString('pt-BR');
        const studio = data.production_companies.length > 0 ? data.production_companies[0].name : 'Desconhecido';
        const statusMap = {
            'Returning Series': 'Em Pausa',
            'Ended': 'Completo',
            'Canceled': 'Completo',
            'In Production': 'Em Lançamento',
            'Planned': 'Em Pausa'
        };
        const status = statusMap[data.status] || 'Desconhecido';
        const rating = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';
        const seasons = data.number_of_seasons || 0;
        const episodes = data.number_of_episodes || 0;

        // Preencher os inputs com as informações do anime
        document.getElementById('modalTitle').innerText = data.name;
        document.getElementById('modalOriginalTitle').value = data.original_name || 'Desconhecido';
        document.getElementById('modalSeasons').value = seasons;
        document.getElementById('modalEpisodes').value = episodes;
        document.getElementById('modalRating').value = rating;
        document.getElementById('modalReleaseDate').value = releaseDate;
        document.getElementById('modalStudios').value = studio;
        document.getElementById('modalGenres').value = genres;
        document.getElementById('modalSeason').value = getSeason(data.first_air_date);
        document.getElementById('modalStatus').value = status;
        document.getElementById('modalOverview').value = data.overview || 'Sem sinopse disponível';

        // Atualiza o conteúdo do codeAnimes
        updateCodeAnimes(data, seasons, episodes, rating, releaseDate, studio, genres, status);
        openModal(); // Implemente esta função para mostrar o modal
    })
    .catch(error => console.error('Erro ao buscar detalhes do anime:', error));
}

// Exemplo de função para abrir o modal
function openModal() {
    globalEpisodeCount = 0; 
    const modal = document.getElementById('animeModal'); // Altere para o ID do seu modal
    modal.style.display = 'block'; // Ajuste conforme necessário
}












async function fetchEpisodeDetails(seasonId, seasonNumber) {
    const url = `${baseURL}/tv/${seasonId}/season/${seasonNumber}?language=pt-BR`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}


// definir especiais
const radios = document.querySelectorAll('input[name="especiais"]');
let includeSpecialSeasons = 'nao';
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    includeSpecialSeasons = radio.value;
    console.log(includeSpecialSeasons); 
  });
});
// CODE TEMPORADA
async function updateCodeAnimes(data, seasons, episodes, rating, releaseDate, studio, genres, status) {

    const epsList = await Promise.all(data.seasons
        .filter(season => includeSpecialSeasons === 'sim' || season.season_number > 0)
        // Ordena as temporadas para garantir que a Season 1 venha primeiro
        .sort((a, b) => a.season_number - b.season_number)
        .map(async (season) => {
            const episodeData = await fetchEpisodeDetails(data.id, season.season_number);
            // Resetando o contador de episódios para cada temporada
            const episodesHTML = createEpisodeSpans(episodeData.episodes, season.season_number);
            return `
<!--////////////  TEMPORADA ${season.season_number}  ////////////////////////////-->
<div class="listeps" id="season-${season.season_number.toString().padStart(2, '0')}">
    ${episodesHTML}
</div>
<!--/////////////////////////////////////////////////////////////////////////-->
            `;
        })
    );


  // LInk dos eps
  function formatDate(date) {
    const year = date.getFullYear().toString().slice(-0); // Pega os últimos 2 dígitos do ano
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona o 0 na frente se necessário
    return `/${year}/${month}/`;
  }


// CODE EPISODIO
function createEpisodeSpans(episodes, seasonNumber) {
    return episodes.map((episode, index) => {
        globalEpisodeCount++;
        const dataId = globalEpisodeCount;
         // Incrementando o contador de episódios para cada temporada
        const seasonLabel = seasonNumber === 0 ? 'Especiais' : `T${seasonNumber}`;
        const isInvalidImagePath = !episode.still_path || episode.still_path.includes('null');
        const imageSrc = isInvalidImagePath ? '' : `https://image.tmdb.org/t/p/w500${episode.still_path}`;
        
        const additionalClass = (index === 0) ? 'Pep' : (index === episodes.length - 1 ? 'Uep' : '');
        
        function formatEpisodeName(name) {
            return name
                .toLowerCase()                     // Converter para minúsculas
                .replace(/\s+/g, '-')              // Substituir espaços por hífens
                .replace(/[^\w\-]+/g, '');         // Remover tudo que não for letra, número ou hífen
        }
        const formattedName = formatEpisodeName(data.name);        
        return `
                 <!-----${seasonLabel}/ Episodio ${episode.episode_number}----------------------------------->
      <main class="episodio items ${additionalClass}">
        <div class="vieweP" onclick="playSoundSec()" data-id="${dataId}">
          <a href="${episode.air_date ? formatDate(new Date(episode.air_date)) : '/aa/mm/'}${formattedName}${seasonLabel}-episodio${episode.episode_number}.html" target="_blank" class="linkep">
            <img class="imgC" src="${imageSrc}"/>
            <h7>${episode.runtime || '24'} min</h7>
            <div class="epNumbers">
              <h8 class="epNN">${episode.episode_number}</h8>
            </div>
          </a>
          <h8 class="tituloN" data-numberT="${episode.episode_number}" data-name="${episode.name}"></h8>
          <h8 class="sinopseN">
          ${episode.overview}
          </h8>
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
}


// CODE BUTTONS SEASONS
    const buttonsSeasons = data.seasons
        .filter(season => includeSpecialSeasons === 'sim' || season.season_number > 0) 
        .map((season, index) => {
            const clickedClass = index === 0 ? 'clicked' : ''; 
            const seasonNumberFormatted = String(season.season_number).padStart(2, '0'); 
            const coverLink = season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : ''; 

            return `
<span data-capa="${coverLink}" data-season="${seasonNumberFormatted}" class="${clickedClass}" onclick="playSoundSec(), altcapa(event)">${seasonNumberFormatted}</span>
            `;
        }).join('');



// CODE GERAL
    const codeAnimes = document.getElementById('codeAnimes');
    codeAnimes.textContent = `
        ${epsList.join('')}
        ${buttonsSeasons}
        <div></div>Título Original: ${data.original_name || 'Desconhecido'}
        Temporadas: ${seasons}
        Episódios: ${episodes}
        Avaliação: ${rating}
        Data de Lançamento: ${releaseDate}
        Estúdio: ${studio}
        Gêneros: ${genres}
        Estação: ${getSeason(data.first_air_date)}
        Status: ${status}
        Sinopse: ${data.overview || 'Sem sinopse disponível'}
    `.trim(); 
}











function updateCode() {
    
    const originalTitle = document.getElementById('modalOriginalTitle').value;
    const seasons = document.getElementById('modalSeasons').value;
    const episodes = document.getElementById('modalEpisodes').value;
    const rating = document.getElementById('modalRating').value;
    const releaseDate = document.getElementById('modalReleaseDate').value;
    const studio = document.getElementById('modalStudios').value;
    const genres = document.getElementById('modalGenres').value;
    const status = document.getElementById('modalStatus').value;
    
    // Chama a função para atualizar o <pre>
    updateCodeAnimes({ original_name: originalTitle, overview: document.getElementById('modalOverview').value }, seasons, episodes, rating, releaseDate, studio, genres, status);
}

function getSeason(airDate) {
    const month = new Date(airDate).getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Primavera';
    if (month >= 6 && month <= 8) return 'Verão';
    if (month >= 9 && month <= 11) return 'Outono';
    return 'Inverno';
}

// Fechar o modal ao clicar no "X"
document.querySelector('.close').onclick = () => {
    document.getElementById('animeModal').style.display = 'none';
};

// Evento de input na barra de pesquisa
document.getElementById('search-input').addEventListener('input', (event) => {
    searchAnimes(event.target.value);
});

// Adicionando eventos aos botões de filtro
document.getElementById('filter-tv').onclick = () => {
    document.getElementById('filter-tv').classList.add('active');
    document.getElementById('filter-movie').classList.remove('active');
    changeFilter('tv');
};

document.getElementById('filter-movie').onclick = () => {
    document.getElementById('filter-movie').classList.add('active');
    document.getElementById('filter-tv').classList.remove('active');
    changeFilter('movie');
};



// Função para mudar o filtro
function changeFilter(filter) {
    currentFilter = filter;
    currentPage = 1;

    // Se há uma pesquisa ativa, mantém o filtro aplicado sobre os resultados da pesquisa
    const searchInput = document.getElementById('search-input').value;
    
    if (searchInput) {
        // Se houver uma busca ativa, aplica o filtro sobre os resultados da busca
        searchAnimes(searchInput);
    } else {
        // Se não houver busca ativa, faz a busca normal por animes
        fetchAnimes(currentPage);
    }
}


// Iniciar com a busca de animes ao carregar a página
fetchAnimes();
