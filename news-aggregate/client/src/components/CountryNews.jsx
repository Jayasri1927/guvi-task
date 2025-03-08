import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function CountryNews() {
  const { iso } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:5000/country/${iso}?page=${page}&pageSize=${pageSize}`)
      .then(response => response.json())
      .then(myJson => {
        if (myJson.success && myJson.data.data) {
          setData(myJson.data.data);
        } else {
          setError("An error occurred while fetching country news.");
        }
      })
      .catch(() => setError("Failed to fetch news. Please try again later."))
      .finally(() => setIsLoading(false));
  }, [page, iso]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-5">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((article, index) => (
              <EverythingCard
                key={index}
                title={article.title}
                description={article.description}
                imgUrl={article.image}
                publishedAt={article.published_at}
                url={article.url}
                author={article.author || "Unknown"}
                source={article.source || "Unknown"}
              />
            ))
          ) : (
            <p>No news articles found for this country.</p>
          )
        ) : (
          <Loader />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="flex justify-center gap-4 my-6">
          <button disabled={page <= 1} className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setPage(page - 1)}>Prev</button>
          <span className="font-semibold">Page {page}</span>
          <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
