// Always start at the top after a refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const toastEl = document.getElementById('toast');
const toastText = document.getElementById('toastText');
let toastTimer = null;

function showToast(msg) {
  toastText.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

/* ---------- NAV ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

document.getElementById('signInBtn').addEventListener('click', () => {
  showToast('🔐 Sign-in system coming soon!');
});

document.getElementById('joinBtn').addEventListener('click', () => {
  document.getElementById('community').scrollIntoView({ behavior: 'smooth' });
});

/* ---------- HERO VIDEO ---------- */
const heroSection = document.getElementById('home');
const heroVideo = document.querySelector('.hero video');
let heroRevealed = false;

function revealHero() {
  if (heroRevealed) return;
  heroRevealed = true;
  heroSection.classList.add('revealed');
  startCounters();
}

if (heroVideo) {
  if (heroVideo.ended) {
    revealHero();
  } else {
    // Reveal the hero text only after the bunny video ends
    heroVideo.addEventListener('ended', () => {
      heroVideo.pause();
      revealHero();
    });
    heroVideo.addEventListener('error', revealHero);
    // Safety: reveal at the very last frame if 'ended' is missed
    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.duration && heroVideo.currentTime >= heroVideo.duration - 0.05) {
        heroVideo.pause();
        revealHero();
      }
    });
  }
}

