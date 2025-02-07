// Create preview element
const previewEl = document.createElement('div');
previewEl.className = 'wiki-preview';
document.body.appendChild(previewEl);

// Style preview element
const style = document.createElement('style');
style.textContent = `
  .wiki-preview {
    position: fixed;
    display: none;
    max-width: 400px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .wiki-preview-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .wiki-preview-summary {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .wiki-preview-metadata {
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
  
  .wiki-preview-tag {
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    color: white;
  }
`;
document.head.appendChild(style);

// Add hover listeners to wiki links
document.addEventListener('DOMContentLoaded', () => {
  const wikiLinks = document.querySelectorAll('a.wiki-link');
  
  wikiLinks.forEach(link => {
    link.addEventListener('mouseenter', showPreview);
    link.addEventListener('mouseleave', hidePreview);
  });
});

async function showPreview(event) {
  const link = event.target;
  const href = link.getAttribute('href');
  
  try {
    // Fetch page data
    const response = await fetch(href);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    // Extract metadata
    const title = doc.querySelector('.wiki-title').textContent;
    const summary = doc.querySelector('.wiki-summary')?.textContent;
    const category = doc.querySelector('[data-category]')?.dataset.category;
    const difficulty = doc.querySelector('[data-difficulty]')?.dataset.difficulty;
    
    // Position preview
    const rect = link.getBoundingClientRect();
    previewEl.style.top = `${rect.bottom + window.scrollY + 8}px`;
    previewEl.style.left = `${rect.left + window.scrollX}px`;
    
    // Update preview content
    previewEl.innerHTML = `
      <div class="wiki-preview-title">${title}</div>
      ${summary ? `<div class="wiki-preview-summary">${summary}</div>` : ''}
      <div class="wiki-preview-metadata">
        ${category ? `
          <span class="wiki-preview-tag" style="background-color: ${getCategoryColor(category)}">
            ${category}
          </span>
        ` : ''}
        ${difficulty ? `
          <span class="wiki-preview-tag" style="background-color: ${getDifficultyColor(difficulty)}">
            ${difficulty}
          </span>
        ` : ''}
      </div>
    `;
    
    previewEl.style.display = 'block';
  } catch (error) {
    console.error('Error loading preview:', error);
  }
}

function hidePreview() {
  previewEl.style.display = 'none';
}

function getCategoryColor(category) {
  const metadata = JSON.parse(document.getElementById('wiki-metadata').textContent);
  return metadata.categories[category]?.color || '#999';
}

function getDifficultyColor(difficulty) {
  const metadata = JSON.parse(document.getElementById('wiki-metadata').textContent);
  return metadata.difficulty_levels[difficulty]?.color || '#999';
} 