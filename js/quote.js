document.addEventListener("DOMContentLoaded", function () {
  const typeRadios = document.querySelectorAll('input[name="insuranceType"]');
  const autoFields = document.getElementById("auto-fields");
  const homeFields = document.getElementById("home-fields");
  const lifeFields = document.getElementById("life-fields");
  const calculateBtn = document.getElementById("calculateQuoteBtn");
  const resultsSection = document.getElementById("resultsSection");
  const anotherQuoteBtn = document.getElementById("anotherQuoteBtn");
  const quoteForm = document.getElementById("quoteForm");

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
  function clearErrors() {
    const invalidFields = document.querySelectorAll(".is-invalid");
    invalidFields.forEach(function (field) {
      field.classList.remove("is-invalid");
    });
  }
  function showError(input) {
    if (input) {
      input.classList.add("is-invalid");
    }
  }

  function validateZip(zip) {
    return /^\d{5}$/.test(zip);
  }
  function getSelectedInsuranceType() {
    const selected = document.querySelector('input[name="insuranceType"]:checked');
    return selected ? selected.value : "";
  }

  function getSelectedRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  }
  function validateForm() {
    clearErrors();

    const insuranceType = getSelectedInsuranceType();
    let isValid = true;

    if (!insuranceType) {
      alert("Please select an insurance type.");
      return false;
    }
    if (insuranceType === "auto") {
      const name = document.getElementById("autoName");
      const age = document.getElementById("autoAge");
      const zip = document.getElementById("autoZip");
      const year = document.getElementById("vehicleYear");
      const make = document.getElementById("vehicleMake");
      const model = document.getElementById("vehicleModel");
      const mileage = document.getElementById("annualMileage");
      const coverage = getSelectedRadioValue("autoCoverage");

      if (name.value.trim().length < 2) {
        showError(name);
        isValid = false;
      }
      if (age.value < 16 || age.value > 100 || age.value === "") {
        showError(age);
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip);
        isValid = false;
      }
      if (year.value < 1990 || year.value > 2026 || year.value === "") {
        showError(year);
        isValid = false;
      }
      if (make.value === "") {
        showError(make);
        isValid = false;
      }
      if (model.value.trim().length < 2) {
        showError(model);
        isValid = false;
      }
      if (mileage.value === "") {
        showError(mileage);
        isValid = false;
      }
      if (!coverage) {
        isValid = false;
        alert("Please select Auto coverage level.");
      }
    }
    if (insuranceType === "home") {
      const name = document.getElementById("homeName");
      const age = document.getElementById("homeAge");
      const zip = document.getElementById("homeZip");
      const value = document.getElementById("homeValue");
      const yearBuilt = document.getElementById("yearBuilt");
      const sqft = document.getElementById("squareFootage");
      const construction = document.getElementById("constructionType");
      const coverage = getSelectedRadioValue("homeCoverage");

      if (name.value.trim().length < 2) {
        showError(name);
        isValid = false;
      }
      if (age.value < 18 || age.value > 100 || age.value === "") {
        showError(age);
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip);
        isValid = false;
      }
      if (value.value < 50000 || value.value === "") {
        showError(value);
        isValid = false;
      }
      if (yearBuilt.value < 1800 || yearBuilt.value > 2026 || yearBuilt.value === "") {
        showError(yearBuilt);
        isValid = false;
      }
      if (sqft.value < 100 || sqft.value === "") {
        showError(sqft);
        isValid = false;
      }
      if (construction.value === "") {
        showError(construction);
        isValid = false;
      }
      if (!coverage) {
        isValid = false;
        alert("Please select Home coverage level.");
      }
    }
    if (insuranceType === "life") {
      const name = document.getElementById("lifeName");
      const age = document.getElementById("lifeAge");
      const zip = document.getElementById("lifeZip");
      const gender = document.getElementById("gender");
      const smoker = getSelectedRadioValue("smoker");
      const amount = document.getElementById("coverageAmount");
      const exercise = document.getElementById("exerciseFrequency");
      const coverage = getSelectedRadioValue("lifeCoverage");

      if (name.value.trim().length < 2) {
        showError(name);
        isValid = false;
      }
      if (age.value < 18 || age.value > 85 || age.value === "") {
        showError(age);
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip);
        isValid = false;
      }
      if (!smoker) {
        isValid = false;
        alert("Please select smoker Yes or No.");
      }
      if (amount.value === "") {
        showError(amount);
        isValid = false;
      }
      if (exercise.value === "") {
        showError(exercise);
        isValid = false;
      }
      if (!coverage) {
        isValid = false;
        alert("Please select Life coverage level.");
      }
    }
    return isValid;
  }
    });
  
