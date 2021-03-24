function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".background");
const modalBody = document.getElementsByClassName("modal-body");
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
const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const checkboxGCU = document.getElementById('checkbox1');
const numberOfParticipations = document.getElementById('quantity');
const checkboxesCity = document.querySelectorAll(".city-checkbox-input")


// fields format
const nameFormat = /^[a-zA-Z '-]{2,}$/;
const emailAddressFormat = /\S+@\S+\.\S+/;
const dateFormat = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const participationsFormat = /^[0-9]*$/;

const errorMessages = document.querySelectorAll('#error_message');

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



function hideError(errorMessage) {
  errorMessage.innerHTML = ""
}


// FIRSTNAME 

//hide error message when focus
firstname.addEventListener('focus', function () {
  hideError(errorMessages[0]);
})

// firstname field event: event occurs when an element loses focus; 
//error messages are displayed when field is invalid	
firstname.addEventListener('blur', function () {
  if (validateFirstname() == true) {
    fields.firstname = true;
  } else {
    fields.firstname = false;
    showErrorFirstAndLastName(errorMessages[0]);
  }
});

//firstname validation: make sure field is not empty and has the right format (min. 2 characters)
function validateFirstname() {
  if ((firstname.value.length != 0) && (nameFormat.test(firstname.value))) {
    return true;
  } else {
    return false;
  }
}

// error messages displayed in case of invalid first and lastname
function showErrorFirstAndLastName(errorMessage) {
  const completeField = 'Veuillez compléter ce champ';
  const completeTwoCharMin = 'Veuillez entrer au moins 2 caractères';
  if (errorMessage == errorMessages[0]) { //firstname
    if (firstname.value.length == 0) {
      errorMessage.innerHTML = completeField;
    } else {
      errorMessage.innerHTML = completeTwoCharMin;
    }
  } else if (errorMessage == errorMessages[1]) { // Lastname
    if (lastname.value.length == 0) {
      errorMessage.innerHTML = completeField;
    } else {
      errorMessage.innerHTML = completeTwoCharMin;
    }
  }
}


// LASTNAME 

//hide error message when focus
lastname.addEventListener('focus', function () {
  hideError(errorMessages[1]);
})

// lastname field event : event occurs when an element loses focus; 
//error messages are displayed when field is invalid
lastname.addEventListener('blur', function () {
  if (validateLastname() == true) {
    fields.lastname = true;
  } else {
    fields.lastname = false;
    showErrorFirstAndLastName(errorMessages[1]);
  }
});

//lastname validation
function validateLastname() {
  if ((lastname.value.length != 0) && (nameFormat.test(lastname.value))) {
    return true;
  } else {
    return false;
  }
}


// EMAIL 

//hide error message when focus
email.addEventListener('focus', function () {
  hideError(errorMessages[2]);
})

// email field event 
//error messages are displayed when field is invalid	
email.addEventListener('blur', function () {
  if (validateEmail() == true) {
    fields.email = true;
  } else {
    fields.email = false;
    showErrorEmail(errorMessages[2]);
  }
});

//email validation: make sure field is not empty and has the right format (= valid email address)
function validateEmail() {
  if ((email.value.length != 0) && (emailAddressFormat.test(email.value))) {
    return true;
  } else {
    return false;
  }
}

// error messages displayed in case of invalid email address
function showErrorEmail(errorMessage) {
  if (email.value.length == 0) {
    errorMessage.innerHTML = 'Veuillez compléter ce champ';
  } else {
    errorMessage.innerHTML = 'Veuillez entrer une adresse mail valide';
  }
}


//BIRTHDATE 

//hide error message when focus
birthdate.addEventListener('focus', function () {
  hideError(errorMessages[3]);
})

// birthdate field event 
//error messages are displayed when field is invalid	
birthdate.addEventListener('blur', function () {
  if (validateBirthdate() == true) {
    fields.birthdate = true;
  } else {
    fields.birthdate = false;
    showErrorBirthdate(errorMessages[3]);
  }
});

//birthdate validation: make sure field is not empty and has the right format (= JJ/MM/YYYY)
function validateBirthdate() {
  if ((birthdate.value.length != 0) && (dateFormat.test(birthdate.value))) {
    return true;
  } else {
    return false;
  }
}

// error messages displayed in case of invalid birthdate
function showErrorBirthdate(errorMessage) {
  if (birthdate.value == 0) {
    errorMessage.innerHTML = 'Veuillez entrer votre date de naissance';
  } else {
    errorMessage.innerHTML = 'Veuillez entrer une date valide';
  }
}





// number of participations => quantity 

numberOfParticipations.addEventListener('input', function () {
  console.log("value of input " + numberOfParticipations.value);
  hideError(errorMessages[4]);
  if (validateParticipations() == true) {
    fields.numberOfParticipations = true;
  } else {
    fields.numberOfParticipations = false;
    showErrorNumberOfParticipations(errorMessages[4]);
  }
});


// participations validation: make sure field has the right format (integer, not decimal) 
function validateParticipations() {
  if (participationsFormat.test(numberOfParticipations.value)) {
    return true;
  } else {
    return false;
  }
}

function showErrorNumberOfParticipations(errorMessage) {
  if (validateParticipations() == false) {
    errorMessage.innerHTML = "Veuillez entrer un nombre";
  }
}

checkboxesCity.forEach((cityCheckbox) => {
  cityCheckbox.addEventListener("change", function () {
    hideError(errorMessages[5]);
    if (this.checked) {
      fields.numberOfCitiesChecked += 1;
    } else {
      fields.numberOfCitiesChecked -= 1;
    }
  })
});

// make sure at least one city is checked if number of participations >= 1
function atLeastOneCityChecked() {
  if ((numberOfParticipations.value == 0) && (fields.numberOfCitiesChecked == 0)) {
    return true;
  }
  if ((numberOfParticipations.value >= 1) && (fields.numberOfCitiesChecked == 1)) {
    console.log("at least one city checked");
    return true;
  } else if ((numberOfParticipations.value >= 1) && (fields.numberOfCitiesChecked >= 1)) {
    return false;
  }
  return false;
}

function showErrorCityCheckbox(errorMessage) {
  if ((numberOfParticipations.value >= 1) && (fields.numberOfCitiesChecked >= 1)) {
    errorMessage.innerHTML = "Vous ne pouvez sélectionner qu'une seule ville";
  }
  else if (atLeastOneCityChecked() == false) {
    errorMessage.innerHTML = "Veuiller sélectionner une ville";
  }
}




// GCU CHECKBOX

// checkbox GCU field event : event occurs when the checked state has changed;
// this checkbox is checked by default; if user unchecks it, error message is displayed
checkboxGCU.addEventListener('change', function () {
  hideError(errorMessages[6]);
  if (validateCheckboxGCU() == true) {
    fields.checkboxGCU = true;
  } else {
    fields.checkboxGCU = false;
    showErrorCheckboxGCU(errorMessages[6]);
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

//error message is displayed when GCU checkbox is not checked
function showErrorCheckboxGCU(errorMessage) {
  if (validateCheckboxGCU() == false) {
    errorMessage.innerHTML = "Veuillez accepter les conditions d'utilisation";
  }
}


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


// Issue 4


// submit form 

const submitButton = document.getElementById('btn-submit');

submitButton.addEventListener('click', function (e) {
  if (validateData() == true) {
    console.log("inscrription enregistrée");
  } else {
    e.preventDefault();
    showErrors()
  }
});

function showErrors() {
  if (fields.numberOfParticipations == true && atLeastOneCityChecked() == false) {
    hideError(errorMessages[5]);
    showErrorCityCheckbox(errorMessages[5]);
  }
}
