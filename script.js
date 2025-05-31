
const topButton = document.getElementById("topBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

async function fetchNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "<p>Loading news...</p>";

  try {
    const response = await fetch("https://news-proxy.shulierick.workers.dev/");
    const result = await response.json();

    if (result.status === "success" && result.results && result.results.length > 0) {
      container.innerHTML = "";
      result.results.forEach(article => {
        const newsItem = document.createElement("article");
        newsItem.innerHTML = `
          ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}">` : ""}
          <h2>${article.title}</h2>
          <p><strong>${new Date(article.pubDate).toLocaleDateString()}</strong> - ${article.description || "No description available."}</p>
        `;
        container.appendChild(newsItem);
      });
    } else {
      container.innerHTML = "<p>No news found.</p>";
    }
  } catch (error) {
    container.innerHTML = "<p>Error loading news.</p>";
    console.error("Error fetching news:", error);
  }
}

fetchNews();
