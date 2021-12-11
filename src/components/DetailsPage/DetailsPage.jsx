import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';

function DetailsPage() {
    const history = useHistory();

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
                <p>{details[0].description}</p>
                <button onClick={() => history.push('/')}>Back To List</button>
            </>
            :
            <></>    
            }
        </div>
    )
}

export default DetailsPage;