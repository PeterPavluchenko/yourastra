import "./header.styles.scss";
import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Logo } from "../../assets/logo_v3.svg";
import { ReactComponent as MenuLines } from "../../assets/menu-lines.svg";
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); 

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false); 
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]); 

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Logo className="logo-svg" />
        <h1>YourAstra</h1>
      </div>
      <div className="menu-container">
        <div className="menu-icon" onClick={toggleDropdown}>
          {!dropdownVisible && <MenuLines />}
        </div>
        {dropdownVisible && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <ul>
              <li>
                <Link to="/auth" onClick={() => setDropdownVisible(false)}>
                  Authentication
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => setDropdownVisible(false)}>
                  Universe
                </Link>
              </li>
              <li>
                <Link to="/life-in-years" onClick={() => setDropdownVisible(false)}>
                  My Years
                </Link>
              </li>
              <li>
                <Link to="/life-in-months" onClick={() => setDropdownVisible(false)}>
                  My Months
                </Link>
              </li>
              <li>
                <Link to="/life-in-weeks" onClick={() => setDropdownVisible(false)}>
                  My Weeks
                </Link>
              </li>
              <li>
                <Link to="/life-in-days" onClick={() => setDropdownVisible(false)}>
                  My Days
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;