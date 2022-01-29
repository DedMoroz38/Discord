import React from "react";
import './components.css';
import { Link } from 'react-router-dom';
import discordLogo from '../images/discord-logo2.png';


const Header = () => {
    return (
        <div className="header">
            <div className="header-box">
                <p>Discord</p>
                {/* <Link to='login' className="profile-button" /> */}
            </div>
        </div>
    )
}
export default Header;