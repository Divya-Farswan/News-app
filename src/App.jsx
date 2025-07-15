import { useState } from "react";
import Navbar from "./Components/Navbar";
import NewsBoard from "./Components/NewsBoard";
import Footer from "./Components/Footer";

const App = () => {
  const [category, setCategory] = useState("general")
  const [query, setQuery] = useState("");

  // When a category is selected
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuery(""); // Clear search query when category changes
  };

  return (
    <>
      <Navbar setCategory={setCategory} setQuery={setQuery} />
      <main className="main-content">
        <NewsBoard category={category} query={query} />
      </main>
      <Footer />
    </>
  );
};

export default App;
