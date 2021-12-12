import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
    const [movieDescription, setMovieDescripton] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

    const handleSave = () => {
        const newMovie = {
            title: movieTitle,
            poster: movieUrl,
            description: movieDescription,
            genre_id: movieGenre
        }
        console.log('new movie', newMovie);
        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        })
        history.push('/');
    }

    return (
        <div>
            <h2>Add A Movie</h2>
            <input
                type="text"
                value={movieTitle}
                onChange={(event) => setMovieTitle(event.target.value)}
                placeholder="Movie Title"
            />
            <input
                type="text"
                value={movieUrl}
                onChange={(event) => setMovieUrl(event.target.value)}
                placeholder="Movie Poster URL"
            /><br />
            <textarea 
                value={movieDescription}
                onChange={(event) => setMovieDescripton(event.target.value)}
                placeholder="Description" 
                cols="30" 
                rows="6" 
            /><br/>
            <select
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
            <button onClick={handleSave}>Save Movie</button>
            <button onClick={() => history.push('/')}>Cancel</button>
        </div>
    )
}

export default AddMovieForm;