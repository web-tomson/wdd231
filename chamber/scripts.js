document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const memberList = document.getElementById('member-list');

gridViewBtn.addEventListener('click', () => {
    memberList.className = 'grid-view';
});

listViewBtn.addEventListener('click', () => {
    memberList.className = 'list-view';
    memberList.style.display = 'block';
});