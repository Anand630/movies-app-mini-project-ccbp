import Header from '../Header'

import './index.css'

const SearchRoute = props => {
  const {a} = props
  return (
    <div className="search-route-main-container">
      <Header {...{viewSearchBar: true}} />
      <div className="search-route-bottom-container">
        <h1>Under Construction</h1>
      </div>
    </div>
  )
}

export default SearchRoute
