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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal event

const modalCloseButton = document.querySelector(".close");
modalCloseButton.addEventListener("click", closeModal);

// close modal form

function closeModal() {
  modalbg.style.display = "none";
}


// Issue 2


const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');

const nameFormat = /^[a-zA-Z '-]{2,}$/;
const emailAdressFormat = /\S+@\S+\.\S+/;

const errorMessages = document.querySelectorAll('#error_message');

const fields = {
  firstname: false,
  lastname: false,
  email: false,
  birthdate: false,
  quantity: false,
  checkbox1: false
}


// firstname validation

firstname.addEventListener('focus', function () {
  hideError(errorMessages[0]);
})

function hideError(errorMessage) {
  errorMessage.innerHTML = ""
}

firstname.addEventListener('blur', function () {
  if (validateFirstname() == true) {
    fields.firstname = true;
  } else {
    fields.firstname = false;
    showErrorFirstAndLastName(errorMessages[0]);
  }
});

function validateFirstname() {
  if ((firstname.value.length != 0) && (nameFormat.test(firstname.value))) {
    return true;
  } else {
    return false;
  }
}

function showErrorFirstAndLastName(errorMessage) {
  const completeField = 'Veuillez compléter ce champ';
  const completeTwoCharMin = 'Veuillez entrer au moins 2 caractères';
  if (errorMessage == errorMessages[0]) { //firstaName
    if (firstname.value.length == 0) {
      errorMessage.innerHTML = completeField;
    } else {
      errorMessage.innerHTML = completeTwoCharMin;
    }
  } else if (errorMessage == errorMessages[1]) { // LastName
    if (lastname.value.length == 0) {
      errorMessage.innerHTML = completeField;
    } else {
      errorMessage.innerHTML = completeTwoCharMin;
    }
  }

  errorMessage.style.color = 'red';
  errorMessage.style.fontSize = 'small';


}


function showErrorEmail(errorMessage) {
  if (email.value.length == 0) {
    errorMessage.innerHTML = 'Veuillez compléter ce champ';
  } else {
    errorMessage.innerHTML = 'Veuillez entrer une adresse mail valide';
  }
  errorMessage.style.color = 'red';
  errorMessage.style.fontSize = 'small';
}


// lastname validation

lastname.addEventListener('focus', function () {
  hideError(errorMessages[1]);
})


lastname.addEventListener('blur', function () {
  if (validateLastname() == true) {
    fields.lastname = true;
  } else {
    fields.lastname = false;
    showErrorFirstAndLastName(errorMessages[1]);
  }
});



function validateLastname() {
  if ((lastname.value.length != 0) && (nameFormat.test(lastname.value))) {
    return true;
  } else {
    return false;
  }
}

// email validation
email.addEventListener('focus', function () {
  hideError(errorMessages[2]);
})

email.addEventListener('blur', function () {
  if (validateEmail() == true) {
    fields.email = true;
  } else {
    fields.email = false;
    showErrorEmail(errorMessages[2]);
  }
});

function validateEmail() {
  if ((email.value.length != 0) && (emailAdressFormat.test(email.value))) {
    return true;
  } else {
    return false;
  }
}


// final validation
function validate() {
  if (fields.firstname == true &&
    fields.lastname == true &&
    fields.email == true &&
    fields.birthdate == true &&
    fields.quantity == true &&
    fields.checkbox1 == true) {
    return true;
  } else {
    return false;
  }
}

// submit form 

const submitButton = document.getElementById('btn-submit');
submitButton.addEventListener('click', submitForm);

function submitForm(e) {
  console.log(fields)
  e.preventDefault();
  if (validate() == true) {
    hideError();
    sendData();//to do
  }
}
