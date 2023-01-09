import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
import {FiSearch} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  state = {displayHamburgerMenu: false, isSearchBarActive: false}

  collapseHamburgerMenu = () => {
    this.setState({displayHamburgerMenu: false})
  }

  toggleHamburgerMenuDisplay = () => {
    this.setState(prevState => ({
      displayHamburgerMenu: !prevState.displayHamburgerMenu,
    }))
  }

  togglingSearchBarDisplayResult = () => {
    const {isSearchBarActive} = this.state
    if (!isSearchBarActive) {
      return (
        <div className="search-bar-icon-container">
          <input type="search" className="search-input" />
          <div className="search-button-container">
            <button
              className="search-icon-button-beside-search-bar"
              type="button"
            >
              <FiSearch className="search-icon-beside-search-bar" />
            </button>
          </div>
        </div>
      )
    }
    return <HiOutlineSearch className="search-icon-alone" />
  }

  render() {
    const {displayHamburgerMenu} = this.state
    return (
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
              {this.togglingSearchBarDisplayResult()}
              <div className="profile-container">
                <img
                  alt="profile"
                  className="header-avatar"
                  src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
                />
              </div>
              <button
                onClick={this.toggleHamburgerMenuDisplay}
                type="button"
                className="hamburger-button"
              >
                <GiHamburgerMenu className="hamburger-icon" />
              </button>
            </div>
          </div>
        </div>
        {displayHamburgerMenu && (
          <ul className="menu-items-list-mobile-view-container">
            <li className="menu-option-mobile">Home</li>
            <li className="menu-option-mobile">Popular</li>
            <li className="menu-option-mobile">Account</li>
            <li className="close-menu-option">
              <button
                onClick={this.collapseHamburgerMenu}
                className="close-button"
                type="button"
              >
                <RiCloseFill color="#ffffff" size={24} />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default Header
