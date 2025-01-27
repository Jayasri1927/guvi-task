import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import BookingForm from '../components/BookingForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route path="/bookings/:movieId" component={BookingForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
