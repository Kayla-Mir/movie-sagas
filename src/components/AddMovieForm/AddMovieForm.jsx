import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import swal from 'sweetalert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function AddMovieForm() {
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const history = useHistory();

    // on page load populating the genres reducer for use in the dropdown
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

    // assigns the pieces of state from above to a newMovie object to send to the DB
        // checks if any of the values are empty, sends an alert if yes
        // pushes back to movie list page
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
    
    // see line 145 below about img 404

    // using MUI styling, look up if confused
    return (
        <>
            <div className="addMovieDiv">
                <h2>Add A Movie</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        variant="standard"
                        id="titleInput"
                        type="text"
                        value={movieTitle}
                        onChange={(event) => setMovieTitle(event.target.value)}
                        label="Movie Title"
                    />
                    <TextField
                        variant="standard"
                        id="urlInput"
                        type="text"
                        value={movieUrl}
                        onChange={(event) => setMovieUrl(event.target.value)}
                        label="Movie Poster URL"
                    />
                </Box>
                <div>
                    <TextField
                        id="textField"
                        label="Description"
                        multiline
                        rows={4}
                        value={movieDescription}
                        onChange={(event) => setMovieDescription(event.target.value)}
                    />
                </div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="dropdown">Category</InputLabel>
                    <Select
                        labelId="dropdown"
                        id="dropdown"
                        value={movieGenre}
                        label="Category"
                        onChange={(event) => setMovieGenre(event.target.value)}
                    >
                        {genres.map((item) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Button
                    id="saveButton"
                    onClick={handleSave}
                    variant="contained"
                >
                    Save Movie
                </Button>
                <Button
                    id="cancelButton"
                    onClick={() => history.push('/')}
                    variant="contained"
                >
                    Cancel
                </Button>

            </div>
            <div>
                <h2>Preview</h2>
                <h3>{movieTitle}</h3>
                <p className="genres">
                    Genre: {genres.filter(genre => genre.id == movieGenre)[0]?.name}
                </p>
                {/*this img element will 404 while typing a link until the link is complete
                shouldn't affect anything */}
                <img className="posterImage" src={movieUrl} alt={movieTitle} /> 
                <p className="descriptionBox">{movieDescription}</p>
            </div>
        </>
    )
}

export default AddMovieForm;