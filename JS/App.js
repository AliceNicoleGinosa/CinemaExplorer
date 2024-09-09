import LinkMenu from "./components/LinkMenu.js";
import SearchInput from "./components/SearchInput.js";
import Wrapper from "./components/Wrapper.js";
import modal from "./components/Modal.js";
import Text from "./components/Text.js";
import SelectMenu from "./components/SelectMenu.js";
import YearInput from "./components/YearInput.js";

import { createEl, find } from "./helpers.js";

//Menu nav movies and series

const menuNav = find(".navigation-menu");
const movies = LinkMenu({ text: "Movies" });
const series = LinkMenu({ text: "Series" });
menuNav.append(movies, series);

// SEARCH FILTER
//Search by keyword
//Search by year
// Search by genre

const wrapperSearch = find(".wrapper-search");
const Search = SearchInput();
const yearInput = YearInput();
const filterGenreMOVIES = find("#select");
const filterGenreSERIES = find("#select-series");
wrapperSearch.append(Search, filterGenreMOVIES, filterGenreSERIES, yearInput);

const createSelectMenu = (genre) => {
  const selectParams = {
    text: genre.name,
    id: genre.id,
  };

  const select = SelectMenu(selectParams);
  return select;
};

// funzione per la creazione del contenuto movie o serie
const createcardEl = (el, mediaType = null) => {
  if (!el.poster_path) {
    return null;
  }
  // const listEl = createEl("div");
  // listEl.className = ".wrapper-card";
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageUrl = imagePath + el.poster_path;
  const cardParams = {
    title: el.title,
    image: imageUrl,
    id: el.id,
    mediaType: mediaType || el.media_type,
  };
  const cardEl = Wrapper(cardParams);

  // listEl.append(cardEl);

  return cardEl;
};

// funzione per la creazione della modale

const createModal = (el) => {
  // const modalWrapper = createEl("div");
  // modalWrapper.className = "modal-wrapper";
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageUrl = imagePath + el.poster_path;
  const modalParams = {
    image: imageUrl,
    title: el.title,
    description: el.overview,
    rate: el.vote_average,
  };

  const modalEl = modal(modalParams);
  // modalWrapper.append(modalEl);
  return modalEl;
};

// fetch
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2VmNDZhZTA5Yjc5MzU1NGQyZjEwNTNkOGY1NDU5NiIsInN1YiI6IjY2M2RlZmNlYjgyY2Q4NGM2ZGYxY2E3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TH50OKFRJNNtMOVzlyUATeTa7m_5VW4qKiYGDqZ_i-8",
  },
};

fetch("https://api.themoviedb.org/3/trending/all/week?language=en-US", options)
  .then((response) => response.json())
  .then((arrayAll) => {
    const newArray = arrayAll.results
      .map((el) => createcardEl(el))
      .filter((el) => el !== null);
    const watchList = find(".watch--list");
    watchList.append(...newArray);

    // aggiungo event listener al bottone movies

    movies.addEventListener("click", () => {
      fetch(
        "https://api.themoviedb.org/3/trending/all/week?language=en-US",
        options
      )
        .then((response) => response.json())
        .then((arrayAll) => {
          const watchList = find(".watch--list");
          watchList.innerHTML = "";

          arrayAll.results.forEach((item) => {
            if (item.media_type == "movie") {
              const movieEl = createcardEl(item);
              watchList.append(movieEl);
            }
          });
        });
    });
  });

// Aggiungo un event listener al pulsante "Series"
series.addEventListener("click", () => {
  fetch(
    "https://api.themoviedb.org/3/trending/all/week?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((arrayAll) => {
      const watchList = find(".watch--list");
      watchList.innerHTML = "";

      arrayAll.results.forEach((item) => {
        if (item.media_type == "tv") {
          const seriesEl = createcardEl(item);
          watchList.append(seriesEl);
        }
      });
    });
});

// evento al click su input text toglie il placeholder
const inputEl = find(".input-wrapper");
inputEl.addEventListener("click", () => {
  inputEl.placeholder = "";
});
const inputYearEl = find(".input-year");
inputYearEl.addEventListener("click", () => {
  inputYearEl.placeholder = "";
});

// Evento ricerca titoli per KEYWORD

const FormElMoviesSeries = find("form");

FormElMoviesSeries.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputForm = find(".input-wrapper");
  const searchQuery = inputForm.value;

  const url_movies_series = `https://api.themoviedb.org/3/search/multi?&query=${searchQuery}`;

  fetch(url_movies_series, options)
    .then((res) => res.json())
    .then((moviesSeriesArray) => {
      const totalmovies_series = moviesSeriesArray.results
        .map((el) => createcardEl(el))
        .filter((el) => el !== null);
      const watchList = find(".watch--list");
      watchList.innerHTML = "";

      if (totalmovies_series.length === 0) {
        const notFound = Text({
          className: "messageNotFound",
          text: "Your search has no match, try again!",
        });
        watchList.append(notFound);
      } else {
        watchList.append(...totalmovies_series);
      }
    });
});

