import {Link} from 'react-router-dom'
import './index.css'

const RecentMovieItem = props => {
  const {movieDetails} = props
  const {id, moviePoster} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <img
        testid="movieItem"
        className="recent-movie-image"
        src={moviePoster}
        alt="recent movie"
      />
    </Link>
  )
}

export default RecentMovieItem
