// Frontend app.js (client) - posts submissions to backend API if available
// Replace API_BASE with your deployed backend URL (no trailing slash), e.g. 'https://wearethesapace-api.onrender.com'
const API_BASE = ''; // <-- set this to your backend URL after deployment, e.g. 'https://wearethesapace-api.onrender.com'

const DEFAULT_PALETTE = [
  '#000000', '#ffffff', '#ff3b30', '#ff9500', '#ffd60a',
  '#34c759', '#5ac8fa', '#007aff', '#5856d6', '#ff2d55'
];

const paletteEl = document.getElementById('palette');
const colorWheel = document.getElementById('colorWheel');
const addColorBtn = document.getElementById('addColorBtn');
const sizeSelect = document.getElementById('sizeSelect');
const gridEl = document.getElementById('grid');
const clearGridBtn = document.getElementById('clearGridBtn');
const submitBtn = document.getElementById('submitBtn');

let selectedColor = DEFAULT_PALETTE[0];
let currentSize = parseInt(sizeSelect.value, 10);
let cells = [];

function init() {
  buildPalette(DEFAULT_PALETTE);
  selectColor(selectedColor);
  sizeSelect.addEventListener('change', onSizeChange);
  addColorBtn.addEventListener('click', onAddColor);
  clearGridBtn.addEventListener('click', onClearGrid);
  submitBtn.addEventListener('click', onSubmit);
  createGrid(currentSize);
}

function buildPalette(colors) {
  paletteEl.innerHTML = '';
  colors.forEach(hex => {
    const sw = document.createElement('button');
    sw.className = 'color-swatch';
    sw.style.background = hex;
    sw.dataset.color = hex;
    sw.title = hex;
    sw.addEventListener('click', () => selectColor(hex));
    paletteEl.appendChild(sw);
  });
}

function addPaletteColor(hex) {
  const existing = Array.from(paletteEl.children).some(n => n.dataset.color.toLowerCase() === hex.toLowerCase());
  if (!existing) {
    const sw = document.createElement('button');
    sw.className = 'color-swatch';
    sw.style.background = hex;
    sw.dataset.color = hex;
    sw.title = hex;
    sw.addEventListener('click', () => selectColor(hex));
    paletteEl.appendChild(sw);
  }
  selectColor(hex);
}

function selectColor(hex) {
  selectedColor = hex;
  Array.from(paletteEl.children).forEach(child => {
    if (child.dataset.color && child.dataset.color.toLowerCase() === hex.toLowerCase()) {
      child.classList.add('selected');
    } else child.classList.remove('selected');
  });
}

function onAddColor() {
  const hex = colorWheel.value;
  addPaletteColor(hex);
}

function onSizeChange(e) {
  currentSize = parseInt(e.target.value, 10);
  createGrid(currentSize);
}

function createGrid(size) {
  cells = new Array(size * size).fill('#ffffff');
  renderGrid(size);
}

function renderGrid(size) {
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const cellBase = Math.max(28, Math.floor(360 / size));
  Array.from({ length: size * size }).forEach((_, idx) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.background = cells[idx];
    cell.style.minWidth = `${cellBase}px`;
    cell.style.minHeight = `${cellBase}px`;
    cell.dataset.index = idx;
    cell.addEventListener('click', () => onCellClick(idx, cell));
    gridEl.appendChild(cell);
  });
}

function onCellClick(index, cellEl) {
  cells[index] = selectedColor;
  cellEl.style.background = selectedColor;
}

function onClearGrid() {
  cells.fill('#ffffff');
  Array.from(gridEl.children).forEach(c => c.style.background = '#ffffff');
}

async function onSubmit() {
  const submission = {
    size: currentSize,
    cells: cells.slice()
  };

  const apiUrl = (API_BASE && API_BASE !== '') ? (API_BASE.replace(/\/$/, '') + '/api/submissions') : '/api/submissions';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('API write failed, falling back to localStorage:', err);
      throw new Error('API write failed');
    }
    // success — go to gallery page
    window.location.href = 'gallery.html';
    return;
  } catch (err) {
    // fallback: localStorage
    console.warn('Submit falling back to localStorage:', err);
    const key = 'artGridSubmissions';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ id: Date.now(), size: submission.size, cells: submission.cells, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    window.location.href = 'gallery.html';
  }
}

init();