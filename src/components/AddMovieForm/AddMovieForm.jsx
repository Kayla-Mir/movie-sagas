import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import swal from 'sweetalert';

function AddMovieForm() {
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = () => {
        dispatch({
            type: 'FETCH_CATEGORIES'
        })
    }

    const [movieTitle, setMovieTitle] = useState('');
    const [movieUrl, setMovieUrl] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

    const handleSave = () => {
        const newMovie = {
            title: movieTitle,
            poster: movieUrl,
            description: movieDescription,
            genre_id: movieGenre
        }
        console.log('new movie', newMovie);
        if (
            movieTitle === '' ||
            movieUrl === '' ||
            movieGenre === '' ||
            movieDescription === ''
        ) {
            swal({
                title: "Alert!",
                text: "Please fill in the required fields!",
                icon: "warning",
            });
        } else {
            dispatch({
                type: 'ADD_MOVIE',
                payload: newMovie
            })
            history.push('/');
        }
    }

    return (
        <div>
            <h2>Add A Movie</h2>
            <input
                id="titleInput"
                type="text"
                value={movieTitle}
                onChange={(event) => setMovieTitle(event.target.value)}
                placeholder="Movie Title"
            />
            <input
                id="urlInput"
                type="text"
                value={movieUrl}
                onChange={(event) => setMovieUrl(event.target.value)}
                placeholder="Movie Poster URL"
            />
            <textarea
                value={movieDescription}
                onChange={(event) => setMovieDescription(event.target.value)}
                placeholder="Description"
                cols="30"
                rows="6"
            />
            <select
                id="dropdown"
                value={movieGenre}
                onChange={(event) => setMovieGenre(event.target.value)}>
                <option value="" defaultValue disabled >
                    Pick a Category!
                </option>
                {genres.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
            <button id="saveButton" onClick={handleSave}>Save Movie</button>
            <button id="cancelButton" onClick={() => history.push('/')}>Cancel</button>
        </div>
    )
}

export default AddMovieForm;