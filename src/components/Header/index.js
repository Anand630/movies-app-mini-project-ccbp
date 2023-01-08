import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <nav className="header-nav-bar">
    <div className="nav-items-container">
      <img
        className="header-movies-logo"
        src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1672990957/Netflix%20Clone%20App/Login/login_movies_logo_ngzlug.png"
        alt="website logo"
      />
      <div className="menu-options-and-search-avatar-container">
        <ul className="menu-options-container">
          <li className="menu-option">Home</li>
          <li className="menu-option">Popular</li>
        </ul>
        <div className="search-avatar-container">
          <HiOutlineSearch className="search-icon" />
          <div className="profile-container">
            <img
              alt="profile"
              className="header-avatar"
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
