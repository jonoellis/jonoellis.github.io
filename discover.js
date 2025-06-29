// Inject highlight CSS for <mark> tags
(function addHighlightCSS() {
  const style = document.createElement('style');
  style.textContent = `
    mark.highlighted-search {
      background: #ffe066;
      color: inherit;
      padding: 0;
      border-radius: 2px;
    }
  `;
  document.head.appendChild(style);
})();

// Utility: Escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Highlight all matches of 'term' (case-insensitive) in 'html' string
function highlightTerm(html, term) {
  if (!term.trim()) return html;
  const regex = new RegExp(escapeRegExp(term), 'gi');
  // Replace only text nodes, not inside HTML tags
  // Use a temporary element to safely handle HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  function walk(node) {
    if (node.nodeType === 3) { // Text node
      node.nodeValue = node.nodeValue.replace(regex, match => `<mark class="highlighted-search">${match}</mark>`);
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'MARK'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(temp);
  return temp.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';

  fetch('index.json')
    .then(response => response.json())
    .then(data => {
      const renderResults = (query) => {
        const lowerQuery = query.toLowerCase();
        const results = data.filter(item =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.content.toLowerCase().includes(lowerQuery)
        );
        if (!query.trim()) {
          searchResults.innerHTML = '';
          return;
        }
        searchResults.innerHTML = results.map(item => `
          <div class="search-result">
            <h2>${highlightTerm(item.title, query)}</h2>
            <p>${highlightTerm(item.content, query)}</p>
            <a href="${item.url}">Read more</a>
          </div>
        `).join('');
      };

      // Initial render if query param present
      if (initialQuery) {
        searchInput.value = initialQuery;
        renderResults(initialQuery);
      }

      // Live search as user types
      searchInput.addEventListener('input', (e) => {
        renderResults(e.target.value);
      });
    });
});
