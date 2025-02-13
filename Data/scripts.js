// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');

  const lazyLoad = () => {
      images.forEach(img => {
          if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0) {
              img.src = img.dataset.src;
              img.removeAttribute('loading');
              img.classList.add('loaded');
          }
      });
  };

  window.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);

  lazyLoad();
});

// DOM Manipulation Example - Interactive Button
document.querySelector('.contact-form button').addEventListener('click', function (event) {
  event.preventDefault();
  alert('Thank you for your message!');
});

// Fetch JSON Data (Optional for API Integration)
const loadData = async () => {
  try {
      const response = await fetch('data.json'); // Replace with your data source URL
      const data = await response.json();
      console.log(data); // Process data dynamically
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

loadData();

// Example of using localStorage
const saveFormData = () => {
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value
  };
  localStorage.setItem('contactFormData', JSON.stringify(formData));
};

document.getElementById('contactForm').addEventListener('submit', saveFormData);
