import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import SimilarMovieItem from '../SimilarMovieItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    genres: [],
    similarMovies: [],
    spokenLanguages: [],
    apiStatus: apiConstants.initial,
  }

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
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const {match} = this.props
    // console.log(this.props)
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

    // console.log(data)
    // movieDetails

    //  for finding duplicates

    const findMoviePresentOrNot = (moviesArray, movieId) => {
      const result = moviesArray.findIndex(
        eachMovie => eachMovie.id === movieId,
      )
      if (result === -1) {
        return true
      }
      return false
    }

    if (response.ok) {
      const data = await response.json()
      const formattedMovieDetails = this.getFormattedMovieDetails(
        data.movie_details,
      )
      // console.log(formattedMovieDetails)
      // recentMovies
      let recentMovies = localStorage.getItem('recentMovies')
      if (recentMovies !== null) {
        recentMovies = JSON.parse(recentMovies)
        if (recentMovies.length === 3) {
          recentMovies.pop()
        }
      }
      console.log(recentMovies)
      let recentMoviesArray
      if (recentMovies === null) {
        recentMoviesArray = [
          {
            moviePoster: formattedMovieDetails.backdropPath,
            id: formattedMovieDetails.id,
          },
        ]
      } else if (recentMovies.length === 0) {
        recentMoviesArray = [
          {
            moviePoster: formattedMovieDetails.backdropPath,
            id: formattedMovieDetails.id,
          },
        ]
      } else if (
        findMoviePresentOrNot(recentMovies, formattedMovieDetails.id)
      ) {
        recentMoviesArray = [
          {
            moviePoster: formattedMovieDetails.backdropPath,
            id: formattedMovieDetails.id,
          },
          ...recentMovies,
        ]
      }

      if (recentMoviesArray !== undefined) {
        const dataToBeStored = JSON.stringify(recentMoviesArray)
        localStorage.setItem('recentMovies', dataToBeStored)
      }

      // similar movie details
      const formattedSimilarMoviesList = data.movie_details.similar_movies.map(
        eachMovie => this.getFormattedSimilarMovie(eachMovie),
      )
      // console.log(formattedSimilarMoviesList)
      // spoken languages
      const formattedSpokenLanguagesList = data.movie_details.spoken_languages.map(
        eachLanguage => this.getFormattedSpokenLanguagesList(eachLanguage),
      )
      // console.log(formattedSpokenLanguagesList)

      this.setState({
        movieDetails: formattedMovieDetails,
        genres: data.movie_details.genres,
        spokenLanguages: formattedSpokenLanguagesList,
        similarMovies: formattedSimilarMoviesList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
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
      // console.log(formattedDate)
      return formattedDate
    }
    return ''
  }

  refetchMovieDetails = () => {
    this.getSpecificMovieDetails()
  }

  getMovieDetailsResultantView = () => {
    const {
      movieDetails,
      genres,
      spokenLanguages,
      similarMovies,
      apiStatus,
    } = this.state

    const {
      // backdropPath,
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
    switch (apiStatus) {
      case apiConstants.success:
        return (
          <>
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
                      <p className="info-text" key={eachGenre.id}>
                        {eachGenre.name}
                      </p>
                    ))}
                  </ul>
                </div>
                <div className="one-content-label-and-info-container">
                  <h3 className="content-label-text">Audio Available</h3>
                  <ul className="genres-list-container">
                    {spokenLanguages.map(eachLang => (
                      <p className="info-text" key={eachLang.id}>
                        {eachLang.englishName}
                      </p>
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
          </>
        )
      case apiConstants.inProgress:
        return (
          <>
            <Header />
            <div
              testid="loader"
              className="movie-details-page-loader-failure-container"
            >
              <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
            </div>
          </>
        )
      case apiConstants.failure:
        return (
          <>
            <Header />
            <div className="movie-details-page-loader-failure-container">
              <img
                alt="failure view"
                src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673638803/Netflix%20Clone%20App/Failure%20Views/something-went-wrong-image_xs8afo.png"
                className="movie-details-page-failure-image"
              />
              <p className="movie-details-page-failure-description">
                Something went wrong. Please try again
              </p>
              <button
                onClick={this.refetchMovieDetails}
                type="button"
                className="movie-details-page-try-again-button"
              >
                Try Again
              </button>
            </div>
          </>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-details-main-container">
        {this.getMovieDetailsResultantView()}
      </div>
    )
  }
}

export default MovieItemDetails
