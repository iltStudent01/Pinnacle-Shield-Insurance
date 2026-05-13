document.addEventListener("DOMContentLoaded", function () {
  const typeRadios = document.querySelectorAll('input[name="insuranceType"]');
  const autoFields = document.getElementById("auto-fields");
  const homeFields = document.getElementById("home-fields");
  const lifeFields = document.getElementById("life-fields");
  const calculateBtn = document.getElementById("calculateQuoteBtn");
  const resultsSection = document.getElementById("resultsSection");
  const anotherQuoteBtn = document.getElementById("anotherQuoteBtn");
  const quoteForm = document.getElementById("quoteForm");

  // =========================================
  // STEP 7: FORM SWITCHING
  // =========================================

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

  // =========================================
  // STEP 7: VALIDATION HELPERS
  // =========================================

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

    let isValid = true;

    // -------------------------
    // AUTO VALIDATION
    // -------------------------

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
        alert("Please select Auto coverage level.");
        isValid = false;
      }
    }

    // -------------------------
    // HOME VALIDATION
    // -------------------------


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
        alert("Please select Home coverage level.");
        isValid = false;
      }
    }

     // -------------------------
    // LIFE VALIDATION
    // -------------------------


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
      if (!coverage) 
        alert("Please select Life coverage level.");
        isValid = false;
      }
    }
    return isValid;
  }

  // =========================================
  // STEP 8: QUOTE CALCULATION
  // =========================================

  function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
  }

  function calculateAutoQuote() {
    const age = parseInt(document.getElementById("autoAge").value);
    const year = parseInt(document.getElementById("vehicleYear").value);
    const mileage = document.getElementById("annualMileage").value;
    const coverage = getSelectedRadioValue("autoCoverage");

    let premium = 50;

    if (age < 25) {
      premium *= 1.5;
    } else if (age > 65) {
      premium *= 1.3;
    }
     const vehicleAge = 2026 - year;
    if (vehicleAge < 3) {
      premium *= 1.3;
    } else if (vehicleAge <= 10) {
      premium *= 1.0;
    } else {
      premium *= 0.8;
    }

    if (mileage === "under5000") premium *= 0.8;
    else if (mileage === "5000-10000") premium *= 1.0;
    else if (mileage === "10001-15000") premium *= 1.1;
    else if (mileage === "15001-20000") premium *= 1.3;
    else if (mileage === "over20000") premium *= 1.5;

    if (coverage === "basic") premium *= 0.8;
    else if (coverage === "standard") premium *= 1.0;
    else if (coverage === "premium") premium *= 1.4;

    return premium;
  }

  function calculateHomeQuote() {
    const value = parseFloat(document.getElementById("homeValue").value);
    const yearBuilt = parseInt(document.getElementById("yearBuilt").value);
    const sqft = parseInt(document.getElementById("squareFootage").value);
    const security = document.getElementById("securitySystem").checked;
    const sprinklers = document.getElementById("fireSprinklers").checked;
    const coverage = getSelectedRadioValue("homeCoverage");

    let premium = (value * 0.003) / 12;

    if (yearBuilt < 1970) premium *= 1.4;
    else if (yearBuilt < 2000) premium *= 1.1;

    premium += sqft * 0.01;

    if (security) premium *= 0.95;
    if (sprinklers) premium *= 0.92;

    if (coverage === "basic") premium *= 0.8;
    else if (coverage === "standard") premium *= 1.0;
    else if (coverage === "premium") premium *= 1.4;

    return premium;
  }

  function calculateLifeQuote() {
    const age = parseInt(document.getElementById("lifeAge").value);
    const amount = parseFloat(document.getElementById("coverageAmount").value);
    const smoker = document.querySelector('input[name="smoker"]:checked').value;
    const exercise = document.getElementById("exerciseFrequency").value;
    const preExisting = document.getElementById("preExistingConditions").checked;
    const coverage = getSelectedRadioValue("lifeCoverage");

    let premium = (amount * 0.0005) / 12;

    if (age >= 18 && age <= 30) premium *= 1.0;
    else if (age <= 45) premium *= 1.5;
    else if (age <= 60) premium *= 2.5;
    else premium *= 4.0;

    if (smoker === "yes") premium *= 2.0;

    if (exercise === "rarely") premium *= 1.3;
    else if (exercise === "1-2") premium *= 1.1;
    else if (exercise === "3-4") premium *= 1.0;
    else if (exercise === "5plus") premium *= 0.9;

    if (preExisting) premium *= 1.5;

    if (coverage === "basic") premium *= 0.8;
    else if (coverage === "standard") premium *= 1.0;
    else if (coverage === "premium") premium *= 1.4;

    return premium;
  }

  // =========================================
  // STEP 9: DISPLAY RESULTS
  // =========================================

  function showResults(type, premium) {
    const quoteName = document.getElementById("quoteName");
    const quoteType = document.getElementById("quoteType");
    const monthlyPremium = document.getElementById("monthlyPremium");
    const annualPremium = document.getElementById("annualPremium");
    const breakdownBody = document.getElementById("breakdownBody");

    let name = "";

    if (type === "auto") {
      name = document.getElementById("autoName").value;
    } else if (type === "home") {
      name = document.getElementById("homeName").value;
    } else if (type === "life") {
      name = document.getElementById("lifeName").value;
    }

    quoteName.textContent = name;
    quoteType.textContent =
      type === "auto" ? "Auto Insurance" :
      type === "home" ? "Home Insurance" :
      "Life Insurance";

      monthlyPremium.textContent = formatCurrency(premium);
    annualPremium.textContent = formatCurrency(premium * 12);

    breakdownBody.innerHTML = "";
    resultsSection.classList.remove("hidden");
  }

  // =========================================
  // CALCULATE BUTTON EVENT
  // =========================================
  calculateBtn.addEventListener("click", function () {
    if (!validateForm()) {
      return;
    }

    const type = getSelectedInsuranceType();
    let premium = 0;

    if (type === "auto") {
      premium = calculateAutoQuote();
    } else if (type === "home") {
      premium = calculateHomeQuote();
    } else if (type === "life") {
      premium = calculateLifeQuote();
    }

    showResults(type, premium);
  });

  // =========================================
  // GET ANOTHER QUOTE BUTTON
  // =========================================
  anotherQuoteBtn.addEventListener("click", function () {
    quoteForm.reset();
    clearErrors();
    hideAllFields();
    resultsSection.classList.add("hidden");
  });
});






    });
  
