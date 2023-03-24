import React from "react";
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/* pathname : URL 의미 , state : 우리가 route props에 보내줄 데이터 의미 */}
            {/* <Link to={{ pathname: '/about', state: {fromNavigation: true }}}>About</Link> */}
        </div>
    );
}

export default Navigation;