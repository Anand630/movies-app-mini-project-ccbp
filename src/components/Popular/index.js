import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Popular extends Component {
  state = {searchedMoviesList: []}

  componentDidMount() {
    this.getSearchedMovies()
  }

  getFormattedMovieData = eachMovie => ({
    backdropPath: eachMovie.backdrop_path,
    id: eachMovie.id,

    posterPath: eachMovie.poster_path,
    title: eachMovie.title,
  })

  getSearchedMovies = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const formattedSearchedMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovieData(eachMovie),
    )
    this.setState({searchedMoviesList: formattedSearchedMoviesList})
  }

  render() {
    const {searchedMoviesList} = this.state
    console.log(searchedMoviesList)
    return (
      <div className="popular-movies-page-main-container">
        <Header />
        {/* <div className="searched-results-container"> */}
        <ul className="popular-movies-container">
          {searchedMoviesList.map(eachMovie => (
            <li className="each-movie-list-item" key={eachMovie.id}>
              <Link to={`/movies/${eachMovie.id}`}>
                <img
                  className="each-movie-image"
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                />
              </Link>
            </li>
          ))}
        </ul>
        {/* </div> */}
        <Footer className="footer" />
      </div>
    )
  }
}

export default Popular
