import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../App/App.css";

function MovieItem({ movie }) {
    const history = useHistory();
    const dispatch = useDispatch();

    // clicking a movie div will send two dispatches specific movie data
        // pushes to details page for that movie with params
    const goToDetails = () => {
        dispatch({
            type: 'GET_DETAILS',
            payload: movie.id
        }),
        dispatch({
            type: 'GET_CATEGORIES',
            payload: movie.id
        }),
        history.push(`/details/${movie.id}`);
    }

    return (
        <div className="posterDiv">
            <div onClick={goToDetails}>
                <h3 className="movieTitle">{movie.title}</h3>
                <img className="posterImage" src={movie.poster} alt={movie.title} />
            </div>
        </div>
    )
}

export default MovieItem;