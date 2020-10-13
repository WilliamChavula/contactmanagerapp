import React from 'react';
import { Link } from 'react-router-dom';
import PageErrorImage from '../images/pagenotfound.png';

function PageNotFound() {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <img src={PageErrorImage} alt="PageErrorImage" className="img-thumbnail card-img-top" />
                <div className="card-body">
                    <h3 className="card-title">
                        Page not found
                    </h3>
                    <p className="card-text">
                        Looks like you stumbled onto a wrong path. <Link to="/" className="card-link">Get me Home!</Link>
                    </p>
                </div>
                
            </div>
            
        </div>
    )
}

export default PageNotFound;
