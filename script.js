document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  async function fetchNews() {
    try {
      const response = await fetch('https://news-proxy.shiulierick.workers.dev'); // ✅ your actual Worker endpoint
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        newsContainer.innerHTML = ''; // Clear existing news

        data.results.slice(0, 10).forEach(article => {
          const articleDiv = document.createElement('article');

          articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p><strong>${article.pubDate}</strong></p>
            <p>${article.description || ''}</p>
            <a href="${article.link}" target="_blank">Read more</a>
            <hr/>
          `;

          newsContainer.appendChild(articleDiv);
        });
      } else {
        newsContainer.innerHTML = "<p>No news found.</p>";
      }
    } catch (err) {
      console.error(err);
      newsContainer.innerHTML = "<p>Error loading news.</p>";
    }
  }

  fetchNews();

  // Auto-refresh every 5 minutes (optional)
  setInterval(fetchNews, 5 * 60 * 1000);
});
