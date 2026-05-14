document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js loaded successfully!");

  // Home page button
  const getStartedBtn = document.getElementById("getStartedBtn");

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "quote.html";
    });
  }

  // FAQ search/filter
  const searchInput = document.getElementById("faq-search");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const items = document.querySelectorAll(".accordion-item");

      items.forEach(function (item) {
        const text = item.textContent.toLowerCase();

        if (text.includes(searchTerm)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});