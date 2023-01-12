import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class SearchRoute extends Component {
  state = {searchedMoviesList: []}

  getFormattedMovie = movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  searchMovies = async searchedText => {
    console.log(searchedText)
    const jwtToken = Cookies.get('jwt_token')
    const searchApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchedText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchApiUrl, options)
    const data = await response.json()
    console.log(data)
    const formattedMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovie(eachMovie),
    )
    console.log(formattedMoviesList)
    this.setState({searchedMoviesList: formattedMoviesList})
  }

  render() {
    const {searchedMoviesList} = this.state
    return (
      <div className="search-route-page-main-container">
        <Header {...{viewSearchBar: true, searchMovies: this.searchMovies}} />
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
      </div>
    )
  }
}

export default SearchRoute
