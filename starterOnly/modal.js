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

//close modal 

const modalCloseButton = document.querySelector(".close");

modalCloseButton.addEventListener("click", function() {
  modalbg.style.display = "none";
});


//validate firstname input


const firstname = document.getElementById('first');
const firstname_missing = document.getElementById('firstname_missing');
const firstname_format = /^[a-zA-Z '-]{2,}$/;

// submit.addEventListener('click', validate);

// function validate(e) {
//   hideError();
//   if (firstname_format.test(firstname.value) == false) { //incorrect input -> prevent form sending
//     e.preventDefault();
//     showError();
//   } 
//   sendData()
// }



// function showError() {
//   if (firstname.value == 0) {
//     firstname_missing.innerHTML = 'Prénom manquant';
//   } else {
//     firstname_missing.innerHTML = 'Format incorrect';
//   }
//   firstname_missing.style.color = 'red';
//   firstname_missing.style.fontSize = 'small';
// }





firstname.addEventListener('focus', function(){
  hideError();
})

function hideError(){
  firstname_missing.innerHTML = ""
}

firstname.addEventListener('blur', function() {
  const isValid = validateFirstname();
  if(isValid == false){
    showError();
  }
});

function validateFirstname() {
  if ((firstname.value != 0) && (firstname_format.test(firstname.value))) {
    return true;
  } else {
    return false;
  }
}

function showError() {
  if (firstname.value == 0) {
    firstname_missing.innerHTML = 'Prénom manquant';
  } else {
    firstname_missing.innerHTML = 'Format incorrect';
  }
  firstname_missing.style.color = 'red';
  firstname_missing.style.fontSize = 'small';
}

const submitButton = document.getElementById('btn-submit');
submitButton.addEventListener('click', submitForm);

function submitForm() {
  if (validateFirstname() == true) { 
    hideError();
    sendData();
  } else {
    e.preventDefault();
  }
}
