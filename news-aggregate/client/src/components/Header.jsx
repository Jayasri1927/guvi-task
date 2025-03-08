import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import countries from "./countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

function Header({ setIsAuthenticated }) {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light-theme");

  const categoryDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const navigate = useNavigate();

  function toggleTheme() {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light-theme";
    setTheme(savedTheme);
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(savedTheme);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around p-4">
        <h3 className="text-white font-bold text-2xl">News Aggregator</h3>

        <ul className="flex gap-8 justify-end">
          <li>
            <Link className="no-underline text-white font-semibold" to="/">
              All News
            </Link>
          </li>

          {/* Top Headlines Dropdown */}
          <li className="relative" ref={categoryDropdownRef}>
            <button
              className="text-white font-semibold flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown((prev) => !prev);
                setShowCountryDropdown(false); // Close other dropdown
              }}
            >
              Top Headlines <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>

            {showCategoryDropdown && (
              <ul className="absolute bg-white shadow-lg p-2 w-40">
                {["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"].map(
                  (category, index) => (
                    <li key={index}>
                      <Link
                        to={`/top-headlines/${category}`}
                        className="block px-4 py-2 capitalize text-black hover:bg-gray-200"
                        onClick={() => setShowCategoryDropdown(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>

          {/* Country Dropdown */}
          <li className="relative" ref={countryDropdownRef}>
            <button
              className="text-white font-semibold flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowCountryDropdown((prev) => !prev);
                setShowCategoryDropdown(false); // Close other dropdown
              }}
            >
              Country <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>

            {showCountryDropdown && (
              <ul className="absolute bg-white shadow-lg p-2 w-40 max-h-60 overflow-y-auto">
                {countries.map((country, index) => (
                  <li key={index}>
                    <Link
                      to={`/country/${country?.iso_2_alpha}`}
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => setShowCountryDropdown(false)}
                    >
                      <img
                        src={`https://flagcdn.com/32x24/${country?.iso_2_alpha}.png`}
                        alt={country?.countryName}
                        className="w-6 h-4 mr-2"
                      />
                      {country?.countryName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Favorites, Read Later */}
          <li>
            <Link className="no-underline font-semibold text-white" to="/favorites">
              Favorites
            </Link>
          </li>

          <li>
            <Link className="no-underline font-semibold text-white" to="/read-later">
              Read Later
            </Link>
          </li>

          {/* Theme Toggle */}
          <li>
            <button onClick={toggleTheme} className="text-white font-semibold flex items-center gap-2">
              {theme === "light-theme" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </li>

          {/* Logout Button */}
          <li>
            <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
