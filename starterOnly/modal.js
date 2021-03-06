const navbar = document.querySelector(".main-navbar");

//hide nav bar on mobile & tablet versions
function openNav() {
  if (navbar.style.display === "flex") {
    navbar.removeAttribute("style");
  } else {
    navbar.style.display = "flex";
  }
}

// DOM Elements
const modalbg = document.querySelector(".background");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseButton = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Issue 1

//close modal event
modalCloseButton.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


// Issue 2-3

// DOM Elements
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const numberOfParticipations = document.getElementById('quantity');
const checkboxesCity = document.querySelectorAll(".city-checkbox-input");
const formDataCities = document.querySelector('.formData--cities');
const checkboxGCU = document.getElementById('checkbox1');
const formDataGCU  = document.querySelector('.formData--GCU');

// fields format
const nameFormat = /^[A-Za-z\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ']{2,}$/;
const emailAddressFormat = /\S+@\S+\.\S+/;
const dateFormat = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const participationsFormat = /^[0-9]*$/;


const fields = {
  firstname: false,
  lastname: false,
  email: false,
  birthdate: false,
  numberOfParticipations: false,
  checkboxGCU: true,
  numberOfLocations: 0,
  numberOfCitiesChecked: 0
}


//error message is displayed when field is invalid	
function showErrorMessage(field, message) {
  field.setAttribute('data-error', message);
  field.setAttribute('data-error-visible','true')
}

//error message is hidden 
function hideErrorMessage(field) {
  field.removeAttribute('data-error');
  field.removeAttribute('data-error-visible')
}


// FIRSTNAME & LASTNAME

// firstname/lastname field events: event occurs when an element loses focus; 
//error messages are displayed when fields are invalid (otherwise they are hidden)
firstname.addEventListener('blur', function () {
  if (validateName(firstname.value) === true) {
    fields.firstname = true;
    hideErrorMessage(firstname.parentElement)
  } else {
    fields.firstname = false;
    showErrorMessage(firstname.parentElement, 'Veuillez entrer au moins 2 caractères')
  }
});

lastname.addEventListener('blur', function () {
  if (validateName(lastname.value) === true) {
    fields.lastname = true;
    hideErrorMessage(lastname.parentElement)
  } else {
    fields.lastname = false;
    showErrorMessage(lastname.parentElement, 'Veuillez entrer au moins 2 caractères')
  }
});

//name validation: make sure field is not empty and has the right format (min. 2 characters)
function validateName(text) {
  if ((text.length != 0) && (nameFormat.test(text))) {
    return true;
  } else {
    return false;
  }
}


// EMAIL 

// email field event 
//error message is displayed when field is invalid	
email.addEventListener('blur', function () {
  if (validateEmail(email.value) === true) {
    fields.email = true;
    hideErrorMessage(email.parentElement)
  } else {
    fields.email = false;
    showErrorMessage(email.parentElement, 'Veuillez entrer une adresse mail valide')
  }
});

//email validation: make sure field is not empty and has the right format (= valid email address)
function validateEmail(text) {
  if ((text.length != 0) && (emailAddressFormat.test(text))) {
    return true;
  } else {
    return false;
  }
}


//BIRTHDATE 

// birthdate field event 
// error message is displayed when field is invalid
birthdate.addEventListener('blur', function () {
  if (validateBirthdate(birthdate.value) === true) {
    fields.birthdate = true;
    hideErrorMessage(birthdate.parentElement);
  } else {
    fields.birthdate = false;
    showErrorMessage(birthdate.parentElement, 'Veuillez entrer une date de naissance valide');
  }
});


//birthdate validation: make sure field is not empty and has the right format (= JJ/MM/YYYY) + check on year (dates in the future are invalid)
function validateBirthdate(text) {
  const parsedDate = birthdate.value.split('-');
  const birthdateYear = parseInt(parsedDate[0]);
  const todaysYear = new Date().getFullYear();
  if (text.length != 0 &&
    birthdateYear <= todaysYear &&
    dateFormat.test(text)) {
    return true;
  } else {
    return false;
  }
}


//NUMBER OF PARTICIPATIONS & LOCATION

// number of participations => quantity 

// participations field event 
// error message is displayed when field is invalid
numberOfParticipations.addEventListener('input', function () {
  if (validateParticipations(numberOfParticipations.value) === true) {
    fields.numberOfParticipations = true;
    hideErrorMessage(numberOfParticipations.parentElement)
  } else {
    fields.numberOfParticipations = false;
    showErrorMessage(numberOfParticipations.parentElement, 'Veuillez entrer un nombre')
  }
});


// participations validation: make sure field has the right format (integer, not decimal) 
function validateParticipations(text) {
  if (participationsFormat.test(text)) {
    return true;
  } else {
    return false;
  }
}

//when checkbox is checked -> number of cities checked is incremented
checkboxesCity.forEach((cityCheckbox) => {
  cityCheckbox.addEventListener("change", function () {
    if (this.checked) {
      fields.numberOfCitiesChecked += 1;
    } else {
      fields.numberOfCitiesChecked -= 1;
    }
  })
});

// make sure at least one city is checked if number of participations >= 1
function atLeastOneCityChecked() {
  if 
  ((numberOfParticipations.value == 0 && fields.numberOfCitiesChecked == 0) 
  || (fields.numberOfCitiesChecked <= numberOfParticipations.value && fields.numberOfCitiesChecked >= 1)) {
    return true;
  } else if 
  ((fields.numberOfCitiesChecked > numberOfParticipations.value) 
  || (fields.numberOfCitiesChecked == 0) && (numberOfParticipations.value != 0)) {
    return false;
  }
  return false;
}

//error messages are displayed if no city has been checked or if numberOfCitiesChecked > numberOfParticipations
function showErrorCityCheckbox(formData) {
  if (fields.numberOfCitiesChecked > numberOfParticipations.value) {
    showErrorMessage(formData, "Vous ne pouvez pas sélectionner un nombre de villes supérieur à celui de vos participations")
  } else if (fields.numberOfCitiesChecked == 0 && numberOfParticipations.value != 0) {
    showErrorMessage(formData, "Veuillez sélectionner une ville")
  }
}


function hideErrorCityCheckbox() {
  if
    ((numberOfParticipations.value == 0 && fields.numberOfCitiesChecked == 0)
    || (fields.numberOfCitiesChecked <= numberOfParticipations.value && fields.numberOfCitiesChecked >= 1)) {
      errorMessageCheckboxes.innerHTML = "";
  }
}


// GCU CHECKBOX

// checkbox GCU field event : event occurs when the checked state has changed;
// this checkbox is checked by default; if user unchecks it, error message is displayed
checkboxGCU.addEventListener('change', function () {
  hideErrorMessage(formDataGCU);
  if (validateCheckboxGCU() === true) {
    fields.checkboxGCU = true;
  } else {
    fields.checkboxGCU = false;
    showErrorMessage(formDataGCU, "Veuillez accepter les conditions d'utilisation")
  }
});

// checkbox GCU validation
function validateCheckboxGCU() {
  if (checkboxGCU.checked) {
    return true;
  } else {
    return false;
  }
}



// Issue 4


// submit form 

// final validation
function validateData() {
  if (fields.firstname == true &&
    fields.lastname == true &&
    fields.email == true &&
    fields.birthdate == true &&
    fields.numberOfParticipations == true &&
    atLeastOneCityChecked() == true &&
    fields.checkboxGCU == true) {
    return true;
  } else {
    return false;
  }
}

const submitButton = document.getElementById('btn-submit');
const bgModalSuccess = document.querySelector('.background-modal-success');

//submit event : if every field is valid, modal "Registration success" is displayed (form modal is closed)
//error message displayed if error in cities checked
submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  hideErrorMessage(formDataCities);
  if (fields.numberOfParticipations === true && atLeastOneCityChecked() === false) {
    showErrorCityCheckbox(formDataCities);
  } else if (validateData() === true) {
    closeModal();
    launchModalRegistrationSuccess();
  }
});


  // launch modal registration success
  function launchModalRegistrationSuccess() {
    bgModalSuccess.style.display = "block";
  }

  //close modal registration success event
  bgModalSuccess.addEventListener('click', closeModalRegistrationSuccess);

  // close modal registration success 
  function closeModalRegistrationSuccess() {
    bgModalSuccess.style.display = 'none';
  }


