// public/js/app.js — shared across all pages

const API = ''   // empty = same origin (your Node server serves these files)

// ── AUTH HELPERS ─────────────────────────────────────────
const getToken = () => localStorage.getItem('te_token')
const getUser  = () => JSON.parse(localStorage.getItem('te_user') || 'null')
const setAuth  = (token, user) => {
  localStorage.setItem('te_token', token)
  localStorage.setItem('te_user', JSON.stringify(user))
}
const clearAuth = () => {
  localStorage.removeItem('te_token')
  localStorage.removeItem('te_user')
}

// ── FETCH WRAPPER ─────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(API + path, { ...options, headers })
  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}

// ── RENDER STARS ─────────────────────────────────────────
function renderStars(rating, max = 5) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = max - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

// ── SHOW ALERT ────────────────────────────────────────────
function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = msg
  el.className = `alert alert-${type}`
  el.style.display = 'block'
  setTimeout(() => el.style.display = 'none', 5000)
}

// ── FORMAT CURRENCY ───────────────────────────────────────
const fmt = n => '₹' + Number(n).toLocaleString('en-IN')

// ── FORMAT DATE ───────────────────────────────────────────
const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

// ── REVEAL ON SCROLL ─────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
}

// ── CUSTOM CURSOR ─────────────────────────────────────────
function initCursor() {
  if (window.innerWidth < 768) return
  const dot  = document.querySelector('.cursor-dot')
  const ring = document.querySelector('.cursor-ring')
  if (!dot || !ring) return
  let mx = 0, my = 0, rx = 0, ry = 0
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })
  const loop = () => {
    dot.style.left  = mx + 'px';  dot.style.top  = my + 'px'
    rx += (mx - rx) * 0.12;       ry += (my - ry) * 0.12
    ring.style.left = rx + 'px';  ring.style.top = ry + 'px'
    requestAnimationFrame(loop)
  }
  loop()
  document.querySelectorAll('a,button,.pkg-card,.filter-pill,.wish-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
  })
}

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar')
  if (!nav) return
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40))
}

// ── PARALLAX ─────────────────────────────────────────────
function initParallax() {
  const bg = document.querySelector('.parallax-bg')
  if (!bg) return
  window.addEventListener('scroll', () => {
    const rect = bg.closest('.parallax-banner').getBoundingClientRect()
    const pct  = -rect.top / window.innerHeight
    bg.style.transform = `translateY(${pct * 60}px)`
  }, { passive: true })
}

// ── RENDER NAVBAR ─────────────────────────────────────────
function renderNavAuth() {
  const el = document.getElementById('navAuth')
  if (!el) return
  const user = getUser()
  const token = getToken()
  if (token && user) {
    const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    el.innerHTML = `
      <li><a href="bookings.html">My Trips</a></li>
      <li><a href="wishlist.html">Wishlist</a></li>
      ${user.role === 'admin' ? `<li><a href="admin.html">Dashboard</a></li>` : ''}
      <li>
        <div class="nav-user">
          <div class="nav-avatar" onclick="window.location='profile.html'" title="${user.name}">${initials}</div>
          <button class="btn btn-ghost btn-sm" onclick="logout()">Sign Out</button>
        </div>
      </li>
    `
  } else {
    el.innerHTML = `
      <li><a href="login.html" class="btn btn-ghost btn-sm">Sign In</a></li>
      <li><a href="login.html?tab=register" class="btn btn-gold btn-sm">Join Free</a></li>
    `
  }
}

function logout() {
  clearAuth()
  window.location.href = 'index.html'
}

// ── WISHLIST STATE ────────────────────────────────────────
let wishlistIds = new Set()

async function loadWishlistIds() {
  if (!getToken()) return
  const { data } = await apiFetch('/api/wishlist')
  if (data.success) wishlistIds = new Set(data.wishlist.map(p => p._id || p))
}

async function toggleWishlist(packageId, btn) {
  if (!getToken()) { window.location.href = 'login.html'; return }
  const { data } = await apiFetch('/api/wishlist/toggle', {
    method: 'POST',
    body: JSON.stringify({ packageId })
  })
  if (data.success) {
    if (data.added) { wishlistIds.add(packageId); btn.classList.add('active') }
    else            { wishlistIds.delete(packageId); btn.classList.remove('active') }
  }
}

// ── ON DOM READY ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNavAuth()
  initReveal()
  initCursor()
  initNavbar()
  initParallax()
  loadWishlistIds()
})