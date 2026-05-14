document.addEventListener("DOMContentLoaded", function () {
  const typeRadios = document.querySelectorAll('input[name="insuranceType"]');
  const autoFields = document.getElementById("auto-fields");
  const homeFields = document.getElementById("home-fields");
  const lifeFields = document.getElementById("life-fields");
  const calculateBtn = document.getElementById("calculateQuoteBtn");
  const resultsSection = document.getElementById("resultsSection");
  const anotherQuoteBtn = document.getElementById("anotherQuoteBtn");
  const compareQuoteBtn = document.getElementById("compareQuoteBtn");
  const comparisonSection = document.getElementById("comparisonSection");
  const resetComparisonBtn = document.getElementById("resetComparisonBtn");
  const quoteForm = document.getElementById("quoteForm");

  let firstQuote = null;
  let secondQuote = null;

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

    const customErrors = document.querySelectorAll(".text-danger.small");
    customErrors.forEach(function (el) {
      el.textContent = "";
    });
  }

  function showError(input, message) {
    if (input) {
      input.classList.add("is-invalid");
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = message;
      }
    }
  }

  function showCustomError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
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

    if (!insuranceType) {
      alert("Please select an insurance type.");
      return false;
    }

    let isValid = true;

    // AUTO VALIDATION
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
        showError(name, "Please enter at least 2 characters for your full name.");
        isValid = false;
      }
      if (age.value === "" || age.value < 16 || age.value > 100) {
        showError(age, "Please enter a valid age between 16 and 100.");
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
      }
      if (year.value === "" || year.value < 1990 || year.value > 2026) {
        showError(year, "Vehicle year must be between 1990 and 2026.");
        isValid = false;
      }
      if (make.value === "") {
        showError(make, "Please select a vehicle make.");
        isValid = false;
      }
      if (model.value.trim().length < 2) {
        showError(model, "Please enter at least 2 characters for the vehicle model.");
        isValid = false;
      }
      if (mileage.value === "") {
        showError(mileage, "Please select annual mileage.");
        isValid = false;
      }
      if (!coverage) {
        showCustomError("autoCoverageError", "Please select Auto coverage level.");
        isValid = false;
      }
    }

    // HOME VALIDATION
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
        showError(name, "Please enter at least 2 characters for your full name.");
        isValid = false;
      }
      if (age.value === "" || age.value < 18 || age.value > 100) {
        showError(age, "Please enter a valid age between 18 and 100.");
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
      }
      if (value.value === "" || value.value < 50000) {
        showError(value, "Home value must be at least $50,000.");
        isValid = false;
      }
      if (yearBuilt.value === "" || yearBuilt.value < 1900 || yearBuilt.value > 2026) {
        showError(yearBuilt, "Year built must be between 1900 and 2026.");
        isValid = false;
      }
      if (sqft.value === "" || sqft.value < 500 || sqft.value > 10000) {
        showError(sqft, "Square footage must be between 500 and 10,000.");
        isValid = false;
      }
      if (construction.value === "") {
        showError(construction, "Please select a construction type.");
        isValid = false;
      }
      if (!coverage) {
        showCustomError("homeCoverageError", "Please select Home coverage level.");
        isValid = false;
      }
    }

    // LIFE VALIDATION
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
        showError(name, "Please enter at least 2 characters for your full name.");
        isValid = false;
      }
      if (age.value === "" || age.value < 18 || age.value > 85) {
        showError(age, "Please enter a valid age between 18 and 85.");
        isValid = false;
      }
      if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
      }
      if (gender.value === "") {
        showError(gender, "Please select your gender.");
        isValid = false;
      }
      if (!smoker) {
        showCustomError("smokerError", "Please select smoker Yes or No.");
        isValid = false;
      }
      if (amount.value === "") {
        showError(amount, "Please select a coverage amount.");
        isValid = false;
      }
      if (exercise.value === "") {
        showError(exercise, "Please select your exercise frequency.");
        isValid = false;
      }
      if (!coverage) {
        showCustomError("lifeCoverageError", "Please select Life coverage level.");
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

    if (age < 25) premium *= 1.5;
    else if (age > 65) premium *= 1.3;

    const vehicleAge = 2026 - year;
    if (vehicleAge < 3) premium *= 1.3;
    else if (vehicleAge <= 10) premium *= 1.0;
    else premium *= 0.8;

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
  // STEP 10: BREAKDOWN TABLE HELPER
  // =========================================
  function addBreakdownRow(tbody, factor, userValue, impact) {
    const row = document.createElement("tr");

    const factorCell = document.createElement("td");
    factorCell.textContent = factor;

    const valueCell = document.createElement("td");
    valueCell.textContent = userValue;

    const impactCell = document.createElement("td");
    impactCell.textContent = impact;

    row.appendChild(factorCell);
    row.appendChild(valueCell);
    row.appendChild(impactCell);

    tbody.appendChild(row);
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

    const quoteData = {
      name: name,
      type: type === "auto" ? "Auto Insurance" : type === "home" ? "Home Insurance" : "Life Insurance",
      monthly: premium,
      annual: premium * 12
    };

    quoteName.textContent = quoteData.name;
    quoteType.textContent = quoteData.type;
    monthlyPremium.textContent = formatCurrency(quoteData.monthly);
    annualPremium.textContent = formatCurrency(quoteData.annual);

    breakdownBody.innerHTML = "";

    if (type === "auto") {
      addBreakdownRow(breakdownBody, "Age", document.getElementById("autoAge").value, "Young/older driver adjustment");
      addBreakdownRow(breakdownBody, "Vehicle Year", document.getElementById("vehicleYear").value, "Vehicle age adjustment");
      addBreakdownRow(breakdownBody, "Mileage", document.getElementById("annualMileage").value, "Mileage adjustment");
      addBreakdownRow(breakdownBody, "Coverage Level", getSelectedRadioValue("autoCoverage"), "Coverage multiplier");
    }

    if (type === "home") {
      addBreakdownRow(breakdownBody, "Home Value", document.getElementById("homeValue").value, "Base premium based on home value");
      addBreakdownRow(breakdownBody, "Year Built", document.getElementById("yearBuilt").value, "Age of home adjustment");
      addBreakdownRow(breakdownBody, "Square Footage", document.getElementById("squareFootage").value, "Size adjustment");
      addBreakdownRow(breakdownBody, "Coverage Level", getSelectedRadioValue("homeCoverage"), "Coverage multiplier");
    }

    if (type === "life") {
      addBreakdownRow(breakdownBody, "Age", document.getElementById("lifeAge").value, "Age-based risk adjustment");
      addBreakdownRow(breakdownBody, "Coverage Amount", document.getElementById("coverageAmount").value, "Policy size adjustment");
      addBreakdownRow(breakdownBody, "Smoker", document.querySelector('input[name="smoker"]:checked').value, "Health risk adjustment");
      addBreakdownRow(breakdownBody, "Exercise Frequency", document.getElementById("exerciseFrequency").value, "Lifestyle adjustment");
    }

    resultsSection.classList.remove("hidden");
    secondQuote = quoteData;
  }

  // Calculate quote button
  calculateBtn.addEventListener("click", function () {
    if (!validateForm()) return;

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

  // Get another quote
  anotherQuoteBtn.addEventListener("click", function () {
    quoteForm.reset();
    clearErrors();
    hideAllFields();
    resultsSection.classList.add("hidden");
  });

  // =========================================
  // BONUS A: SIDE-BY-SIDE QUOTE COMPARISON
  // =========================================
  compareQuoteBtn.addEventListener("click", function () {
    if (!secondQuote) {
      alert("Please calculate a quote first.");
      return;
    }

    if (!firstQuote) {
      firstQuote = secondQuote;
      alert("First quote saved. Now calculate a second quote to compare.");
      quoteForm.reset();
      clearErrors();
      hideAllFields();
      resultsSection.classList.add("hidden");
      return;
    }

    document.getElementById("quote1Name").textContent = firstQuote.name;
    document.getElementById("quote1Type").textContent = firstQuote.type;
    document.getElementById("quote1Monthly").textContent = formatCurrency(firstQuote.monthly);
    document.getElementById("quote1Annual").textContent = formatCurrency(firstQuote.annual);

    document.getElementById("quote2Name").textContent = secondQuote.name;
    document.getElementById("quote2Type").textContent = secondQuote.type;
    document.getElementById("quote2Monthly").textContent = formatCurrency(secondQuote.monthly);
    document.getElementById("quote2Annual").textContent = formatCurrency(secondQuote.annual);

    comparisonSection.classList.remove("hidden");
  });

  resetComparisonBtn.addEventListener("click", function () {
    firstQuote = null;
    secondQuote = null;

    comparisonSection.classList.add("hidden");
    quoteForm.reset();
    clearErrors();
    hideAllFields();
    resultsSection.classList.add("hidden");
  });
});
