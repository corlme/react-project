import React from 'react'


import Home from './components/Home'
import Login from './components/Login'

import {BrowserRouter , Switch, Route, Redirect} from 'react-router-dom'


class App extends React.Component {
  render () {
    return (
     <BrowserRouter>
        <Switch>
          <Redirect exact path='/' to='/home' />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
        </Switch>
     </BrowserRouter>
    )
  }
}

export default App