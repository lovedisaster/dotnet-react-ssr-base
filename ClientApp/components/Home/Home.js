import React from 'react';
import PropTypes from 'prop-types';

const Home = props => {
    return (
        <div className="container">
            This is home! 
            <ul>
                <li>This is SSR Test</li>
            </ul>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;