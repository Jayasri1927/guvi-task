import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; // ✅ Import Footer
import EverythingCard from "./components/EverythingCard";
import TopHeadlines from "./components/TopHeadlines";
import Favorites from "./components/Favorites";
import ReadLater from "./components/ReadLater";
import Login from "./components/Login";
import Register from "./components/Register";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ReadLaterProvider } from "./context/ReadLaterContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === true);
    
  }, []);

  return (
    <FavoritesProvider>
      <ReadLaterProvider>
        <Router>
          <div className="flex flex-col min-h-screen"> {/* ✅ Ensures Footer stays at the bottom */}
            {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />} {/* Show Header only after login */}

            <div className="flex-grow"> {/* ✅ Allows content to expand while keeping Footer at the bottom */}
              <Routes>
                {!isAuthenticated ? (
                  <>
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace/>} />
                  </>
                ) : (
                  <>
                    <Route path="/all-news" element={<TopHeadlines />} />
                    <Route path="/everything" element={<EverythingCard />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/read-later" element={<ReadLater />} />
                    <Route path="*" element={<Navigate to="/all-news" replace/>} /> {/* Redirect to all-news after login */}
                  </>
                )}
              </Routes>
            </div>

            <Footer /> {/* ✅ Footer added */}
          </div>
        </Router>
      </ReadLaterProvider>
    </FavoritesProvider>
  );
}

export default App;
