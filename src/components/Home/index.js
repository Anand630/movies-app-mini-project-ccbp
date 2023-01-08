import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieItem from '../MovieItem'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {trendingMoviesList: [], originalsMoviesList: []}

  componentDidMount() {
    this.getTrendingNowMoviesList()
    this.getOriginalsMoviesList()
  }

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
    console.log(response)
    console.log(data)
    this.setState({trendingMoviesList: data})
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
    this.setState({originalsMoviesList: data})
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
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
          <h3>Trending Now</h3>
          <Slider {...settings}>
            {trendingMoviesList.map(eachMovie => (
              <MovieItem movieDetails={eachMovie} />
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}

export default Home
