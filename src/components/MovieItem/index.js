import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, backdropPath, overview, posterPath, title} = movieDetails
  return <img className="movie-image" src={backdropPath} alt={title} />
}

export default MovieItem
