import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader"; // Importing the Loader component
import Pagination from "./Pagination";

const NewsBoard = ({ category, query }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  // Define the number of items per page (e.g., 8 news items)
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

        let url = `/.netlify/functions/getNews?category=${category}`;
        if (query) {
          url += `&q=${query}`;
        }


        // Perform the API call
        const response = await fetch(url);
        
        // If response status is not OK (200-299), throw an error.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convert response to JSON format.
        const data = await response.json();
        console.log(" API URL:", url);
        console.log(" Fetched Articles:", data?.articles);

        // Update the articles state. Use an empty array if no articles are returned.
        setArticles(data?.articles ?? []);
        setCurrentPage(1);          // Reset to first page on new fetch to avoid page overflow

      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");

      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    // Use a debounce approach: wait 500ms before calling the API to avoid too many requests.
    const timeoutId = setTimeout(() => {
      fetchNews();
    }, 500);

    // Cleanup the timeout if category or query changes within 500ms.
    return () => clearTimeout(timeoutId);
  }, [category, query]);

  // Calculate the articles to show on the current page:
  // 1. Determine the index of the first and last article on the current page.
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Determine total pages for pagination
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div className="container-fluid px-5 custom-color">
      <h2 className="text-center d-flex justify-content-center align-items-center no-blink-cursor">
        <span className="me-2 mt-4 fs-2 text-dark">Latest</span>
        <span className="badge bg-danger mt-4 fs-3 p-2.5">News</span>
      </h2>

      {/* Conditional rendering based on loading, error, and data states */}
      {
        loading
          ? (<Loader />)
          : error
            ? (<p className="text-danger text-center">{error}</p>)
            : currentArticles.length > 0
              ? (
                <>
                  {/* Display current page of news items */}
                  <div className="row bg-dark text-white mt-3 p-3" style={{ border: "1px solid #6c757d", borderRadius: "6px" }} >
                    {
                      currentArticles.map((news, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 pt-3">
                          <NewsItem title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
                        </div>
                      ))
                    }
                  </div>


                  <div className="mt-4">
                    {/* Pagination component is rendered below the news items */}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                </>
              )
              : (

                // If fetching is complete but no articles exist, show a message.
                hasFetched && <p className="text-center mt-4">No news available.</p>
              )
      }

    </div>
  );
};

export default NewsBoard;