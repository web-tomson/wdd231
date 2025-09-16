// scripts/members.js - fetch members.json and render; add view toggle and filter
async function fetchMembers() {
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error('Network response not ok');
    const data = await resp.json();
    return data.members;
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

function membershipLabel(level){
  return level===3? 'Gold' : level===2? 'Silver' : 'Member';
}

function createCard(member){
  const card = document.createElement('article');
  card.className = 'member-card';
  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo">
    <div class="member-info">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Phone: <a href="tel:${member.phone}">${member.phone}</a></p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>Level: ${membershipLabel(member.level)}</p>
    </div>
  `;
  return card;
}

function renderMembers(members){
  const container = document.getElementById('members');
  container.innerHTML = '';
  members.forEach(m => container.appendChild(createCard(m)));
}

function applyFilter(members, level){
  if(level==='all') return members;
  return members.filter(m => String(m.level) === String(level));
}

document.addEventListener('DOMContentLoaded', async () => {
  const members = await fetchMembers();
  const container = document.getElementById('members');
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const levelSelect = document.getElementById('levelSelect');
  let currentView = 'grid'; // or 'list'
  let currentMembers = members;

  // initial render
  renderMembers(members);

  // toggle view handlers
  gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    container.classList.remove('list'); container.classList.add('grid');
    gridBtn.classList.add('active'); listBtn.classList.remove('active');
  });
  listBtn.addEventListener('click', () => {
    currentView = 'list';
    container.classList.remove('grid'); container.classList.add('list');
    listBtn.classList.add('active'); gridBtn.classList.remove('active');
  });

  // filter handler
  levelSelect.addEventListener('change', (e) => {
    const lvl = e.target.value;
    currentMembers = applyFilter(members, lvl);
    renderMembers(currentMembers);
  });

  // set year and lastModified
  const yearSpan = document.getElementById('year');
  const lastMod = document.getElementById('lastModified');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();
  if(lastMod) lastMod.textContent = document.lastModified || 'Unknown';
});
