import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
