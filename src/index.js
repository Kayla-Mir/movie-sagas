import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_CATEGORIES', fetchAllCategories);
    yield takeEvery('GET_DETAILS', fetchMovieDetails);
    yield takeEvery('GET_CATEGORIES', fetchMovieCategories);
    yield takeEvery('ADD_MOVIE', addNewMovie);
}

// stores a specific movie for details page
const detailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// stores a specific genres for details page
const categoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_CATEGORY':
            return action.payload;
        default:
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// get specific movie by id
    // stores in the detailsReducer
function* fetchMovieDetails(action) {
    const movieId = action.payload;
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/movie/${movieId}`
        })
        yield put({
            type: 'STORE_DETAILS',
            payload: response.data
        })

    } catch (err) {
        console.error('GET movies by movie id', err);
    }
}

// get specific movie genres by id from db
    // stores in the categoryReducer
function* fetchMovieCategories(action) {
    const movieId = action.payload;
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/genre/${movieId}`
        })
        yield put({
            type: 'STORE_CATEGORY',
            payload: response.data
        })
    } catch (err) {
        console.error('GET categories by movie id', err);
    }
}

// get all movies from the DB
    // stores in movies reducer
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

// get all categories from the DB
    // stores in genres reducer
function* fetchAllCategories() {
    try {
        const movies = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

// sends a POST request with new movie data
    // calls the fetchAllMovies function
function* addNewMovie(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/movie',
            data: action.payload
        })
        yield put({
            type: 'FETCH_MOVIES'
        })
    } catch {
        console.log('addNewMovie error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        detailsReducer,
        categoryReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
