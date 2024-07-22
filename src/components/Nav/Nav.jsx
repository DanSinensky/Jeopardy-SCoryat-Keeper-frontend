import './Nav.css';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';

const authenticatedOptions = (
    <>
        <NavLink className="link" to="/favorites">Favorites</NavLink>
        <NavLink className="link" to="/sign-out">Sign Out</NavLink>
    </>
);

const unauthenticatedOptions = (
    <>
        <NavLink className="link" to="/sign-up">Sign Up</NavLink>
        <NavLink className="link" to="/sign-in">Sign In</NavLink>
    </>
);

const alwaysOptions = (
    <>
        <NavLink className="link" to="/calendar">Calendar</NavLink>
    </>
);

const Nav = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="nav">
                <NavLink className="custom-hv" to="/">SCoryat Keeper</NavLink>
                <div className="links">
                    {user && <div className="link welcome">Welcome, {user.username}</div>}
                    {alwaysOptions}
                    {user ? authenticatedOptions : unauthenticatedOptions}
                </div>
                <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`dropdown ${menuOpen ? 'active' : ''}`}>
                    {alwaysOptions}
                    {user ? authenticatedOptions : unauthenticatedOptions}
                </div>
            </div>
        </nav>
    );
};

export default Nav;