import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieItem from '../MovieItem'
import './index.css'

// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

class Home extends Component {
  state = {trendingMoviesList: [], originalsMoviesList: []}

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

  getTrendingNowMoviesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const tendingMoviesApiUrl =
      'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(tendingMoviesApiUrl, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    const formattedTrendingMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovieData(eachMovie),
    )
    // console.log(formattedTrendingMoviesList)
    this.setState({trendingMoviesList: formattedTrendingMoviesList})
  }

  getOriginalsMoviesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const originalsMoviesApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalsMoviesApiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    const formattedOriginalsMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovieData(eachMovie),
    )
    console.log(formattedOriginalsMoviesList)
    this.setState({originalsMoviesList: formattedOriginalsMoviesList})
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
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

    const {trendingMoviesList, originalsMoviesList} = this.state

    return (
      <div className="home-page-container">
        <div className="home-page-top-container">
          <Header />
          <div className="top-container-middle-text-container">
            <h1 className="superman-heading">Super Man</h1>
            <p className="superman-description">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
          <div className="top-container-bottom-blur-container">transparent</div>
        </div>

        <div className="home-page-bottom-container">
          <div className="trending-movies-container">
            <h3 className="tending-now-movies-heading">Trending Now</h3>

            <Slider {...settings}>
              {trendingMoviesList.map(eachMovie => (
                <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
          </div>
          <div className="originals-movies-container">
            <h3 className="originals-heading">Originals</h3>

            <Slider {...settings}>
              {originalsMoviesList.map(eachMovie => (
                <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
