import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, backdropPath, overview, posterPath, title} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <img className="movie-image" src={backdropPath} alt={title} />
    </Link>
  )
}

export default MovieItem