/* ---------- HERO STAT COUNTERS (500 / 4,800 / 320) ---------- */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach((el) => {
    if (el.dataset.started) return;
    el.dataset.started = 'true';
    const target = parseInt(el.dataset.count, 10);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- TRENDING GAMES ---------- */
const trendingGames = [
  { name: 'Valorant', genre: 'Tactical FPS', players: '2.4M', rating: 4.8, img: 'public/Valorant.png' },
  { name: 'GTA V', genre: 'Open World', players: '3.1M', rating: 4.9, img: 'public/GTA V.png' },
  { name: 'Minecraft', genre: 'Sandbox', players: '5.2M', rating: 4.8, img: 'public/Minecraft.png' },
  { name: 'Fortnite', genre: 'Battle Royale', players: '4.6M', rating: 4.6, img: 'public/Fortnite.png' },
  { name: 'Apex Legends', genre: 'Battle Royale', players: '1.9M', rating: 4.5, img: 'public/Apex Legends.png' },
  { name: 'CS2', genre: 'Tactical FPS', players: '2.8M', rating: 4.7, img: 'public/CS2.png' }
];

const trendingGrid = document.getElementById('trendingGrid');
trendingGames.forEach((g) => {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <div class="game-cover"><img src="${encodeURI(g.img)}" alt="${g.name}" loading="lazy"></div>
    <div class="game-body">
      <div class="game-title-row"><span class="game-name">${g.name}</span><span class="game-rating">★ ${g.rating}</span></div>
      <div class="game-meta">
        <span><b>${g.genre}</b></span>
        <span>👥 <b>${g.players}</b> players</span>
      </div>
      <div class="game-actions">
        <button class="btn btn-primary btn-sm play-game">▶ Play</button>
        <button class="btn btn-ghost btn-sm view-game">View Game</button>
      </div>
    </div>`;
  card.querySelector('.play-game').addEventListener('click', () => {
    showToast(`🎮 Launching ${g.name}...`);
  });
  card.querySelector('.view-game').addEventListener('click', () => {
    showToast(`ℹ️ ${g.name} details coming soon!`);
  });
  trendingGrid.appendChild(card);
});

/* ---------- LEADERBOARD ---------- */
const players = [
  { rank: 1, name: 'PhantomX', game: 'Valorant', xp: 98420, wins: 342, avatar: 'PX', color: 'linear-gradient(135deg,#ff4655,#7a0d0d)' },
  { rank: 2, name: 'Shadow', game: 'CS2', xp: 94210, wins: 318, avatar: 'SH', color: 'linear-gradient(135deg,#64748b,#1e293b)' },
  { rank: 3, name: 'Nova', game: 'Fortnite', xp: 91850, wins: 301, avatar: 'NV', color: 'linear-gradient(135deg,#9d4edd,#3b0764)' },
  { rank: 4, name: 'JUNED', game: 'Valorant', xp: 82450, wins: 76, avatar: 'JU', color: 'linear-gradient(135deg,#22d3ee,#0e7490)' },
  { rank: 5, name: 'Blaze', game: 'Apex Legends', xp: 77900, wins: 240, avatar: 'BZ', color: 'linear-gradient(135deg,#fb7185,#9f1239)' },
  { rank: 6, name: 'Vortex', game: 'CS2', xp: 72100, wins: 205, avatar: 'VX', color: 'linear-gradient(135deg,#a3e635,#3f6212)' },
  { rank: 7, name: 'Luna', game: 'Minecraft', xp: 68900, wins: 188, avatar: 'LU', color: 'linear-gradient(135deg,#f472b6,#831843)' },
  { rank: 8, name: 'Ghost', game: 'GTA V', xp: 65400, wins: 170, avatar: 'GH', color: 'linear-gradient(135deg,#94a3b8,#334155)' }
];

const profiles = {
  PhantomX: { gamesPlayed: 612, wins: 342, xp: 98420, winRate: 56, badges: ['TOP 1%', 'PRO PLAYER'] },
  Shadow: { gamesPlayed: 580, wins: 318, xp: 94210, winRate: 55, badges: ['PRO PLAYER', 'HEADSHOT KING'] },
  Nova: { gamesPlayed: 544, wins: 301, xp: 91850, winRate: 55, badges: ['TOP 1%', 'BUILD WIZARD'] },
  JUNED: { gamesPlayed: 128, wins: 76, xp: 82450, winRate: 64, badges: ['TOP 1%', 'PRO PLAYER', 'EARLY BIRD'] },
  Blaze: { gamesPlayed: 490, wins: 240, xp: 77900, winRate: 49, badges: ['FRAX CLUTCH'] },
  Vortex: { gamesPlayed: 430, wins: 205, xp: 72100, winRate: 48, badges: ['SNIPER'] },
  Luna: { gamesPlayed: 402, wins: 188, xp: 68900, winRate: 47, badges: ['BUILDER'] },
  Ghost: { gamesPlayed: 351, wins: 170, xp: 65400, winRate: 48, badges: ['SILENT ASSASSIN'] }
};

function fmtNum(n) {
  return n.toLocaleString('en-US');
}

const lbBody = document.getElementById('leaderboardBody');
const podium = document.getElementById('podium');

function renderLeaderboard(withMoves) {
  const move = (idx) => {
    if (!withMoves) return '';
    const delta = players[idx].move;
    if (!delta) return '';
    const cls = delta > 0 ? 'up' : 'down';
    const arrow = delta > 0 ? '▲' : '▼';
    return `<span class="rank-move ${cls}">${arrow}${Math.abs(delta)}</span>`;
  };

  lbBody.innerHTML = players.map((p, i) => {
    const rankClass = i < 3 ? ` top-${i + 1}` : '';
    return `
      <tr data-player="${p.name}">
        <td><span class="rank-num${rankClass}">#${String(i + 1).padStart(2, '0')} ${move(i)}</span></td>
        <td>
          <div class="player-cell">
            <span class="avatar" style="background:${p.color}">${p.avatar}</span>
            ${p.name}
          </div>
        </td>
        <td style="color:var(--muted)">${p.game}</td>
        <td><b>${fmtNum(p.xp)}</b></td>
        <td>${p.wins}</td>
      </tr>`;
  }).join('');

  const top3 = players.slice(0, 3);
  podium.innerHTML = `
    <h3 class="podium-title">🏆 Top 3 Podium</h3>
    ${top3.map((p, i) => `
      <div class="podium-card" data-player="${p.name}">
        <span class="podium-place">#${i + 1}</span>
        <span class="avatar" style="background:${p.color}">${p.avatar}</span>
        <div>
          <div class="podium-name">${p.name}</div>
          <div class="podium-meta">${p.game} • ${fmtNum(p.xp)} XP</div>
        </div>
      </div>`).join('')}`;
}

// Animated rank changes: periodically swap two adjacent players
function animateRanks() {
  setInterval(() => {
    const i = Math.floor(Math.random() * (players.length - 1));
    players[i].move = players[i].rank > players[i + 1].rank ? -1 : 1;
    players[i + 1].move = players[i + 1].rank > players[i].rank ? -1 : 1;
    const temp = players[i];
    players[i] = players[i + 1];
    players[i + 1] = temp;
    renderLeaderboard(true);
    setTimeout(() => {
      players.forEach((p) => { p.move = 0; });
      renderLeaderboard(false);
    }, 1400);
  }, 5000);
}

renderLeaderboard(false);
animateRanks();

/* ---------- PROFILE MODAL ---------- */
const modalBackdrop = document.getElementById('profileModal');
const modalBody = document.getElementById('modalBody');

function openProfile(name) {
  const p = players.find((x) => x.name === name);
  if (!p) return;
  const prof = profiles[name];
  const badges = prof.badges.map((b, i) => {
    const cls = ['badge-gold', 'badge-magenta', 'badge-cyan'][i % 3];
    return `<span class="badge ${cls}">${b}</span>`;
  }).join('');

  modalBody.innerHTML = `
    <div class="profile-top">
      <span class="avatar" style="background:${p.color}">${p.avatar}</span>
      <div>
        <div class="profile-name">${p.name}</div>
        <div class="profile-game">Main: ${p.game} • Rank #${p.rank}</div>
      </div>
    </div>
    <div class="profile-stats">
      <div class="profile-stat"><strong>${prof.gamesPlayed}</strong><span>🎮 Games Played</span></div>
      <div class="profile-stat"><strong>${prof.wins}</strong><span>🏆 Wins</span></div>
      <div class="profile-stat"><strong>${fmtNum(prof.xp)}</strong><span>⚡ XP</span></div>
      <div class="profile-stat"><strong>${prof.winRate}%</strong><span>🔥 Win Rate</span></div>
    </div>
    <div class="profile-badges">${badges}</div>`;
  modalBackdrop.classList.add('open');
}

lbBody.addEventListener('click', (e) => {
  const tr = e.target.closest('tr[data-player]');
  if (tr) openProfile(tr.dataset.player);
});

podium.addEventListener('click', (e) => {
  const card = e.target.closest('.podium-card[data-player]');
  if (card) openProfile(card.dataset.player);
});

function closeModal() {
  modalBackdrop.classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- EVENTS ---------- */
const events = [
  { icon: '🏆', name: 'GAMEHUB CHAMPIONSHIP', mode: 'Valorant • 5v5', date: 'Friday • 8 PM', prize: '₹10,000 Prize Pool' },
  { icon: '⚡', name: 'WEEKEND WARZONE', mode: 'Battle Royale', date: 'Saturday • 7 PM', prize: '₹5,000 Prize Pool' },
  { icon: '⚔️', name: 'COMMUNITY CLASH', mode: 'Multi-game tournament', date: 'Sunday • All Day', prize: '₹3,000 Prize Pool' }
];

const eventsGrid = document.getElementById('eventsGrid');
events.forEach((ev) => {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.innerHTML = `
    <div class="event-icon">${ev.icon}</div>
    <h3>${ev.name}</h3>
    <div class="event-info">
      <span>🎮 Mode: <b>${ev.mode}</b></span>
      <span>📅 <b>${ev.date}</b></span>
    </div>
    <div class="event-prize">${ev.prize}</div>
    <button class="btn btn-primary btn-full register-btn">Register Now</button>`;
  card.querySelector('.register-btn').addEventListener('click', () => {
    showToast(`✅ Registered for ${ev.name}! See you in the arena.`);
  });
  eventsGrid.appendChild(card);
});

/* ---------- COMMUNITY ---------- */
// Vote buttons
document.querySelectorAll('.vote-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.vote;
    const match = btn.textContent.match(/(\d+)/);
    if (!match) return;
    const count = parseInt(match[1], 10);
    const already = btn.classList.contains('voted');
    const next = already ? count - 1 : count + 1;
    const label = { likes: '👍', comments: '💬', shares: '↗️' }[key];
    btn.textContent = `${label} ${next}`;
    btn.classList.toggle('voted');
  });
});

// Poll
const pollOptions = [
  { label: '🎯 Valorant', pct: 42 },
  { label: '⚔️ CS2', pct: 27 },
  { label: '🌍 Fortnite', pct: 18 },
  { label: '⛏️ Minecraft', pct: 13 }
];
const totalVotes = 1840;
let voted = false;

const pollEl = document.getElementById('pollOptions');
pollEl.innerHTML = pollOptions.map((o, i) => `
  <div class="poll-option" data-idx="${i}">
    <div class="poll-bar"></div>
    <span class="poll-label"><span>${o.label}</span><span class="poll-pct">${o.pct}%</span></span>
  </div>`).join('');

document.querySelectorAll('.poll-option').forEach((opt) => {
  opt.addEventListener('click', () => {
    if (voted) return;
    voted = true;
    const idx = parseInt(opt.dataset.idx, 10);
    pollOptions[idx].pct += 1;
    document.querySelectorAll('.poll-option').forEach((o, i) => {
      o.classList.toggle('selected', i === idx);
      o.querySelector('.poll-bar').style.width = pollOptions[i].pct + '%';
      o.querySelector('.poll-pct').textContent = pollOptions[i].pct + '%';
    });
    document.getElementById('pollMeta').textContent = `${fmtNum(totalVotes + 1)} votes • Thanks for voting!`;
    showToast('🗳️ Vote counted!');
  });
});

// Discord
document.getElementById('discordBtn').addEventListener('click', () => {
  showToast('🎧 Opening Discord invite...');
});

/* ---------- LIBRARY ---------- */
const libraryGames = [
  { name: 'Valorant', genre: 'FPS', img: 'public/Valorant.png' },
  { name: 'CS2', genre: 'FPS', img: 'public/CS2.png' },
  { name: 'Apex Legends', genre: 'FPS', img: 'public/Apex Legends.png' },
  { name: 'Destiny 2', genre: 'FPS', img: 'public/Destiny 2.png' },
  { name: 'Cyberpunk 2077', genre: 'RPG', img: 'public/Cyberpunk.png' },
  { name: 'Elden Ring', genre: 'RPG', img: 'public/Elden Ring.png' },
  { name: 'The Witcher 3', genre: 'RPG', img: 'public/The Witcher 3.png' },
  { name: 'Final Fantasy XIV', genre: 'RPG', img: 'public/Final Fantasy XIV.png' },
  { name: 'Forza Horizon 5', genre: 'Racing', img: 'public/Forza Horizon 5.png' },
  { name: 'Need for Speed', genre: 'Racing', img: 'public/Need For Speed.png' },
  { name: 'Age of Empires IV', genre: 'Strategy', img: 'public/Age od Empires IV.png' },
  { name: 'Stellaris', genre: 'Strategy', img: 'public/Stellaris.png' },
  { name: 'Fortnite', genre: 'Battle Royale', img: 'public/Fortnite.png' },
  { name: 'PUBG', genre: 'Battle Royale', img: 'public/PUBG.png' },
  { name: 'Warzone', genre: 'Battle Royale', img: 'public/Warzone.png' },
  { name: 'Free Fire', genre: 'Battle Royale', img: 'public/Free Fire.png' }
];

const libraryGrid = document.getElementById('libraryGrid');
const libraryEmpty = document.getElementById('libraryEmpty');

function renderLibrary() {
  const query = searchInput.value.trim().toLowerCase();
  const genre = document.querySelector('.chip.active').dataset.genre;
  const filtered = libraryGames.filter((g) => {
    const matchGenre = genre === 'All' || g.genre === genre;
    const matchQuery = !query || g.name.toLowerCase().includes(query) || g.genre.toLowerCase().includes(query);
    return matchGenre && matchQuery;
  });

  libraryGrid.innerHTML = filtered.map((g) => `
    <div class="lib-card" onclick="showToast('🎮 ${g.name} selected')">
      <div class="lib-cover"><img src="${encodeURI(g.img)}" alt="${g.name}" loading="lazy"></div>
      <div class="lib-body">
        <div class="lib-name">${g.name}</div>
        <div class="lib-genre">${g.genre}</div>
      </div>
    </div>`).join('');
  libraryEmpty.hidden = filtered.length > 0;
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  // Typing searches the whole catalog, ignore any active genre chip
  if (searchInput.value.trim()) {
    document.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.genre === 'All');
    });
  }
  renderLibrary();
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    renderLibrary();
  });
});

renderLibrary();

/* ---------- DASHBOARD ---------- */
const recentMatches = [
  { game: 'Valorant', mode: 'Competitive', result: 'WIN', note: '+28 XP' },
  { game: 'CS2', mode: 'Premier', result: 'LOSS', note: '+12 XP' },
  { game: 'Fortnite', mode: 'Zero Build', result: 'WIN', note: '+30 XP' },
  { game: 'Apex Legends', mode: 'Ranked', result: 'WIN', note: '+26 XP' }
];

document.getElementById('matchList').innerHTML = recentMatches.map((m) => `
  <li>
    <span>🎮 <b>${m.game}</b> <span style="color:var(--muted)">• ${m.mode}</span></span>
    <span class="${m.result === 'WIN' ? 'result-win' : 'result-loss'}">${m.result} ${m.note}</span>
  </li>`).join('');

const dashAchievements = [
  { name: 'First Victory', unlocked: true },
  { name: '10 Win Streak', unlocked: true },
  { name: 'Speed Demon', unlocked: false },
  { name: 'Sharpshooter', unlocked: true }
];

document.getElementById('dashAchList').innerHTML = dashAchievements.map((a) => `
  <li class="${a.unlocked ? '' : 'locked'}">${a.unlocked ? '🏆' : '🔒'} ${a.name}</li>`).join('');

const friendsOnline = [
  { name: 'PhantomX', status: 'In Game', color: 'linear-gradient(135deg,#ff4655,#7a0d0d)', online: 'ingame' },
  { name: 'Nova', status: 'Online', color: 'linear-gradient(135deg,#9d4edd,#3b0764)', online: 'online' },
  { name: 'Shadow', status: 'In Game', color: 'linear-gradient(135deg,#64748b,#1e293b)', online: 'ingame' },
  { name: 'Luna', status: 'Online', color: 'linear-gradient(135deg,#f472b6,#831843)', online: 'online' },
  { name: 'Blaze', status: 'Online', color: 'linear-gradient(135deg,#fb7185,#9f1239)', online: 'online' }
];

document.getElementById('friendList').innerHTML = friendsOnline.map((f) => `
  <li>
    <span class="avatar" style="background:${f.color};width:30px;height:30px;font-size:11px">${f.name.slice(0, 2).toUpperCase()}</span>
    <b style="flex:1">${f.name}</b>
    <span class="friend-status"><span class="dot ${f.online}"></span> ${f.status}</span>
  </li>`).join('');

const notifications = [
  { text: '🏆 You ranked up to #4 on the Global Leaderboard!', time: '2h ago' },
  { text: '📅 Reminder: GAMEHUB Championship starts Friday 8 PM.', time: '6h ago' },
  { text: '👤 PhantomX sent you a friend request.', time: '1d ago' },
  { text: '🎁 New achievement unlocked: Sharpshooter.', time: '2d ago' }
];

document.getElementById('notifList').innerHTML = notifications.map((n) => `
  <li><span class="notif-text">${n.text}</span><span class="notif-time">${n.time}</span></li>`).join('');

const winRates = [52, 55, 49, 58, 61, 57, 64];
const winDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const lastWinRate = winRates[winRates.length - 1];
const winDelta = lastWinRate - winRates[0];
document.getElementById('winBars').innerHTML = winRates.map((w, i) => `
  <div class="bar-col">
    <span class="bar-val">${w}%</span>
    <div class="bar" style="height:${w}%"></div>
    <span class="bar-day">${winDays[i]}</span>
  </div>`).join('');
document.getElementById('winTrendSummary').textContent =
  `Last 7 days • Current ${lastWinRate}% ${winDelta >= 0 ? '▲' : '▼'} ${Math.abs(winDelta)}% this week`;

/* ---------- ACHIEVEMENTS ---------- */
const achievements = [
  { icon: '🏆', name: 'First Victory', desc: 'Win your first match', buggy: false },
  { icon: '🔥', name: '10 Win Streak', desc: 'Win 10 matches in a row', buggy: false },
  { icon: '⚡', name: 'Speed Demon', desc: 'Finish a match under 10 min', buggy: false },
  { icon: '🎯', name: 'Sharpshooter', desc: 'Land 100 headshots', buggy: false },
  { icon: '👑', name: 'Arena Champion', desc: 'Win a GAMEHUB tournament', buggy: true }
];

const achGrid = document.getElementById('achGrid');

function achStatusCard(a, unlocked) {
  const locked = !unlocked;
  return `
    <div class="ach-card ${locked ? 'locked' : ''}" data-name="${a.name}">
      <span class="ach-icon">${a.icon}</span>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      <span class="ach-status ${locked ? 'locked' : 'unlocked'}">${locked ? '🔒 Locked' : '✅ Unlocked'}</span>
    </div>`;
}

let achState = {
  'First Victory': true,
  '10 Win Streak': true,
  'Speed Demon': false,
  'Sharpshooter': false,
  'Arena Champion': false
};

function renderAchievements() {
  achGrid.innerHTML = achievements.map((a) => achStatusCard(a, achState[a.name])).join('');
}

achGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.ach-card');
  if (!card) return;
  const name = card.dataset.name;
  const ach = achievements.find((a) => a.name === name);

  if (ach.buggy) {
    // Intentionally bugged: try to unlock but it stays locked
    showToast('⚠️ Achievement lock glitch — try again.');
    return;
  }

  if (achState[name]) {
    achState[name] = false;
    showToast(`🔒 ${name} locked.`);
  } else {
    achState[name] = true;
    showToast(`🏅 Unlocked: ${name}!`);
  }
  renderAchievements();
  renderDashAch();
});

function renderDashAch() {
  document.getElementById('dashAchList').innerHTML = achievements.map((a) => `
    <li class="${achState[a.name] ? '' : 'locked'}">${achState[a.name] ? '🏆' : '🔒'} ${a.name}</li>`).join('');
}

renderAchievements();
renderDashAch();