//evento per generare modale

const wrapperEl = document.querySelector(".watch--list");

wrapperEl.addEventListener("click", (event) => {
  const id = event.target.id;
  const media = event.target.dataset.mediaType;
  console.log(event.target);
  if (
    event.target.className === "wrapper" ||
    event.target.className === "image--wrapper"
  ) {
    fetch(
      `https://api.themoviedb.org/3/${media}/${id}?language=en-US/`,
      options
    )
      .then((res) => res.json())
      .then((movie) => {
        const modalEl = createModal(movie);
        const watchList = find(".watch--list");
        watchList.append(modalEl);
        const buttonModal = modalEl.querySelector(".modal-button");
        buttonModal.addEventListener("click", () => {
          modalEl.remove();
        });
      });
  }
});

// //Creo elementi per dropdown (genre) MOVIES

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((response) => response.json())
  .then((genresArray) => {
    const option = genresArray.genres.map((genre) => createSelectMenu(genre));
    const selectContainer = find("#select");
    const labelOption = createEl("option");
    labelOption.textContent = "Movies by genre!";
    labelOption.disabled = true;
    labelOption.selected = true;
    selectContainer.append(labelOption, ...option);
  });

// //Creo elementi per dropdown (genre) SERIES

fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
  .then((response) => response.json())
  .then((genresArray) => {
    const option = genresArray.genres.map((genre) => createSelectMenu(genre));
    const selectContainer = find("#select-series");
    const labelOption = createEl("option");
    labelOption.textContent = "Series by genre!";
    labelOption.disabled = true;
    labelOption.selected = true;
    selectContainer.append(labelOption, ...option);
  });

/// filtrare per genere MOVIES

const select = find("#select");
select.addEventListener("change", (e) => {
  const genre = e.target.value;
  // console.log(e.target.value);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
    options
  )
    .then((response) => response.json())
    .then((movies) => {
      const watchList = find(".watch--list");
      watchList.innerHTML = "";
      const bygenre = movies.results.map((movie) =>
        createcardEl(movie, "movie")
      );
      watchList.append(...bygenre);
    });
});

/// filtro genere SERIES
const selectSeries = find("#select-series");
selectSeries.addEventListener("change", (e) => {
  const genre = e.target.value;
  console.log(e.target.value);
  fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
    options
  )
    .then((response) => response.json())
    .then((series) => {
      const watchList = find(".watch--list");
      watchList.innerHTML = "";
      const bygenreSeries = series.results.map((serie) =>
        createcardEl(serie, "tv")
      );

      watchList.append(...bygenreSeries);
    });
});

//filtra per anno di uscita sia SERIES sia MOVIES
const yearForm = find(".year-form");
yearForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputYear = find(".input-year");
  const YEAR = inputYear.value;
  console.log(YEAR);

  const url_movies_year = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${YEAR}&sort_by=popularity.desc`;
  const url_series_year = `https://api.themoviedb.org/3/discover/tv?first_air_date_year=${YEAR}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`;

  Promise.all([
    fetch(url_movies_year, options).then((res) => res.json()),
    fetch(url_series_year, options).then((res) => res.json()),
  ]).then(([movies, series]) => {
    const watchList = find(".watch--list");
    watchList.innerHTML = "";

    if (
      YEAR <= 2024 &&
      YEAR >= 1930 &&
      (movies.results.length > 0 || series.results.length > 0)
    ) {
      const moviesByYear = movies.results.map((movie) =>
        createcardEl(movie, "movie")
      );
      const seriesByYear = series.results.map((serie) =>
        createcardEl(serie, "tv")
      );
      watchList.append(...moviesByYear, ...seriesByYear);
    } else {
      const notFound = Text({
        className: "messageNotFound",
        text: "Your search has no match, try again!",
      });
      watchList.append(notFound);
    }
  });
});

//filtra per anno di uscita solo MOVIES

// const yearForm = find(".year-form");
// yearForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const inputYear = find(".input-year");
//   const YEAR = inputYear.value;
//   console.log(YEAR);

//   const url_movies_year = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${YEAR}&sort_by=popularity.desc`;
//   fetch(url_movies_year, options)
//     .then((res) => res.json())
//     .then((movies) => {
//       const watchList = find(".watch--list");
//       watchList.innerHTML = "";
//       if (YEAR <= 2024 && YEAR >= 1930) {
//         const byYear = movies.results.map((movie) => createcardEl(movie));
//         watchList.append(...byYear);
//       } else {
//         const notFound = Text({
//           className: "messageNotFound",
//           text: "Your search has no match, try again!",
//         });
//         watchList.append(notFound);
//       }
//     });
// });
