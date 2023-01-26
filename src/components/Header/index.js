import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
// import RequiredDataContext from '../../context/RequiredDataContext'

import './index.css'

const tabPathConstants = {
  home: '/',
  popular: '/popular',
  account: '/account',
  search: '/search',
}

class Header extends Component {
  state = {
    displayHamburgerMenu: false,

    searchInput: '',
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

  onSearchBtnClick = e => {
    e.preventDefault()
    const {searchInput} = this.state
    const {searchMovies} = this.props
    if (searchInput !== '') {
      searchMovies(searchInput)
    }
  }

  onSearching = () => {
    // e.preventDefault()
    const {searchInput} = this.state
    const {searchMovies} = this.props
    if (searchInput !== '') {
      searchMovies(searchInput)
    }
  }

  onSearchInput = e => {
    this.setState({searchInput: e.target.value}, this.onSearching)
  }

  togglingSearchBarDisplayResult = () => {
    const {searchInput} = this.state
    const {match} = this.props
    const {path} = match

    if (path === tabPathConstants.search) {
      return (
        <form
          onSubmit={this.onSearchBtnClick}
          className="search-bar-icon-container"
        >
          <input
            onChange={this.onSearchInput}
            value={searchInput}
            placeholder="Search"
            type="search"
            className="search-input"
          />
          <div className="search-button-container">
            <button
              testid="searchButton"
              // onClick={this.onSearchBtnClick}
              className="search-icon-button"
              type="submit"
            >
              <HiOutlineSearch className="search-icon-alone" />
            </button>
          </div>
        </form>
      )
    }
    return (
      <button
        testid="searchButton"
        onClick={this.navigateToSearchRoute}
        className="search-icon-button"
        type="button"
      >
        <HiOutlineSearch
          id="searchIcon"
          className="search-icon-alone search-icon-for-hover"
        />
      </button>
    )
  }

  //   updateActiveTabId = e => {
  //     // console.log(`the innerText is -->${e.target.innerText}<--`)
  //     if (e.target.id === tabIdConstants.home) {
  //       changeActiveTabId(e.target.id)
  //     } else {
  //       changeActiveTabId(e.target.innerText)
  //     }
  //   }

  navigateToSearchRoute = () => {
    const {history} = this.props
    history.push('/search')
    // changeActiveTabId(e.target.id)
  }

  render() {
    const {displayHamburgerMenu} = this.state
    const {match} = this.props
    const {path} = match
    // console.log(match)

    const homeClass = path === tabPathConstants.home ? 'active-tab-class' : ''
    const popularClass =
      path === tabPathConstants.popular ? 'active-tab-class' : ''
    const accountClass =
      path === tabPathConstants.account ? 'active-tab-class' : ''
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
              <li className={`menu-option ${homeClass}`}>
                <Link className="menu-option-nav-link-item" to="/">
                  Home
                </Link>
              </li>

              <li className={`menu-option ${popularClass}`}>
                <Link className="menu-option-nav-link-item" to="/popular">
                  Popular
                </Link>
              </li>
            </ul>
            <div className="search-avatar-container">
              {this.togglingSearchBarDisplayResult()}

              <div className="profile-container">
                <Link className="profile-nav-link-item" to="/account">
                  <img
                    alt="profile"
                    className="header-avatar"
                    src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
                  />
                </Link>
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
            <li className={`menu-option-mobile ${homeClass}`}>
              <Link className="menu-option-nav-link-item" to="/">
                Home
              </Link>
            </li>

            <li className={`menu-option-mobile ${popularClass}`}>
              <Link className="menu-option-nav-link-item" to="/popular">
                Popular
              </Link>
            </li>

            <li className={`menu-option-mobile ${accountClass}`}>
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
                <RiCloseFill color="#ffffff" className="close-icon" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
