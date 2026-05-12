document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js loaded successfully!");

  const button = document.querySelector(".btn-primary");

  if (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Button clicked!");
    });
  }
});