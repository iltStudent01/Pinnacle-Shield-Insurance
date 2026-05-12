document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("getStartedBtn");

  if (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Get Started clicked!");
    });
  } else {
    console.log("Button not found");
  }
});