const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f91ed0d4210c94017597651f16d5feb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?api_key=7f91ed0d4210c94017597651f16d5feb&query="';

///select elements from the DOM
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// /Get initial movies
getMovies(API_URL);

async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();

	showMovies(data.results);
}

function showMovies(movies) {
	//clear it
	main.innerHTML = '';

	//loop for movies fetched
	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;

		//construct div with the real data
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');

		movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
		main.appendChild(movieEl);
	});
}

//get class by rate
function getClassByRate(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	//if searchterm exists and it's not equal to anything
	if (searchTerm && searchTerm !== '') {
		//whatever the searchTerm is
		getMovies(SEARCH_API + searchTerm);

		//clear the search value
		search.value = '';
	} else {
		//reload the page
		windows.location.reload();
	}
});
