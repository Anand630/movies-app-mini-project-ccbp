import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, posterPath, title} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <div testid="movieItem">
        <img className="movie-image" src={posterPath} alt={title} />
      </div>
    </Link>
  )
}

export default MovieItem
