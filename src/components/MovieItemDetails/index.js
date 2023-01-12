import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Header from '../Header'
import Footer from '../Footer'
import SimilarMovieItem from '../SimilarMovieItem'

import './index.css'

class MovieItemDetails extends Component {
  state = {movieDetails: {}, genres: [], similarMovies: [], spokenLanguages: []}

  componentDidMount() {
    this.getSpecificMovieDetails()
  }

  getFormattedMovieDetails = movieDetails => ({
    adult: movieDetails.adult,
    backdropPath: movieDetails.backdrop_path,
    budget: movieDetails.budget,
    id: movieDetails.id,
    overview: movieDetails.overview,
    posterPath: movieDetails.poster_path,
    releaseDate: movieDetails.release_date,
    runtime: movieDetails.runtime,
    title: movieDetails.title,
    voteAverage: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
  })

  getFormattedSimilarMovie = movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  getFormattedSpokenLanguagesList = eachLanguage => ({
    englishName: eachLanguage.english_name,
    id: eachLanguage.id,
  })

  getSpecificMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieDetailsApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(movieDetailsApiUrl, options)
    const data = await response.json()
    console.log(data)
    // movieDetails
    const formattedMovieDetails = this.getFormattedMovieDetails(
      data.movie_details,
    )
    console.log(formattedMovieDetails)
    // similar movie details
    const formattedSimilarMoviesList = data.movie_details.similar_movies.map(
      eachMovie => this.getFormattedSimilarMovie(eachMovie),
    )
    console.log(formattedSimilarMoviesList)
    // spoken languages
    const formattedSpokenLanguagesList = data.movie_details.spoken_languages.map(
      eachLanguage => this.getFormattedSpokenLanguagesList(eachLanguage),
    )
    console.log(formattedSpokenLanguagesList)

    this.setState({
      movieDetails: formattedMovieDetails,
      genres: data.movie_details.genres,
      spokenLanguages: formattedSpokenLanguagesList,
      similarMovies: formattedSimilarMoviesList,
    })
  }

  formattedMovieDuration = runtime => {
    if (runtime < 60) {
      return `${runtime}m`
    }
    const hours = Math.trunc(runtime / 60)
    const minutes = runtime % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }

  getFormattedDate = releaseDate => {
    if (releaseDate !== undefined) {
      // const dateObj = new Date(releaseDate)
      const formattedDate = format(new Date(releaseDate), 'do MMMM yyyy')
      console.log(formattedDate)
      return formattedDate
    }
    return ''
  }

  render() {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state

    const {
      backdropPath,
      overview,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
      runtime,
      adult,
      title,
    } = movieDetails
    const duration = this.formattedMovieDuration(runtime)
    const releaseYear = new Date(releaseDate).getFullYear()
    const certification = adult ? 'A' : 'U/A'
    const formattedDate = this.getFormattedDate(releaseDate)

    return (
      <div className="movie-item-details-main-container">
        <div
          className="movie-item-poster-container"
          style={{
            backgroundImage: `linear-gradient(90.33deg, #181818 -6.5%, rgba(24, 24, 24, 0.6) 57.15%, rgba(24, 24, 24, 0) 99.77%), url(${backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="movie-details-top-poster-text-container">
            <h1 className="movie-details-page-title">{title}</h1>
            <div className="movie-duration-certification-release-year-container">
              <p className="movie-duration">{duration}</p>
              <p className="movie-certificate">{certification}</p>
              <p className="release-year">{`${releaseYear}`}</p>
            </div>
            <p className="movie-overview">{overview}</p>
            <button className="play-button-in-movie-details" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-item-details-bottom-container">
          <div className="all-labels-and-info-container">
            <div className="one-content-label-and-info-container">
              <h3 className="content-label-text">Genres</h3>
              <ul className="genres-list-container">
                {genres.map(eachGenre => (
                  <li className="info-text" key={eachGenre.id}>
                    {eachGenre.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="one-content-label-and-info-container">
              <h3 className="content-label-text">Audio Available</h3>
              <ul className="genres-list-container">
                {spokenLanguages.map(eachLang => (
                  <li className="info-text" key={eachLang.id}>
                    {eachLang.englishName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="two-content-label-and-info-container">
              <h3 className="content-label-text">Rating Count</h3>
              <p className="info-text">{voteCount}</p>
              <h3 className="content-label-text">Rating Average</h3>
              <p className="info-text">{voteAverage}</p>
            </div>
            <div className="two-content-label-and-info-container">
              <h3 className="content-label-text">Budget</h3>
              <p className="info-text">{budget}</p>
              <h3 className="content-label-text">Release Date</h3>
              <p className="info-text">{formattedDate}</p>
            </div>
          </div>
          <h3 className="similar-movies-heading">More like this</h3>
          <ul className="similar-movies-list-container">
            {similarMovies.map(eachMovie => (
              <SimilarMovieItem
                similarMovieDetails={eachMovie}
                key={eachMovie.id}
              />
            ))}
          </ul>
          <Footer />
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
