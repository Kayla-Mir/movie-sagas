import {HashRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Link to="/">Home</Link> | 
        <Link to="/addMovie">Add Movie</Link>
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
