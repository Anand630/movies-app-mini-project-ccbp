import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  // console.log(props)

  const logoutFromAccount = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="account-page-main-container">
      <Header />
      <div className="account-details-container">
        <h2 className="account-heading">Account</h2>
        <hr className="horizontal-line" />
        <div className="query-and-response-container">
          <p className="query-heading">Member ship</p>
          <div className="credentials-response-container">
            <p className="profile-name">
              {localStorage.getItem('accountName')}
            </p>
            <p className="profile-password">Password: ********</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="query-and-response-container">
          <p className="query-heading">Plan Details</p>
          <div className="plan-response-container">
            <p className="plan-type-text">Premium</p>
            <p className="plan-type-quality">Ultra HD</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="logout-button-container">
          <button
            onClick={logoutFromAccount}
            className="logout-button"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
