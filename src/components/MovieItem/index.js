import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, posterPath, name} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <img
        testid="movieItem"
        className="movie-image"
        src={posterPath}
        alt={name}
      />
    </Link>
  )
}

export default MovieItem
