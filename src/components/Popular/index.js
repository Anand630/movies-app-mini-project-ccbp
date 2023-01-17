import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularMoviesList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getFormattedMovieData = eachMovie => ({
    backdropPath: eachMovie.backdrop_path,
    id: eachMovie.id,

    posterPath: eachMovie.poster_path,
    title: eachMovie.title,
  })

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const formattedPopularMoviesList = data.results.map(eachMovie =>
        this.getFormattedMovieData(eachMovie),
      )
      this.setState({
        popularMoviesList: formattedPopularMoviesList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  refetchPopularData = () => {
    this.getPopularMovies()
  }

  getPopularResultantView = () => {
    const {popularMoviesList, apiStatus} = this.state
    // console.log(popularMoviesList[0])
    switch (apiStatus) {
      case apiConstants.success:
        return (
          <ul className="popular-movies-container">
            {popularMoviesList.map(eachMovie => (
              <li className="each-movie-list-item" key={eachMovie.id}>
                <Link to={`/movies/${eachMovie.id}`}>
                  <img
                    testid="movieItem"
                    className="each-movie-image"
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
            className="popular-movies-page-loading-or-failure-container"
          >
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case apiConstants.failure:
        return (
          <div className="popular-movies-page-loading-or-failure-container">
            <img
              alt="failure view"
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673638803/Netflix%20Clone%20App/Failure%20Views/something-went-wrong-image_xs8afo.png"
              className="popular-page-failure-image"
            />
            <p className="popular-page-failure-description">
              Something went wrong. Please try again
            </p>
            <button
              onClick={this.refetchPopularData}
              type="button"
              className="popular-page-try-again-button"
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
    // console.log(searchedMoviesList)
    return (
      <div className="popular-movies-page-main-container">
        <Header />
        {this.getPopularResultantView()}
        <Footer className="footer" />
      </div>
    )
  }
}

export default Popular
