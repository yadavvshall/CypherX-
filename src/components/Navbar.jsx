
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

const NavBar = ({ onGroupingChange, onOrderingChange, onThemeSwitch }) => {
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);

  const handleSwitchTheme = () => {
    document.documentElement.classList.toggle("dark-theme");
    onThemeSwitch();
  };
  

  const handleDisplayClick = () => {
    setDisplayDropdownOpen(!displayDropdownOpen);
  };

  return (
    <nav className="bg-white-2000 text-black p-4 flex justify-between items-center">
     
      <div className="flex items-center">
        <div className="switch-icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"
            ></path>
          </svg>
        </div>
        <div className="dropdown-icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
          </svg>
        </div>
        <button className="ml-2" onClick={handleDisplayClick}>
          Display
        </button>
      </div>

      
      <section className="dropdown-main">
        {displayDropdownOpen && (
          <div className="flex items-center">
            <div className="dropdown-item grouping">
              <span>Grouping</span>
              <select name="grouping" id="grouping" onChange={onGroupingChange}>
                <option value="status">status</option>
                <option value="user">user</option>
                <option value="priority">priority</option>
              </select>
            </div>
            <div className="dropdown-item ordering ml-2">
              <span>Ordering</span>
              <select name="ordering" id="ordering" onChange={onOrderingChange}>
                <option value="priority">priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </section>

      <button
        className="theme-switch"
        type="button"
        onClick={handleSwitchTheme}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"></path>
        </svg>
      </button>
    </nav>
  );
};

NavBar.propTypes = {
  onGroupingChange: PropTypes.func.isRequired,
  onOrderingChange: PropTypes.func.isRequired,
  onThemeSwitch: PropTypes.func.isRequired,
};

export default NavBar;
