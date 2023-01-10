// import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const navigateToHome = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="not-found-page-container">
      <h1 className="not-found-page-heading">Lost Your Way ?</h1>
      <div className="not-found-description-container">
        <p className="description-line-one">
          we are sorry the page you requested could not be found
        </p>
        <p className="description-line-two">Please go back to the homepage.</p>
      </div>
      <button
        onClick={navigateToHome}
        type="button"
        className="go-to-home-button"
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
