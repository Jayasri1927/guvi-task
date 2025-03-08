import React, { createContext, useContext, useState, useEffect } from "react";

// Create ReadLaterContext
const ReadLaterContext = createContext();

// Provide ReadLaterContext
export const ReadLaterProvider = ({ children }) => {
    const [readLater, setReadLater] = useState(() => {
        // Load saved articles from localStorage
        const saved = localStorage.getItem("readLater");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("readLater", JSON.stringify(readLater));
    }, [readLater]);

    // Add an article to Read Later
    const addToReadLater = (article) => {
        if (readLater.some((item) => item.url === article.url)) {
            alert("This article is already saved!");
            return;
        }
        setReadLater([...readLater, article]);
        alert("Saved to Read Later! ✅");
    };

    // Remove an article from Read Later
    const removeFromReadLater = (url) => {
        setReadLater(readLater.filter((item) => item.url !== url));
        alert("Removed from Read Later ❌");
    };

    return (
        <ReadLaterContext.Provider value={{ readLater, addToReadLater, removeFromReadLater }}>
            {children}
        </ReadLaterContext.Provider>
    );
};

// Custom hook to use ReadLaterContext
export const useReadLater = () => {
    return useContext(ReadLaterContext);
};
