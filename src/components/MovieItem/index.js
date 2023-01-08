import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id} = movieDetails
  return (
    <div className="slick-item" key={id}>
      {/* <img className="movie-image" src={company_logo_url} alt="company logo" /> */}
      a
    </div>
  )
}

export default MovieItem
