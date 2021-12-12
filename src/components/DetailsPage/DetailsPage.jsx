import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function DetailsPage() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    // calling the reducers that are holding one specific movie/category
    const details = useSelector(store => store.detailsReducer);
    const category = useSelector(store => store.categoryReducer);

    useEffect(() => {
        handleRefresh()
    })

    // using params to be able to refresh the page and
    // not set everything on fire
        // sends two get requests for movie details and the categories
    const handleRefresh = () => {
        if (details.length === 0) {
            dispatch({
                type: 'GET_DETAILS',
                payload: params.id
            }),
            dispatch({
                type: 'GET_CATEGORIES',
                payload: params.id
            })
        }
    }

    return (
        <div>
            {/* null check for if details hasn't been populated with data yet */}
            {details.length != 0 ?
                <>
                    <h3>{details[0].title}</h3>
                    <img className="posterImage" src={details[0].poster} alt={details[0].title} />
                    <h4 className="genreTitle">Genres:</h4>
                    {category.map((item, i) => {
                        return <p className="genres" key={i}>{item.name}</p>
                    })}
                    <p className="descriptionBox">{details[0].description}</p>
                    <Button
                        id="backHomeButton"
                        onClick={() => history.push('/')} 
                        variant="contained"
                    >
                        Back To List
                    </Button>
                </>
                :
                <></>
            }
        </div>
    )
}

export default DetailsPage;