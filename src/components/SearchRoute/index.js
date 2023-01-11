import {Component} from 'react'
import Header from '../Header'

import './index.css'

class SearchRoute extends Component {
  render() {
    return (
      <div className="search-route-main-container">
        <Header {...{viewSearchBar: true}} />
        <div className="search-route-bottom-container">
          <h1>Under Construction</h1>
        </div>
      </div>
    )
  }
}

export default SearchRoute
