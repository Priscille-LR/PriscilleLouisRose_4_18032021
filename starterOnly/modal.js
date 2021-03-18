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

//validate value input

const validation = document.getElementById('btn-submit');
const firstname = document.getElementById('first');
const firstname_missing = document.getElementById('firstname_missing');
const firstname_validation = /^[a-zA-Z '-]{2,}$/;

validation.addEventListener('click', validate);

function validate(e) {
if (firstname_validation.test(firstname.value) == false) { //incorrect input -> prevent form sending
    e.preventDefault();
    showError();
  } 
}

function showError() {
  if (firstname.value == 0) {
    firstname_missing.innerHTML = 'Prénom manquant';
  } else {
    firstname_missing.innerHTML = 'Format incorrect';
  }
  firstname_missing.style.color = 'red';
}

const modalCloseButton = document.querySelector(".close");
//close modal form
modalCloseButton.addEventListener("click", function() {
  modalbg.style.display = "none";
});
