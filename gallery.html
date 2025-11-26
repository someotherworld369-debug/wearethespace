const API_BASE = 'https://wearethespace-backend.onrender.com';
const apiUrl = (API_BASE && API_BASE !== '') ? (API_BASE.replace(/\/$/, '') + '/api/submissions') : '/api/submissions';

const galleryArea = document.getElementById('galleryArea');
const totalCount = document.getElementById('totalCount');
const clearAllBtn = document.getElementById('clearAllBtn');

async function fetchFromApi() {
  console.log('Fetching submissions from:', apiUrl);

  try {
    const res = await fetch(apiUrl);
    console.log('GET response status:', res.status);
    console.log('GET response headers:', [...res.headers.entries()]);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'No JSON returned' }));
      console.error('API GET failed:', err);
      throw new Error('API GET failed');
    }

    const subs = await res.json();
    console.log('Fetched submissions:', subs);

    return subs.map(s => ({
      id: s.id,
      size: s.size,
      cells: s.cells,
      created_at: s.created_at
    }));

  } catch (err) {
    console.warn('Failed to fetch from API, falling back to localStorage:', err);
    const fallback = JSON.parse(localStorage.getItem('artGridSubmissions') || '[]');
    console.log('LocalStorage fallback:', fallback);
    return fallback;
  }
}

function computeGridDim(n) {
  return Math.ceil(Math.sqrt(Math.max(1, n)));
}

function renderSubs(subs) {
  const n = subs.length;
  totalCount.textContent = n;
  galleryArea.innerHTML = '';

  if (n === 0) {
    galleryArea.innerHTML = '<p class="small-note">No submissions yet. Be the first to submit your design.</p>';
    return;
  }

  const dim = computeGridDim(n);
  const totalSlots = dim * dim;

  const container = document.createElement('div');
  container.className = 'gallery-grid';
  container.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
  container.style.alignItems = 'start';

  for (let i = 0; i < totalSlots; i++) {
    const tileWrap = document.createElement('div');
    tileWrap.style.display = 'flex';
    tileWrap.style.flexDirection = 'column';
    tileWrap.style.alignItems = 'center';

    if (i < n) {
      const sub = subs[i];
      const tile = makeDesignTile(sub);
      tileWrap.appendChild(tile);
      const info = document.createElement('div');
      info.className = 'design-title';
      info.textContent = `${sub.size} x ${sub.size}`;
      tileWrap.appendChild(info);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'design-tile';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.innerHTML = '<small style="color:#bbb">empty</small>';
      tileWrap.appendChild(placeholder);
    }
    container.appendChild(tileWrap);
  }

  galleryArea.appendChild(container);
}

function makeDesignTile(sub) {
  const outer = document.createElement('div');
  outer.className = 'design-tile';

  const inner = document.createElement('div');
  inner.style.display = 'grid';
  inner.style.width = '100%';
  inner.style.height = '100%';
  inner.style.gridTemplateColumns = `repeat(${sub.size}, 1fr)`;
  inner.style.gridAutoRows = `1fr`;
  inner.style.gap = '4px';
  inner.style.alignContent = 'stretch';
  inner.style.justifyContent = 'stretch';
  inner.style.padding = '6px';
  inner.style.boxSizing = 'border-box';
  inner.style.background = '#f6f6f6';
  inner.style.borderRadius = '6px';

  const total = sub.size * sub.size;
  for (let i = 0; i < total; i++) {
    const c = document.createElement('div');
    c.style.width = '100%';
    c.style.height = '100%';
    c.style.background = (sub.cells && sub.cells[i]) ? sub.cells[i] : '#ffffff';
    c.style.borderRadius = '4px';
    c.style.border = '1px solid rgba(0,0,0,0.05)';
    inner.appendChild(c);
  }

  outer.appendChild(inner);
  return outer;
}

// Clear all submissions (admin only)
clearAllBtn.addEventListener('click', async () => {
  if (!confirm('Clear all submissions? This cannot be undone.')) return;
  const adminKey = prompt('Enter admin key to confirm deletion (cancel to skip):');
  if (!adminKey) return;

  try {
    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: { 'x-admin-api-key': adminKey }
    });
    console.log('DELETE response status:', res.status);
    if (!res.ok) {
      const txt = await res.json().catch(() => ({}));
      alert('Delete failed: ' + (txt.error || res.statusText));
      return;
    }
    console.log('DELETE successful');
    loadAndRender();
  } catch (err) {
    console.warn('Delete failed', err);
    alert('Delete failed (network/error).');
  }
});

async function loadAndRender() {
  const subs = await fetchFromApi();
  renderSubs(subs);
}

// Initial load
loadAndRender();
