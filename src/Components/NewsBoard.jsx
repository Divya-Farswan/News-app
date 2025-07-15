import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import Pagination from "./Pagination";

const NewsBoard = ({ category, query }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);

    const fetchNews = async () => {
      try {
        if (!category) {
          setError("Please select a category to load news.");
          setLoading(false);
          setHasFetched(true);
          return;
        }

        setError(null);
        const trimmedQuery = query?.trim(); // trim spaces
        let url = `/.netlify/functions/getNews?category=${category}`;
        if (trimmedQuery) {
          url += `&q=${trimmedQuery}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let fetchedArticles = data?.articles ?? [];

        // Manually filter articles by keyword if needed
        if (trimmedQuery) {
          const lowerQuery = trimmedQuery.toLowerCase();
          fetchedArticles = fetchedArticles.filter(article =>
            article.title?.toLowerCase().includes(lowerQuery) ||
            article.description?.toLowerCase().includes(lowerQuery)
          );
        }

        console.log("API URL:", url);
        console.log("Filtered Titles:", fetchedArticles.map(a => a.title));

        setArticles(fetchedArticles);
        setCurrentPage(1);

      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [category, query]);

  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div className="container-fluid px-5 custom-color">
      <h2 className="text-center d-flex justify-content-center align-items-center no-blink-cursor">
        <span className="me-2 mt-4 fs-2 text-dark">Latest</span>
        <span className="badge bg-danger mt-4 fs-3 p-2.5">News</span>
      </h2>

      {hasFetched && (
        <div className="text-center my-2">
          <h5 className="text-muted">
            {query?.trim()
              ? <>Showing results for <span className="text-primary fw-semibold">"{query.trim()}"</span></>
              : <>Showing top headlines for <span className="text-success fw-semibold text-capitalize">"{category || 'general'}"</span></>}
          </h5>
        </div>
      )}

      {
        loading
          ? <Loader />
          : error
            ? <p className="text-danger text-center">{error}</p>
            : currentArticles.length > 0
              ? (
                <>
                  <div className="row bg-dark text-white mt-3 p-3" style={{ border: "1px solid #6c757d", borderRadius: "6px" }}>
                    {
                      currentArticles.map((news, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 pt-3">
                          <NewsItem title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
                        </div>
                      ))
                    }
                  </div>

                  <div className="mt-4">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                </>
              )
              : (
                hasFetched && <p className="text-center mt-4">No news available.</p>
              )
      }
    </div>
  );
};

export default NewsBoard;
