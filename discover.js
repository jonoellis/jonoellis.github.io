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

// Highlight all matches of 'term' (case-insensitive) in a DOM element
function highlightInElement(element, term) {
  if (!term.trim()) return;
  const regex = new RegExp(escapeRegExp(term), 'gi');
  function walk(node) {
    if (node.nodeType === 3) { // Text node
      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      const text = node.nodeValue;
      regex.lastIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const mark = document.createElement('mark');
        mark.className = 'highlighted-search';
        mark.textContent = match[0];
        frag.appendChild(mark);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      if (frag.childNodes.length) {
        node.parentNode.replaceChild(frag, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'MARK'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(element);
}

// Remove previous highlights
function removeHighlights(element) {
  const marks = element.querySelectorAll('mark.highlighted-search');
  marks.forEach(mark => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
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
        const results = data.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query)
        );
        searchResults.innerHTML = results.map(item => `
          <li>
            <a href="${item.url}">
              <h2 class="search-title"></h2>
              <p class="search-content"></p>
            </a>
          </li>
        `).join('');

        // Insert plain text, then highlight
        const liNodes = searchResults.querySelectorAll('li');
        results.forEach((item, idx) => {
          const li = liNodes[idx];
          const titleEl = li.querySelector('.search-title');
          const contentEl = li.querySelector('.search-content');
          // Remove old highlights if any
          removeHighlights(titleEl);
          removeHighlights(contentEl);
          // Set text content (safe, no HTML injection)
          titleEl.textContent = item.title;
          contentEl.textContent = item.content;
          // Highlight matches
          highlightInElement(titleEl, query);
          highlightInElement(contentEl, query);
        });
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
