// courses.js
// Sample array of course objects (rename / adjust as required by assignment)
const courses = [
  { code: "WDD130", title: "Foundations of Web Dev", category: "wdd", credits: 3, completed: true },
  { code: "WDD140", title: "HTML & CSS", category: "wdd", credits: 3, completed: true },
  { code: "CSE121", title: "Intro to Programming", category: "cse", credits: 4, completed: false },
  { code: "WDD231", title: "Responsive Layout", category: "wdd", credits: 3, completed: false },
  { code: "CSE230", title: "Software Development", category: "cse", credits: 3, completed: true },
  // add more to reach the certificate list...
];

function renderCourses(list) {
  const container = document.getElementById('courses');
  container.innerHTML = '';

  list.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card';
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <div class="course-content">
        <h3>${course.code} — ${course.title}</h3>
        <p class="course-meta">Category: ${course.category.toUpperCase()} • Credits: ${course.credits}</p>
        <p class="course-meta">${course.completed ? 'Completed' : 'Not completed'}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // update total credits for currently displayed courses
  const totalCredits = list.reduce((sum, c) => sum + (c.credits || 0), 0);
  const totalEl = document.getElementById('totalCredits');
  if (totalEl) totalEl.textContent = totalCredits;
}

document.addEventListener('DOMContentLoaded', () => {
  // initial render (all)
  renderCourses(courses);

  // filter buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.target.getAttribute('data-filter');
      let filtered;
      if (filter === 'all') filtered = courses;
      else filtered = courses.filter(c => c.category === filter);
      renderCourses(filtered);
    });
  });
});
