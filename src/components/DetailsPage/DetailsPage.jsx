import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';

function DetailsPage() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        handleRefresh()
    })

    // using params to be able to refresh the page and
    // not set everything on fire
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

    const details = useSelector(store => store.detailsReducer);
    const category = useSelector(store => store.categoryReducer);
    console.log('category', category);
    console.log('details', details);

    return (
        <div>
            {details.length != 0 ?
                <>
                    <h3>{details[0].title}</h3>
                    <img className="posterImage" src={details[0].poster} alt={details[0].title} />
                    <h4 className="genreTitle">Genres:</h4>
                    {category.map((item, i) => {
                        return <p className="genres" key={i}>{item.name}</p>
                    })}
                    <p className="descriptionBox">{details[0].description}</p>
                    <button onClick={() => history.push('/')}>Back To List</button>
                </>
                :
                <></>
            }
        </div>
    )
}

export default DetailsPage;