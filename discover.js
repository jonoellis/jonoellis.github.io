document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';

    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            const renderResults = (query) => {
                const results = data.filter(item => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
                searchResults.innerHTML = results.map(item => `
                    <li>
                        <a href="${item.url}">
                            <h2>${item.title}</h2>
                            <p>${item.content}</p>
                        </a>
                    </li>
                `).join('');
            };

            searchInput.value = initialQuery;
            renderResults(initialQuery.toLowerCase());

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                renderResults(query);
            });
        })
        .catch(error => console.error('Error fetching index.json:', error));
});
