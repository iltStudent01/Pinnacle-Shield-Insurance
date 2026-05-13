document.addEventListener("DOMContentLoaded", function () {
  const typeRadios = document.querySelectorAll('input[name="insuranceType"]');
  const autoFields = document.getElementById("auto-fields");
  const homeFields = document.getElementById("home-fields");
  const lifeFields = document.getElementById("life-fields");

  function hideAllFields() {
    autoFields.classList.add("hidden");
    homeFields.classList.add("hidden");
    lifeFields.classList.add("hidden");
  }

  typeRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      hideAllFields();

      if (this.value === "auto") {
        autoFields.classList.remove("hidden");
      } else if (this.value === "home") {
        homeFields.classList.remove("hidden");
      } else if (this.value === "life") {
        lifeFields.classList.remove("hidden");
      }
    });
  });
})