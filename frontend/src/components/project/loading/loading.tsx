import React from 'react';
import './loading.css';

const loading = ({ height = '50px', width = '50px' }) => {
    return (
        <div>
            <span className="loading" style={{ height, width }}></span>
        </div>
    );
};

export default loading;
