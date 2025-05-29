const apiKey = 'pub_43627d9b09cb41ada3bf570194289fa6';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  try {
    const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&category=sports&language=en`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      newsContainer.innerHTML = '<p>No sports news found.</p>';
      return;
    }

    let html = '';
    data.results.forEach(article => {
      html += `
        <div class="news-item">
          <h3>${article.title}</h3>
          <p><strong>${article.pubDate}</strong> - ${article.description}</p>
          <a href="${article.link}" target="_blank">Read more</a>
        </div>
      `;
    });

    newsContainer.innerHTML = html;
  } catch (error) {
    newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
    console.error(error);
  }
}

fetchNews();
