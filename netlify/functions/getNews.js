import fetch from 'node-fetch';

export async function handler(event) {
  const API_KEY = process.env.NEWS_API_KEY;

  const { category, query } = event.queryStringParameters;
  

  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  if (query) {
    url += `&q=${query}`;
  }

  console.log("Category:", category);
  console.log("Query:", query);
  console.log("Final constructed URL:", url);

  
  console.log(" Using API KEY:", process.env.NEWS_API_KEY);
  console.log(" Using API KEY:", API_KEY);
  console.log(" Final URL:", url);


  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NewsApp/1.0',       // Required for APIs rejecting default requests
        'Accept': 'application/json'       // Optional but good
      }
    });
    const data = await response.json();
    console.log(" NewsAPI response body:", data); // 👈 ADD THIS LINE

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
}
