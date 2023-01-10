import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'
import './index.css'

// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

class Home extends Component {
  state = {trendingMoviesList: [], originalsMoviesList: [], homePageMovie: {}}

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
    const randomIndex = Math.floor(Math.random() * 10)
    console.log(randomIndex)
    return trendingMoviesList[randomIndex]
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
    // console.log(response)
    // console.log(data)
    const formattedTrendingMoviesList = data.results.map(eachMovie =>
      this.getFormattedMovieData(eachMovie),
    )
    console.log(formattedTrendingMoviesList)
    // const homePageMovie = formattedTrendingMoviesList[9]
    const homePageMovie = this.getRandomMovie(formattedTrendingMoviesList)
    this.setState({
      trendingMoviesList: formattedTrendingMoviesList,
      homePageMovie,
    })
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
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,

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

    const {trendingMoviesList, originalsMoviesList, homePageMovie} = this.state

    console.log(homePageMovie)
    // const topContainerElement = document.getElementById('top-container-bg')
    // topContainerElement.backgroundImage = homePageMovie.backdropPath

    return (
      <div className="home-page-container">
        <div
          className="home-page-top-container"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.246875) 28.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%) , url(${homePageMovie.backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          {/* <div className="parent-top-middle-container"> */}
          <div className="top-container-middle-text-container">
            <h1 className="movie-poster-heading">{homePageMovie.title}</h1>
            <p className="movie-poster-description">{homePageMovie.overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
          {/* <div className="top-container-bottom-blur-container">
              transparent
            </div> */}
          {/* </div> */}
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
        <Footer />
      </div>
    )
  }
}

export default Home
