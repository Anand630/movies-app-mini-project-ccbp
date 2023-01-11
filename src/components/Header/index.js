import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'

import './index.css'

class Header extends Component {
  state = {displayHamburgerMenu: false, isSearchBarActive: false}

  componentDidMount() {
    const {viewSearchBar} = this.props
    if (viewSearchBar) {
      console.log(viewSearchBar)
      this.setState({isSearchBarActive: viewSearchBar})
    }
  }

  collapseHamburgerMenu = () => {
    this.setState({displayHamburgerMenu: false})
  }

  toggleHamburgerMenuDisplay = () => {
    this.setState(prevState => ({
      displayHamburgerMenu: !prevState.displayHamburgerMenu,
    }))
  }

  navigateToSearchRoute = () => {
    const {history} = this.props
    history.push('/search')
  }

  togglingSearchBarDisplayResult = () => {
    const {isSearchBarActive} = this.state
    if (isSearchBarActive) {
      return (
        <div className="search-bar-icon-container">
          <input placeholder="Search" type="search" className="search-input" />
          <div className="search-button-container">
            <button className="search-icon-button" type="button">
              <HiOutlineSearch className="search-icon-alone" />
            </button>
          </div>
        </div>
      )
    }
    return (
      <button
        onClick={this.navigateToSearchRoute}
        className="search-icon-button"
        type="button"
      >
        <HiOutlineSearch className="search-icon-alone" />
      </button>
    )
  }

  render() {
    const {displayHamburgerMenu} = this.state
    return (
      <nav className="header-nav-bar">
        <div className="nav-items-container">
          <Link className="logo-nav-link" to="/">
            <img
              className="header-movies-logo"
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1672990957/Netflix%20Clone%20App/Login/login_movies_logo_ngzlug.png"
              alt="website logo"
            />
          </Link>
          <div className="menu-options-and-search-avatar-container">
            <ul className="menu-options-container">
              <li className="menu-option">
                <Link className="menu-option-nav-link-item" to="/">
                  Home
                </Link>
              </li>
              <li className="menu-option">
                <Link className="menu-option-nav-link-item" to="/popular">
                  Popular
                </Link>
              </li>
            </ul>
            <div className="search-avatar-container">
              {this.togglingSearchBarDisplayResult()}
              <Link className="profile-nav-link-item" to="/account">
                <div className="profile-container">
                  <img
                    alt="profile"
                    className="header-avatar"
                    src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
                  />
                </div>
              </Link>

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
            <li className="menu-option-mobile">
              <Link className="menu-option-nav-link-item" to="/">
                Home
              </Link>
            </li>
            <li className="menu-option-mobile">
              <Link className="menu-option-nav-link-item" to="/popular">
                Popular
              </Link>
            </li>
            <li className="menu-option-mobile ">
              <Link className="menu-option-nav-link-item" to="/account">
                Account
              </Link>
            </li>
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

export default withRouter(Header)
