import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Home} />
  </Switch>
)

export default App
