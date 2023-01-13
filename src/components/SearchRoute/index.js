import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class SearchRoute extends Component {
  state = {searchedMoviesList: [], fetchingDone: false, searchedText: ''}

  getFormattedMovie = movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  searchMovies = async searchedText => {
    // console.log(searchedText)
    const jwtToken = Cookies.get('jwt_token')
    const searchApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchedText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchApiUrl, options)
    const data = await response.json()
    // console.log(data)
    const formattedMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovie(eachMovie),
    )
    // console.log(formattedMoviesList)
    this.setState({
      searchedMoviesList: formattedMoviesList,
      fetchingDone: true,
      searchedText,
    })
  }

  render() {
    const {searchedMoviesList, fetchingDone, searchedText} = this.state
    return (
      <div className="search-route-page-main-container">
        <Header {...{viewSearchBar: true, searchMovies: this.searchMovies}} />
        {searchedMoviesList.length === 0 && fetchingDone ? (
          <div className="no-results-found-container">
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
                    className="searched-movie-image"
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default SearchRoute
