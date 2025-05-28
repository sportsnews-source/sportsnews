document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'da657371639f4f5d9d73a54604099822';
  const url = `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=${apiKey}`;

  const container = document.getElementById('news-container');

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    })
    .then(data => {
      if (data.articles.length === 0) {
        container.innerHTML = '<p>No news articles found.</p>';
        return;
      }

      data.articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.style.background = '#fff';
        articleDiv.style.marginBottom = '20px';
        articleDiv.style.padding = '15px';
        articleDiv.style.borderRadius = '8px';
        articleDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

        const img = document.createElement('img');
        img.src = article.urlToImage || 'default.jpg';
        img.alt = article.title;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '5px';
        img.style.marginBottom = '10px';

        const title = document.createElement('h2');
        title.textContent = article.title;

        const desc = document.createElement('p');
        desc.innerHTML = `<strong>${new Date(article.publishedAt).toLocaleDateString()}</strong> - ${article.description || 'No description available.'}`;

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank';
        link.style.display = 'inline-block';
        link.style.marginTop = '10px';
        link.style.color = '#0066cc';

        articleDiv.appendChild(img);
        articleDiv.appendChild(title);
        articleDiv.appendChild(desc);
        articleDiv.appendChild(link);

        container.appendChild(articleDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      container.innerHTML = '<p>Error loading news. Please try again later.</p>';
    });
});
