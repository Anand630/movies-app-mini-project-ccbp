import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
// import {TiWarning} from 'react-icons/ti'
import Header from '../Header'
import MovieItem from '../MovieItem'
import RecentMovieItem from '../RecentMovieItem'

import Footer from '../Footer'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,

  responsive: [
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 946,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 544,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingMoviesList: [],
    originalsMoviesList: [],
    homePageMovie: {},
    dataFetched: false,
    originalsApiStatus: apiConstants.initial,
    trendingApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTrendingNowMoviesList()
    this.getOriginalsMoviesList()
  }

  getFormattedMovieData = eachMovie => ({
    backdropPath: eachMovie.backdrop_path,
    id: eachMovie.id,
    overview: eachMovie.overview,
    posterPath: eachMovie.poster_path,
    title: eachMovie.title,
  })

  getRandomMovie = trendingMoviesList => {
    const randomIndex = Math.floor(Math.random() * trendingMoviesList.length)
    // console.log(randomIndex)
    return trendingMoviesList[randomIndex]
  }

  getTrendingNowMoviesList = async () => {
    this.setState({trendingApiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const tendingMoviesApiUrl =
      'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(tendingMoviesApiUrl, options)

    // // console.log(response)
    // // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const formattedTrendingMoviesList = data.results.map(eachMovie =>
        this.getFormattedMovieData(eachMovie),
      )
      // console.log(formattedTrendingMoviesList)

      this.setState({
        trendingMoviesList: formattedTrendingMoviesList,
        trendingApiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        trendingApiStatus: apiConstants.failure,
      })
    }
  }

  getOriginalsMoviesList = async () => {
    this.setState({originalsApiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const originalsMoviesApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsMoviesApiUrl, options)

    // console.log(response)
    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const formattedOriginalsMoviesList = data.results.map(eachMovie =>
        this.getFormattedMovieData(eachMovie),
      )
      // console.log(formattedOriginalsMoviesList)
      const homePageMovie = this.getRandomMovie(formattedOriginalsMoviesList)
      // const unformattedHomePageMovie = this.getRandomMovie(data.results)
      // const homePageMovie = this.getFormattedMovieData(unformattedHomePageMovie)
      this.setState({
        originalsMoviesList: formattedOriginalsMoviesList,
        homePageMovie,
        dataFetched: true,
        originalsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        originalsApiStatus: apiConstants.failure,
      })
    }
  }

  refetchOriginalsData = () => {
    this.getOriginalsMoviesList()
  }

  refetchTrendingData = () => {
    this.getTrendingNowMoviesList()
  }

  getTrendingErrorView = () => (
    <div className="top-container-failure-or-loading-container">
      <img
        src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673696599/Netflix%20Clone%20App/Failure%20Views/alert-icon_fjdzey.png"
        className="warning-icon-bottom"
        alt="failure view"
      />
      <p className="failure-text-bottom">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.refetchTrendingData}
        type="button"
        className="try-again-button-bottom"
      >
        Try Again
      </button>
    </div>
  )

  getPosterOriginalsErrorView = () => (
    <div className="top-container-failure-or-loading-container">
      <img
        src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673696599/Netflix%20Clone%20App/Failure%20Views/alert-icon_fjdzey.png"
        className="warning-icon-bottom"
        alt="failure view"
      />
      <p className="failure-text-bottom">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.refetchOriginalsData}
        type="button"
        className="try-again-button-bottom"
      >
        Try Again
      </button>
    </div>
  )

  getLoadingView = () => (
    // testid='loader'
    <div testid="loader" className="top-container-failure-or-loading-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  getTopContainerView = () => {
    const {homePageMovie, originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiConstants.success:
        return (
          <div className="top-container-middle-text-container">
            <h1 className="movie-poster-heading">{homePageMovie.title}</h1>
            <h1 className="movie-poster-description">
              {homePageMovie.overview}
            </h1>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
        )
      case apiConstants.inProgress:
        return this.getLoadingView()
      case apiConstants.failure:
        return this.getPosterOriginalsErrorView()

      default:
        return null
    }
  }

  originalsView = () => {
    const {originalsApiStatus, originalsMoviesList} = this.state
    switch (originalsApiStatus) {
      case apiConstants.success:
        return (
          <div>
            <Slider {...settings}>
              {originalsMoviesList.map(eachMovie => (
                <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
          </div>
        )
      case apiConstants.inProgress:
        return this.getLoadingView()
      case apiConstants.failure:
        return this.getPosterOriginalsErrorView()

      default:
        return null
    }
  }

  trendingMoviesView = () => {
    const {trendingApiStatus, trendingMoviesList} = this.state
    switch (trendingApiStatus) {
      case apiConstants.success:
        return (
          <Slider {...settings}>
            {trendingMoviesList.map(eachMovie => (
              <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
            ))}
          </Slider>
        )
      case apiConstants.inProgress:
        return this.getLoadingView()
      case apiConstants.failure:
        return this.getTrendingErrorView()
      default:
        return null
    }
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    const {homePageMovie, dataFetched} = this.state

    // console.log(homePageMovie)

    // recentMovies extraction from localStorage

    const recentMoviesString = localStorage.getItem('recentMovies')
    const recentMovies = JSON.parse(recentMoviesString)
    console.log(recentMovies)

    const ImageUrl = dataFetched ? `url(${homePageMovie.backdropPath})` : ''

    const bgOrLinearGrad = dataFetched
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.246875) 28.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%)`
      : ''

    return (
      <div className="home-page-container">
        <div
          className="home-page-top-container"
          style={{
            backgroundImage: `${bgOrLinearGrad}, ${ImageUrl}`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          {this.getTopContainerView()}
          {/* <div className="top-container-bottom-blur-container">
              transparent
            </div> */}
        </div>

        <div className="home-page-bottom-container">
          <div className="trending-movies-container">
            <h1 className="trending-now-movies-heading">Trending Now</h1>

            {this.trendingMoviesView()}
          </div>
          <div className="originals-movies-container">
            <h1 className="originals-heading">Originals</h1>

            {this.originalsView()}
          </div>
          {recentMovies !== null && (
            <div className="recent-movies-container">
              <h1 className="recent-movies-heading">Recent Movies</h1>
              <ul className="all-recent-movies-container">
                {recentMovies.map(eachMovie => (
                  <RecentMovieItem
                    movieDetails={eachMovie}
                    key={eachMovie.id}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
