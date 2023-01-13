import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
import RequiredDataContext from '../../context/RequiredDataContext'

import './index.css'

const tabIdConstants = {
  home: 'Home',
  popular: 'Popular',
  account: 'Account',
}

class Header extends Component {
  state = {
    displayHamburgerMenu: false,
    isSearchBarActive: false,
    searchInput: '',
  }

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

  onSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onSearchBtnClick = () => {
    const {searchInput} = this.state
    const {searchMovies} = this.props
    if (searchInput !== '') {
      searchMovies(searchInput)
    }
  }

  togglingSearchBarDisplayResult = () => {
    const {isSearchBarActive, searchInput} = this.state

    if (isSearchBarActive) {
      return (
        <div className="search-bar-icon-container">
          <input
            onChange={this.onSearchInput}
            value={searchInput}
            placeholder="Search"
            type="search"
            className="search-input"
          />
          <div className="search-button-container">
            <button
              onClick={this.onSearchBtnClick}
              className="search-icon-button"
              type="button"
            >
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
      <RequiredDataContext.Consumer>
        {value => {
          const {activeTabId, changeActiveTabId} = value

          const updateActiveTabId = e => {
            console.log(`the innerText is -->${e.target.innerText}<--`)
            if (e.target.innerText === '') {
              changeActiveTabId(tabIdConstants.account)
            } else {
              changeActiveTabId(e.target.innerText)
            }
          }

          const homeClass =
            activeTabId === tabIdConstants.home ? 'active-tab-class' : ''
          const popularClass =
            activeTabId === tabIdConstants.popular ? 'active-tab-class' : ''
          const accountClass =
            activeTabId === tabIdConstants.account ? 'active-tab-class' : ''
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
                    <Link className="menu-option-nav-link-item" to="/">
                      <li
                        onClick={updateActiveTabId}
                        className={`menu-option ${homeClass}`}
                      >
                        Home
                      </li>
                    </Link>

                    <Link className="menu-option-nav-link-item" to="/popular">
                      <li
                        onClick={updateActiveTabId}
                        className={`menu-option ${popularClass}`}
                      >
                        Popular
                      </li>
                    </Link>
                  </ul>
                  <div className="search-avatar-container">
                    {this.togglingSearchBarDisplayResult()}
                    <Link className="profile-nav-link-item" to="/account">
                      <div className="profile-container">
                        <img
                          onClick={updateActiveTabId}
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
                  <Link className="menu-option-nav-link-item" to="/">
                    <li
                      onClick={updateActiveTabId}
                      className={`menu-option-mobile ${homeClass}`}
                    >
                      Home
                    </li>
                  </Link>

                  <Link className="menu-option-nav-link-item" to="/popular">
                    <li
                      onClick={updateActiveTabId}
                      className={`menu-option-mobile ${popularClass}`}
                    >
                      Popular
                    </li>
                  </Link>

                  <Link className="menu-option-nav-link-item" to="/account">
                    <li
                      onClick={updateActiveTabId}
                      className={`menu-option-mobile ${accountClass}`}
                    >
                      Account
                    </li>
                  </Link>

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
        }}
      </RequiredDataContext.Consumer>
    )
  }
}

export default withRouter(Header)
