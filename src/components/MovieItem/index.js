import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <img
        testid="movieItem"
        className="movie-image"
        src={posterPath}
        alt={title}
      />
    </Link>
  )
}

export default MovieItem
