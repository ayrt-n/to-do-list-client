import React from 'react';
import { Link } from 'react-router-dom';
import logoSVG from '../../assets/icons/logo.svg';
import '../../styles/Nav.css'

function Navbar({ currentUser, logOut, toggleSidebar }) {
  return (
    <nav className="Nav">
      { currentUser ?
        <>
          <div className="Nav-start" aria-label="menu">
            <button className="Nav-burger" onClick={toggleSidebar}>
              <span></span><span></span><span></span>
            </button>
          </div>
          <div className="Nav-end">
            <a href="/login" onClick={logOut}>Logout</a>
          </div>
        </> :
        <>
          <div className="Nav-start">
            <Link to="/">
              <img src={logoSVG} className="Nav-logo" alt="" />
            </Link>
          </div>
          <div className="Nav-links Nav-end">
            <Link to="/register" className="Nav-link">Sign up</Link>
            <Link to="/login" className="Nav-link">Login</Link>
          </div>
        </>
      }
    </nav>
  );
}

export default Navbar;
