import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SearchRoute from './components/SearchRoute'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import RequiredDataContext from './context/RequiredDataContext'
import './App.css'

class App extends Component {
  state = {activeTabId: 'Home'}

  changeActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  render() {
    const {activeTabId} = this.state
    return (
      <RequiredDataContext.Provider
        value={{
          activeTabId,
          changeActiveTabId: this.changeActiveTabId,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </RequiredDataContext.Provider>
    )
  }
}

export default App
