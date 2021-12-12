import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // on movie list page load sends dispatch for all movies
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>Movie List</h1>
            <hr/>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <MovieItem key={movie.id} movie={movie} />
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;