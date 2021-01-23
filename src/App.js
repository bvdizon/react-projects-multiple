import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import People from './components/People';
import Error from './components/Error';
import Person from './components/Person';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />

        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/people'>
            <People />
          </Route>

          {/* Dynamic Routing */}
          <Route path='/person/:id' children={<Person />}></Route>

          {/* Error 404 Page */}
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
