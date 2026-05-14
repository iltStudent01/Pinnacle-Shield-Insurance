document.addEventListener("DOMContentLoaded", function () {

  // --- Step 1: Stepper and Card Selection Logic ---
  const insuranceCards = document.querySelectorAll('.insurance-card');
  const detailsSection = document.getElementById('details-section');
  const autoFields = document.getElementById('auto-fields');
  const homeFields = document.getElementById('home-fields');
  const lifeFields = document.getElementById('life-fields');
  const calculateSection = document.getElementById('calculate-section');
  let calculateBtn = null;
  const resultsSection = document.getElementById('resultsSection');
  const quoteForm = document.getElementById('quoteForm');
  let selectedType = null;

  // Stepper elements
  const steps = document.querySelectorAll('.step');

  function updateStepper(currentStep) {
    steps.forEach((step, idx) => {
      step.classList.remove('active', 'completed');
      if (idx < currentStep) step.classList.add('completed');
      else if (idx === currentStep) step.classList.add('active');
    });
  }

  function hideAllFields() {
    autoFields.classList.add('hidden');
    homeFields.classList.add('hidden');
    lifeFields.classList.add('hidden');
    detailsSection.classList.add('hidden');
    calculateSection.classList.add('hidden');
  }

  insuranceCards.forEach(card => {
    card.addEventListener('click', function () {
      // Remove selection from all cards
      insuranceCards.forEach(c => c.classList.remove('selected'));
      // Mark this card as selected
      card.classList.add('selected');
      selectedType = card.getAttribute('data-type');
      // Set the corresponding hidden radio input
      if (selectedType === 'auto') document.getElementById('insuranceTypeAuto').checked = true;
      if (selectedType === 'home') document.getElementById('insuranceTypeHome').checked = true;
      if (selectedType === 'life') document.getElementById('insuranceTypeLife').checked = true;
      // Show details section and correct fields
      detailsSection.classList.remove('hidden');
      autoFields.classList.add('hidden');
      homeFields.classList.add('hidden');
      lifeFields.classList.add('hidden');
      if (selectedType === 'auto') autoFields.classList.remove('hidden');
      if (selectedType === 'home') homeFields.classList.remove('hidden');
      if (selectedType === 'life') lifeFields.classList.remove('hidden');
      // Show calculate button section
      calculateSection.classList.remove('hidden');
      // Update stepper to step 2
      updateStepper(1);
      // Scroll to details section for better UX
      detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // Keyboard accessibility
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Hide all fields and set stepper to step 1 on load
  hideAllFields();
  updateStepper(0);

  function clearFieldErrors(formSection) {
    const invalids = formSection.querySelectorAll('.is-invalid');
    invalids.forEach(el => el.classList.remove('is-invalid'));
    const feedbacks = formSection.querySelectorAll('.invalid-feedback');
    feedbacks.forEach(el => el.style.display = 'none');
  }

  function setFieldError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }


  // --- END Step 1 logic ---



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
      const feedback = input.parentElement.querySelector('.invalid-feedback');
      if (feedback) {
        feedback.textContent = message;
        feedback.style.display = 'block';
      }
    }
  }

    // Add real-time validation on blur for all form controls
    function addRealtimeValidation() {
      const allInputs = document.querySelectorAll('#quoteForm input, #quoteForm select');
      allInputs.forEach(input => {
        input.addEventListener('blur', function () {
          // Only validate visible fields
          if (input.offsetParent === null) return;
          // Remove previous error
          input.classList.remove('is-invalid');
          const feedback = input.parentElement.querySelector('.invalid-feedback');
          if (feedback) feedback.style.display = 'none';
          // Validate based on field
          const id = input.id;
          if (id.endsWith('Name')) {
            if (input.value.trim().length === 0) {
              showError(input, 'This field is required.');
            } else if (input.value.trim().length < 2) {
              showError(input, 'Please enter your full name (at least 2 characters).');
            }
              const val = input.value.trim();
              if (val.length === 0) {
                showError(input, 'This field is required.');
              } else if (val.length < 2) {
                showError(input, 'Please enter your full name (at least 2 characters).');
              } else if (/\d/.test(val)) {
                showError(input, 'Name cannot contain numbers.');
              }
          }
          if (id.endsWith('Age')) {
            let min = 0, max = 120;
            if (id.startsWith('auto')) { min = 16; max = 100; }
            else if (id.startsWith('home')) { min = 18; max = 100; }
            else if (id.startsWith('life')) { min = 18; max = 85; }
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (input.value < min || input.value > max) {
              showError(input, `Please enter your age (${min}-${max}).`);
            }
              else if (!/^\d+$/.test(input.value) || parseInt(input.value) < min || parseInt(input.value) > max) {
                showError(input, `Please enter your age (${min}-${max}), positive integer only.`);
              }
          }
          if (id.endsWith('Zip')) {
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (!/^\d{5}$/.test(input.value)) {
              showError(input, 'ZIP code must be exactly 5 digits.');
            }
          }
          if (id === 'vehicleYear') {
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (input.value < 1990 || input.value > 2026) {
              showError(input, 'Vehicle year must be between 1990 and 2026.');
            }
              else if (!/^\d+$/.test(input.value) || input.value < 1990 || input.value > 2026) {
                showError(input, 'Vehicle year must be between 1990 and 2026.');
              }
          }
          if (id === 'homeValue') {
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (input.value < 50000) {
              showError(input, 'Home value must be at least $50,000.');
            }
              else if (!/^\d+$/.test(input.value) || input.value < 50000) {
                showError(input, 'Home value must be at least $50,000.');
              }
          }
          if (id === 'yearBuilt') {
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (input.value < 1900 || input.value > 2026) {
              showError(input, 'Year built must be between 1900 and 2026.');
            }
              else if (!/^\d+$/.test(input.value) || input.value < 1900 || input.value > 2026) {
                showError(input, 'Year built must be a positive integer between 1900 and 2026.');
              }
          }
          if (id === 'squareFootage') {
            if (input.value === '') {
              showError(input, 'This field is required.');
            } else if (input.value < 500 || input.value > 10000) {
              showError(input, 'Square footage must be between 500 and 10,000.');
            }
              else if (!/^\d+$/.test(input.value) || input.value < 500 || input.value > 10000) {
                showError(input, 'Square footage must be a positive integer between 500 and 10,000.');
              }
          }
          if (id === 'vehicleModel') {
            if (input.value.trim().length === 0) {
              showError(input, 'This field is required.');
            } else if (input.value.trim().length < 2) {
              showError(input, 'Please enter the vehicle model (at least 2 characters).');
            }
          }
        });
      });
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

    let firstInvalid = null;
    let errorSummary = [];

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

      if (name.value.trim().length === 0) {
        showError(name, "This field is required.");
        isValid = false;
        errorSummary.push('Full Name is required.');
        if (!firstInvalid) firstInvalid = name;
      } else if (name.value.trim().length < 2) {
        showError(name, "Please enter your full name (at least 2 characters).");
        isValid = false;
        errorSummary.push('Full Name must be at least 2 characters.');
        if (!firstInvalid) firstInvalid = name;
      }
        const nameVal = name.value.trim();
        if (nameVal.length === 0) {
          showError(name, "This field is required.");
          isValid = false;
          errorSummary.push('Full Name is required.');
          if (!firstInvalid) firstInvalid = name;
        } else if (nameVal.length < 2) {
          showError(name, "Please enter your full name (at least 2 characters).");
          isValid = false;
          errorSummary.push('Full Name must be at least 2 characters.');
          if (!firstInvalid) firstInvalid = name;
        } else if (/\d/.test(nameVal)) {
          showError(name, "Name cannot contain numbers.");
          isValid = false;
          errorSummary.push('Name cannot contain numbers.');
          if (!firstInvalid) firstInvalid = name;
        }
      if (age.value === "") {
        showError(age, "This field is required.");
        isValid = false;
        errorSummary.push('Age is required.');
        if (!firstInvalid) firstInvalid = age;
      } else if (age.value < 16 || age.value > 100) {
        showError(age, "Please enter your age (16-100).");
        isValid = false;
        errorSummary.push('Age must be between 16 and 100.');
        if (!firstInvalid) firstInvalid = age;
      }
        else if (!/^\d+$/.test(age.value) || age.value < 16 || age.value > 100) {
          showError(age, "Please enter your age (16-100), positive integer only.");
          isValid = false;
          errorSummary.push('Age must be a positive integer between 16 and 100.');
          if (!firstInvalid) firstInvalid = age;
        }
      if (zip.value === "") {
        showError(zip, "This field is required.");
        isValid = false;
        errorSummary.push('ZIP Code is required.');
        if (!firstInvalid) firstInvalid = zip;
      } else if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
        errorSummary.push('ZIP code must be exactly 5 digits.');
        if (!firstInvalid) firstInvalid = zip;
      }
      if (year.value === "") {
        showError(year, "This field is required.");
        isValid = false;
        errorSummary.push('Vehicle Year is required.');
        if (!firstInvalid) firstInvalid = year;
      } else if (year.value < 1990 || year.value > 2026) {
        showError(year, "Vehicle year must be between 1990 and 2026.");
        isValid = false;
        errorSummary.push('Vehicle year must be between 1990 and 2026.');
        if (!firstInvalid) firstInvalid = year;
      }
      if (make.value === "") {
        showError(make, "Please select a vehicle make.");
        isValid = false;
        errorSummary.push('Vehicle Make is required.');
        if (!firstInvalid) firstInvalid = make;
      }
      const modelVal = model.value.trim();
      if (modelVal.length === 0) {
        showError(model, "This field is required.");
        isValid = false;
        errorSummary.push('Vehicle Model is required.');
        if (!firstInvalid) firstInvalid = model;
      } else if (modelVal.length < 2) {
        showError(model, "Please enter the vehicle model (at least 2 characters).");
        isValid = false;
        errorSummary.push('Vehicle Model must be at least 2 characters.');
        if (!firstInvalid) firstInvalid = model;
      } else if (!/[a-zA-Z]/.test(modelVal)) {
        showError(model, "Model must contain at least one letter.");
        isValid = false;
        errorSummary.push('Model must contain at least one letter.');
        if (!firstInvalid) firstInvalid = model;
      }
      if (mileage.value === "") {
        showError(mileage, "Please select annual mileage.");
        isValid = false;
        errorSummary.push('Annual Mileage is required.');
        if (!firstInvalid) firstInvalid = mileage;
      }
      if (!coverage) {
        showCustomError("autoCoverageError", "Please select Auto coverage level.");
        isValid = false;
        errorSummary.push('Auto Coverage Level is required.');
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

      if (name.value.trim().length === 0) {
        showError(name, "This field is required.");
        isValid = false;
        errorSummary.push('Full Name is required.');
        if (!firstInvalid) firstInvalid = name;
      } else if (name.value.trim().length < 2) {
        showError(name, "Please enter your full name (at least 2 characters).");
        isValid = false;
        errorSummary.push('Full Name must be at least 2 characters.');
        if (!firstInvalid) firstInvalid = name;
      }
      if (age.value === "") {
        showError(age, "This field is required.");
        isValid = false;
        errorSummary.push('Age is required.');
        if (!firstInvalid) firstInvalid = age;
      } else if (age.value < 18 || age.value > 100) {
        showError(age, "Please enter your age (18-100).");
        isValid = false;
        errorSummary.push('Age must be between 18 and 100.');
        if (!firstInvalid) firstInvalid = age;
      }
        else if (!/^\d+$/.test(age.value) || age.value < 18 || age.value > 100) {
          showError(age, "Please enter your age (18-100), positive integer only.");
          isValid = false;
          errorSummary.push('Age must be a positive integer between 18 and 100.');
          if (!firstInvalid) firstInvalid = age;
        }
      if (zip.value === "") {
        showError(zip, "This field is required.");
        isValid = false;
        errorSummary.push('ZIP Code is required.');
        if (!firstInvalid) firstInvalid = zip;
      } else if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
        errorSummary.push('ZIP code must be exactly 5 digits.');
        if (!firstInvalid) firstInvalid = zip;
      }
      if (value.value === "") {
        showError(value, "This field is required.");
        isValid = false;
        errorSummary.push('Home Value is required.');
        if (!firstInvalid) firstInvalid = value;
      } else if (value.value < 50000) {
        showError(value, "Home value must be at least $50,000.");
        isValid = false;
        errorSummary.push('Home value must be at least $50,000.');
        if (!firstInvalid) firstInvalid = value;
      }
        else if (!/^\d+$/.test(value.value) || value.value < 50000) {
          showError(value, "Home value must be at least $50,000.");
          isValid = false;
          errorSummary.push('Home value must be a positive integer at least $50,000.');
          if (!firstInvalid) firstInvalid = value;
        }
      if (yearBuilt.value === "") {
        showError(yearBuilt, "This field is required.");
        isValid = false;
        errorSummary.push('Year Built is required.');
        if (!firstInvalid) firstInvalid = yearBuilt;
      } else if (yearBuilt.value < 1900 || yearBuilt.value > 2026) {
        showError(yearBuilt, "Year built must be between 1900 and 2026.");
        isValid = false;
        errorSummary.push('Year built must be between 1900 and 2026.');
        if (!firstInvalid) firstInvalid = yearBuilt;
      }
        else if (!/^\d+$/.test(yearBuilt.value) || yearBuilt.value < 1900 || yearBuilt.value > 2026) {
          showError(yearBuilt, "Year built must be a positive integer between 1900 and 2026.");
          isValid = false;
          errorSummary.push('Year built must be a positive integer between 1900 and 2026.');
          if (!firstInvalid) firstInvalid = yearBuilt;
        }
      if (sqft.value === "") {
        showError(sqft, "This field is required.");
        isValid = false;
        errorSummary.push('Square Footage is required.');
        if (!firstInvalid) firstInvalid = sqft;
      } else if (sqft.value < 500 || sqft.value > 10000) {
        showError(sqft, "Square footage must be between 500 and 10,000.");
        isValid = false;
        errorSummary.push('Square footage must be between 500 and 10,000.');
        if (!firstInvalid) firstInvalid = sqft;
      }
        else if (!/^\d+$/.test(sqft.value) || sqft.value < 500 || sqft.value > 10000) {
          showError(sqft, "Square footage must be a positive integer between 500 and 10,000.");
          isValid = false;
          errorSummary.push('Square footage must be a positive integer between 500 and 10,000.');
          if (!firstInvalid) firstInvalid = sqft;
        }
      if (construction.value === "") {
        showError(construction, "Please select a construction type.");
        isValid = false;
        errorSummary.push('Construction Type is required.');
        if (!firstInvalid) firstInvalid = construction;
      }
      if (!coverage) {
        showCustomError("homeCoverageError", "Please select Home coverage level.");
        isValid = false;
        errorSummary.push('Home Coverage Level is required.');
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

      if (name.value.trim().length === 0) {
        showError(name, "This field is required.");
        isValid = false;
        errorSummary.push('Full Name is required.');
        if (!firstInvalid) firstInvalid = name;
      } else if (name.value.trim().length < 2) {
        showError(name, "Please enter your full name (at least 2 characters).");
        isValid = false;
        errorSummary.push('Full Name must be at least 2 characters.');
        if (!firstInvalid) firstInvalid = name;
      }
      if (age.value === "") {
        showError(age, "This field is required.");
        isValid = false;
        errorSummary.push('Age is required.');
        if (!firstInvalid) firstInvalid = age;
      } else if (age.value < 18 || age.value > 85) {
        showError(age, "Please enter your age (18-85).");
        isValid = false;
        errorSummary.push('Age must be between 18 and 85.');
        if (!firstInvalid) firstInvalid = age;
      }
      if (zip.value === "") {
        showError(zip, "This field is required.");
        isValid = false;
        errorSummary.push('ZIP Code is required.');
        if (!firstInvalid) firstInvalid = zip;
      } else if (!validateZip(zip.value)) {
        showError(zip, "ZIP code must be exactly 5 digits.");
        isValid = false;
        errorSummary.push('ZIP code must be exactly 5 digits.');
        if (!firstInvalid) firstInvalid = zip;
      }
      if (gender.value === "") {
        showError(gender, "Please select your gender.");
        isValid = false;
        errorSummary.push('Gender is required.');
        if (!firstInvalid) firstInvalid = gender;
      }
      if (!smoker) {
        showCustomError("smokerError", "Please select smoker Yes or No.");
        isValid = false;
        errorSummary.push('Smoker selection is required.');
      }
      if (amount.value === "") {
        showError(amount, "Please select a coverage amount.");
        isValid = false;
        errorSummary.push('Coverage Amount is required.');
        if (!firstInvalid) firstInvalid = amount;
      }
      if (exercise.value === "") {
        showError(exercise, "Please select your exercise frequency.");
        isValid = false;
        errorSummary.push('Exercise Frequency is required.');
        if (!firstInvalid) firstInvalid = exercise;
      }
      if (!coverage) {
        showCustomError("lifeCoverageError", "Please select Life coverage level.");
        isValid = false;
        errorSummary.push('Life Coverage Level is required.');
      }
    }

    // Show error summary if any
    const summaryDiv = document.getElementById('formErrorSummary');
    if (summaryDiv) {
      if (!isValid && errorSummary.length > 0) {
        summaryDiv.innerHTML = '<ul class="mb-0"><li>' + errorSummary.join('</li><li>') + '</li></ul>';
        summaryDiv.classList.remove('d-none');
      } else {
        summaryDiv.innerHTML = '';
        summaryDiv.classList.add('d-none');
      }
    }
    // Focus first invalid field
    if (!isValid && firstInvalid) {
      firstInvalid.focus();
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
      const quoteSummary = document.getElementById("quoteSummary");
      const cardBody = resultsSection.querySelector('.card-body');
      let check = cardBody.querySelector('.quote-success-check');
      if (!check) {
        check = document.createElement('div');
        check.className = 'quote-success-check mb-2';
        cardBody.insertBefore(check, cardBody.firstChild);
      }
      check.innerHTML = '<span style="font-size:2.5rem;color:#4B6E57;">&#10003;</span>';
      check.style.display = 'block';

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
        annual: premium * 12,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      // Animate results section
      resultsSection.classList.remove("hidden");
      resultsSection.classList.add("showing");
      setTimeout(() => resultsSection.classList.remove("showing"), 600);

      quoteName.textContent = quoteData.name;
      quoteType.textContent = quoteData.type;
      monthlyPremium.textContent = formatCurrency(quoteData.monthly);
      annualPremium.textContent = formatCurrency(quoteData.annual);

      // Add summary
      if (quoteSummary) {
        quoteSummary.textContent = `Success! Your personalized ${quoteData.type} quote is ready.`;
      }

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

      // Store latest quote for saving
      window.latestQuote = quoteData;
      secondQuote = quoteData;
    }


  // Calculate quote button (re-bind on DOMContentLoaded and after insurance type selection)
  function bindCalculateBtn() {
    calculateBtn = document.getElementById('calculateQuoteBtn');
    if (calculateBtn) {
      calculateBtn.onclick = function () {
        // Use selectedType from card selection
        if (!selectedType) {
          alert("Please select an insurance type.");
          return;
        }
        // Validate form for the selected type
        if (!validateForm()) return;

        let premium = 0;
        if (selectedType === "auto") {
          premium = calculateAutoQuote();
        } else if (selectedType === "home") {
          premium = calculateHomeQuote();
        } else if (selectedType === "life") {
          premium = calculateLifeQuote();
        }
        showResults(selectedType, premium);
      };
    }
  }
  // Bind on load
  bindCalculateBtn();
  // Also re-bind after insurance type selection (in case button is re-rendered)
  insuranceCards.forEach(card => {
    card.addEventListener('click', bindCalculateBtn);
  });

  // Get another quote
    anotherQuoteBtn.addEventListener("click", function () {
      quoteForm.reset();
      clearErrors();
      hideAllFields();
      resultsSection.classList.add("hidden");
      // Remove checkmark if present
      const cardBody = resultsSection.querySelector('.card-body');
      const check = cardBody ? cardBody.querySelector('.quote-success-check') : null;
      if (check) check.style.display = 'none';
      // Clear summary
      const quoteSummary = document.getElementById("quoteSummary");
      if (quoteSummary) quoteSummary.textContent = '';
    });

    // --- Saved Quotes Logic ---
    const saveQuoteBtn = document.getElementById('saveQuoteBtn');
    const savedQuotesList = document.getElementById('savedQuotesList');
    let savedQuotes = [];

    function renderSavedQuotes() {
      if (!savedQuotesList) return;
      if (savedQuotes.length === 0) {
        savedQuotesList.innerHTML = '<span class="text-muted small">No saved quotes yet. Calculate a quote and click <b>Save Quote</b> to save it.</span>';
        return;
      }
      savedQuotesList.innerHTML = '';
      savedQuotes.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'saved-quote-item border rounded p-2 mb-2 d-flex flex-column flex-md-row align-items-md-center justify-content-between';
        div.innerHTML = `
          <div>
            <span class="fw-semibold">${q.name}</span> &mdash; <span>${q.type}</span><br>
            <span class="text-success">${formatCurrency(q.monthly)}/mo</span> <span class="text-muted">(${formatCurrency(q.annual)}/yr)</span>
            <span class="text-muted small ms-2">${q.date} ${q.time}</span>
          </div>
          <div class="mt-2 mt-md-0">
            <button class="btn btn-sm btn-outline-danger ms-2" data-idx="${idx}">Remove</button>
          </div>
        `;
        // Remove handler
        div.querySelector('button').addEventListener('click', function() {
          savedQuotes.splice(idx, 1);
          renderSavedQuotes();
        });
        savedQuotesList.appendChild(div);
      });
    }

    if (saveQuoteBtn) {
      saveQuoteBtn.addEventListener('click', function () {
        if (!window.latestQuote) return;
        savedQuotes.push({...window.latestQuote});
        renderSavedQuotes();
        // Visual feedback
        saveQuoteBtn.textContent = 'Saved!';
        saveQuoteBtn.classList.remove('btn-success');
        saveQuoteBtn.classList.add('btn-outline-success');
        setTimeout(() => {
          saveQuoteBtn.textContent = 'Save Quote';
          saveQuoteBtn.classList.remove('btn-outline-success');
          saveQuoteBtn.classList.add('btn-success');
        }, 1200);
      });
    }

    // Render on load in case of reload
    renderSavedQuotes();

  // =========================================
  // BONUS A: SIDE-BY-SIDE QUOTE COMPARISON
  // =========================================

    // Add real-time validation on DOMContentLoaded
    addRealtimeValidation();
  // Removed compareQuoteBtn and resetComparisonBtn event listeners (not present in HTML)
});
