// // Get all the words
// const words = document.querySelectorAll(".word");

// // Function to animate each word
// function animateWords(index) {
//   // Get the current word
//   const word = words[index];

//   // Get the letters within the word
//   const letters = word.textContent.split("");

//   // Clear the word
//   word.textContent = "";

//   // Variable to track the letter index
//   let letterIndex = 0;

//   // Function to animate each letter
//   function animateLetters() {
//     // Check if all letters have been animated
//     if (letterIndex === letters.length) {
//       // If all letters have been animated, move to the next word
//       if (index === words.length - 1) {
//         // If it's the last word, start over from the beginning
//         animateWords(0);
//       } else {
//         // Otherwise, move to the next word
//         animateWords(index + 1);
//       }
//       return;
//     }

//     // Get the current letter
//     const letter = letters[letterIndex];

//     // Create a span element for the letter
//     const span = document.createElement("span");
//     span.textContent = letter;

//     // Add the animation class to the letter
//     span.classList.add("animated-letter");

//     // Append the letter to the word
//     word.appendChild(span);

//     // Increment the letter index
//     letterIndex++;

//     // Call the function again after a delay
//     setTimeout(animateLetters, 200); // Adjust the delay as desired
//   }

//   // Start animating the letters
//   animateLetters();
// }

// // Start the animation for the first word
// animateWords(0);

let words = document.querySelectorAll(".word");

// splitting word from words
words.forEach((word) => {
  // splitting lettrs from word
  let letters = word.textContent.split("");
  word.textContent = ""; // making readout word empty

  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter; // span for each letter
    span.className = "letter";
    // appending each spanned letter to the empty word
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

// creating animation change function

let changeWord = () => {
  let currentWord = words[currentWordIndex];
  // change word if it is not last word
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  // creating an array object from an iterable currentWord and then applying array methods
  Array.from(currentWord.children).forEach((letter, i) => {
    // setting letter style after a timePeriod
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  nextWord.style.opacity = "1";
  // css for the word that is behind in next word
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// calling animation function and using it in an interval

changeWord();
setInterval(changeWord, 3000);

// circle info grow

var circles = document.querySelectorAll(".circle");
circles.forEach((element) => {
  var dots = element.getAttribute("data-dots");
  var marked = element.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i: ${i}; --rot:${rotate}deg"></div>`;
  }
  element.innerHTML = points;
  const pointsMarked = element.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});

// submit- button
const form = document.querySelector(".form");
const submitBtn = document.querySelector("#submit-btn");
const btnText = document.querySelector("#btnText");

submitHandler = (event) => {
  event.preventDefault(); // Prevent form submission from refreshing the page
  btnText.innerHTML = "Submitted";
  submitBtn.disabled = true; // Disable the submit button
  submitBtn.classList.add("active");
  event.target.reset(); // Reset the form
};

const phoneNumberInput = document.getElementById("phoneNumber");

phoneNumberInput.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  event.target.value = inputValue.slice(0, 10); // Restrict input to 10 digits
});

form.addEventListener("input", () => {
  btnText.innerHTML = "Submit";
  submitBtn.disabled = false; // Enable the submit button
  submitBtn.classList.remove("active");
});

// active menu buttons

let menuList = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {
    /* do nothing*/
    // just finding the section index whose offset is greater than scrollY then forwarding control to next statements
  }

  // removing active class from other section and addding to the cureent section with index as len

  menuList.forEach((sec) => {
    sec.classList.remove("active");
  });
  menuList[len].classList.add("active");
}

activeMenu(); // run for one time before scrolling
window.addEventListener("scroll", activeMenu);

// sticky navbar

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0); // toggle adds if condition is true , remove the class if its false or not present
});

// navbar toggler open

let menuIcon = document.querySelector("#menu-icon");
let navList = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navList.classList.toggle("open");
};
window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navList.classList.remove("open");
};

// parallax effect

// intersection observer will observe if there is intersection of a targeted element with its parent or ancestor or top-level document viewport;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // display on intersection
      entry.target.classList.add("display-items");
    } else {
      // remove on intersection
      entry.target.classList.remove("display-items");
    }
  });
});

const scrollLeft = document.querySelectorAll(".scroll-left");
scrollLeft.forEach((element) => observer.observe(element));

const scrollRight = document.querySelectorAll(".scroll-right");
scrollRight.forEach((element) => observer.observe(element));

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((element) => observer.observe(element));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((element) => observer.observe(element));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((element) => observer.observe(element));

// sending mail using email js

async function SendMail() {
  console.log("Send email called");

  let Params = {
    from_name: document.getElementById("from_name").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
    phoneNumber: document.getElementById("phoneNumber").value,
  };

  await emailjs.send("service_syxrbyr", "template_gkxrgpo", Params).then(
    function (response) {
      console.log("SUCCESS!");
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}
