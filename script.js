export default {
  async fetch(request) {
    const url = new URL(request.url);
    const apiKey = 'pub_e4730d9e76cb435c9e121d40ca635e11';

    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=sports&language=en&country=ke`;

    try {
      const response = await fetch("https://news-proxy.<shiulierick>.workers.dev");
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch news.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }
};
