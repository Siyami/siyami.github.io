'use strict';

let excellent = document.getElementById("excellent");
let good = document.getElementById("good");
let poor = document.getElementById("poor");
let submitBtn = document.getElementById("submitBtn");
let skipBtn = document.getElementById("skipBtn");
let validationFlag = false;

// API gets called with this function
function sendToServer(q1, q2, sum) {
  alert(`q1_value: ${q1}, q2_value: ${q2}, sum: ${sum}`);
}

function validateQuestion1() {
  if (excellent.checked) return validateQuestion2();
  let q1Selections = document.getElementsByName("question1");
  for (let el of q1Selections) {
    if (el.checked === true) return;
  }
  alert("Please select an answer for the first question.");
  validationFlag = true;
}
function validateQuestion2() {
  let q2Selections = document.getElementsByClassName("question2");
  for (let el of q2Selections) {
    if (el.checked === true) return;
  }
  alert("Please select at least 1 answer for the second question.");
  validationFlag = true;
}

function calculateScore() {
  validationFlag = false;
  validateQuestion1();
  
  if (validationFlag) return;
  if (good.checked) return sendToServer(50, 0, 50);
  else if (poor.checked) return sendToServer(0, 0, 0);

  let set = document.getElementsByTagName("input");
  let sum = 0;
  for (let i = 0; i < set.length; i++) {
    if (set[i].checked) {
      sum += parseInt(set[i].value);
    }
  }
  let q1_value = 100;
  let q2_value = sum - 100;

  sendToServer(q1_value, q2_value, sum);
}

submitBtn.addEventListener("click", function () {
  calculateScore();
});

skipBtn.addEventListener("click", function () {
  document.getElementById("question2").innerHTML = "";
  let set = document.getElementsByName("question1");
  for (let el of set) {
    el.checked = false;
  }
});

excellent.addEventListener("click", function () {
  document.getElementById("question2").innerHTML = `
    <p class="light-border">2. Which part of content are relevant to the query?</p>
    <input class="question2" type="radio" id="image" name="image" value="50" />
    <label for="image">Image</label><br />
    <input class="question2" type="radio" id="name" name="q2-name" value="50" />
    <label for="name">Name</label><br />
    <input class="question2" type="radio" id="description" name="description" value="25" />
    <label for="description">Description</label>
  `;
});

good.addEventListener("click", function () {
  document.getElementById("question2").innerHTML = "";
});

poor.addEventListener("click", function () {
  document.getElementById("question2").innerHTML = "";
});
