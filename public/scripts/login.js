// Get the button that opens the modal
var btnOpen = document.getElementById("myBtn");

var signUp = document.getElementById("signUpChange");
var signIn = document.getElementById("signInChange");

var modal = document.getElementById("myModal");

//  Primary stuff for span!!!

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnOpen.onclick = function () {
  document.getElementById("myModal").style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  document.getElementById("myModal").style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("myModal").style.display = "none";
  }
};

// sign up stuff!!!

signUp.onclick = function () {
  document.getElementById("login").style.display = "none";
  document.getElementById("signUp").style.display = "block";
};

signIn.onclick = function () {
  document.getElementById("signUp").style.display = "none";
  document.getElementById("login").style.display = "block";
};
