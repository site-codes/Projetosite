
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
        openModal();
        updateSeasonsAndButtons(data.seasons); // Chama a nova função combinada
    })
    .catch(error => console.error('Erro ao buscar detalhes do anime:', error));
}
function updateSeasonsAndButtons(seasons) {
    const codeAnimes = document.getElementById('codeAnimes');
    codeAnimes.textContent = '';  // Limpa o conteúdo anterior

    // SEASONS
    const buttonSeasons = seasons.map(season => {
        // Verifica se a temporada possui episódios
        const episodes = season.episodes && season.episodes.length > 0
            ? season.episodes.map(episode => {
                return `<li>Episódio ${episode.episode_number}: ${episode.title || 'Título Desconhecido'}</li>`;
            }).join('') // Une os episódios em uma string
            : '<li>Nenhum episódio disponível</li>'; // Mensagem caso não haja episódios

        return `
<div class="listeps" id="season-${season.season_number.toString().padStart(2, '0')}">
    <h3>Temporada ${season.season_number}: ${season.name || 'Desconhecida'}</h3>
    <ul>${episodes}</ul>
</div>
<!--//////////////////////////////////////////////////-->
        `;
    }).join('');

    codeAnimes.textContent += `//// SEASONS ${buttonSeasons}`; 

    // BUTTONS
    const spansHTML = seasons.map(season => {
        return `
<span data-season="${season.season_number.toString().padStart(2, '0')}" onclick="playSoundSec(), altcapa(event)">${season.season_number.toString().padStart(2, '0')}</span>`;
    }).join('');

    codeAnimes.textContent += `//// BUTTONS ${spansHTML}`; 
}













function openModal() {
    const modal = document.getElementById('animeModal'); // Altere para o ID do seu modal
    modal.style.display = 'block'; // Ajuste conforme necessário
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
