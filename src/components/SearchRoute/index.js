import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchRoute extends Component {
  state = {
    searchedMoviesList: [],
    fetchingDone: false,
    searchedText: '',
    apiStatus: apiConstants.initial,
  }

  getFormattedMovie = movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  searchMovies = async searchedText => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchedText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchApiUrl, options)

    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const formattedMoviesList = data.results.map(eachMovie =>
        this.getFormattedMovie(eachMovie),
      )
      // console.log(formattedMoviesList)
      this.setState({
        searchedMoviesList: formattedMoviesList,
        fetchingDone: true,
        searchedText,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  refetchSearchData = () => {
    this.searchMovies()
  }

  getSearchResultsView = () => {
    const {
      apiStatus,
      searchedMoviesList,
      fetchingDone,
      searchedText,
    } = this.state
    switch (apiStatus) {
      case apiConstants.success:
        // && fetchingDone
        return searchedMoviesList.length === 0 && fetchingDone ? (
          <div className="searched-movies-page-loading-or-failure-container">
            <img
              alt="no movies"
              className="no-movies-found-image"
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673620681/Netflix%20Clone%20App/Search%20Route/no-results-found-image_d6bkpt.png"
            />
            <p className="searched-text-display-sentence">
              Your search for {searchedText} did not find any matches.
            </p>
          </div>
        ) : (
          <ul className="search-route-bottom-container">
            {searchedMoviesList.map(eachMovie => (
              <li className="searched-movie-image-container" key={eachMovie.id}>
                <Link to={`movies/${eachMovie.id}`}>
                  <img
                    testid="movieItem"
                    className="searched-movie-image"
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )
      case apiConstants.inProgress:
        return (
          // testid='loader'
          <div
            testid="loader"
            className="searched-movies-page-loading-or-failure-container"
          >
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case apiConstants.failure:
        return (
          <div className="searched-movies-page-loading-or-failure-container">
            <img
              alt="failure view"
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673638803/Netflix%20Clone%20App/Failure%20Views/something-went-wrong-image_xs8afo.png"
              className="searched-page-failure-image"
            />
            <p className="searched-page-failure-description">
              Something went wrong. Please try again
            </p>
            <button
              onClick={this.refetchSearchData}
              type="button"
              className="searched-page-try-again-button"
            >
              Try Again
            </button>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    // const {searchedMoviesList, fetchingDone, searchedText} = this.state
    return (
      <div className="search-route-page-main-container">
        <Header {...{searchMovies: this.searchMovies}} />
        {this.getSearchResultsView()}
      </div>
    )
  }
}

export default SearchRoute
