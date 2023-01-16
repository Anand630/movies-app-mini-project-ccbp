import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <h1 className="not-found-page-heading">Lost Your Way ?</h1>

    <p className="description-line-one">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="go-to-home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
