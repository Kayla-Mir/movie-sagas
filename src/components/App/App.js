import { HashRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <h1>The Movies Saga!</h1>
          {/* links to the specific components */}
          <Link to="/" style={{ textDecoration: 'none', paddingRight: 12 }}>Home</Link>|
          <Link to="/addMovie" style={{ textDecoration: 'none', paddingLeft: 12 }}>Add Movie</Link>
        </header>
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route exact path="/details/:id">
          <DetailsPage />
        </Route>
        <Route exact path="/addMovie">
          <AddMovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
