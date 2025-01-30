document.addEventListener("DOMContentLoaded", () => {
    // Dynamically add upcoming events
    const eventList = document.getElementById("event-list");
    const events = [
      { name: "Spring Trail Ride", date: "March 15, 2025" },
      { name: "Mountain Adventure", date: "April 22, 2025" },
      { name: "Coastal Breeze Ride", date: "May 5, 2025" },
    ];
  
    events.forEach(event => {
      const listItem = document.createElement("li");
      listItem.textContent = `${event.name} - ${event.date}`;
      eventList.appendChild(listItem);
    });
  
    // Handle form submission
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for contacting us! We'll get back to you soon.");
      form.reset();
    });
  });
  