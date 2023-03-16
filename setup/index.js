// GET DATA
fetch("../data.json")
  .then((response) => response.json())
  .then((cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
  });

let container = document.querySelector(".layout-placeholder");
let loadMoreButton = document.querySelector(".loadMore");
let initialItems = 4;
let loadItems = 4;

// CREATE DATA
function appendData() {
  let data = JSON.parse(localStorage.getItem("cards"));
  let out = "";
  let counter = 0;

  for (card of data) {
    if (counter < initialItems) {
      out = `
        <div class = "card">
         <div class = "cardHeader">
          <div class = "user">
           <img src="${card.profile_image}"/>
           <div class = "cardNameDate">
            <h3>${card.name}</h3>
            <p>${card.date}</p>      
           </div>
          </div>
          <img src="../icons/${card.source_type}.svg"/>
         </div>
         <img src="${card.image}" class = "cardMainImg" />
         <p>${card.caption}</p>
         <hr/>
         <div class = "likes">
          <button class = "like"><img class = "hearts" src="../icons/heart.svg"/></button>
          <p class = "numberOfLikes" >${card.likes}</p>
         </div>
        </div>
        `;
      let div = document.createElement("div");
      container.appendChild(div);
      div.innerHTML = out;
      div.className = card.source_type;
    }
    counter++;
  }
}

// LOAD MORE DATA
function loadData() {
  let data = JSON.parse(localStorage.getItem("cards"));
  let currentDisplayedItems = document.querySelectorAll(".card").length;
  let out = "";
  let counter = 0;

  for (card of data) {
    if (
      counter >= currentDisplayedItems &&
      counter < loadItems + currentDisplayedItems
    ) {
      out = `
        <div class = "card">
         <div class = "cardHeader">
          <div class = "user">
           <img src="${card.profile_image}"/>
           <div class = "cardNameDate">
            <h3>${card.name}</h3>
            <p>${card.date}</p>      
           </div>
          </div>
          <img src="../icons/${card.source_type}.svg"/>
         </div>
         <img src="${card.image}" class = "cardMainImg" />
         <p>${card.caption}</p>
         <hr/>
         <div class = "likes">
          <button class = "like"><img class = "hearts" src="../icons/heart.svg"/></button>
          <p class = "numberOfLikes" >${card.likes}</p>
         </div>
        </div>
        `;

      let div = document.createElement("div");
      container.appendChild(div);
      div.innerHTML = out;
      div.className = card.source_type;
    }
    counter++;
  }

  if (document.querySelectorAll(".card").length == data.length) {
    loadMoreButton.style.display = "none";
  }
}

// Likes
let arrButtons = document.getElementsByClassName("like");
let arrLikes = document.getElementsByClassName("numberOfLikes");
let arrHearts = document.getElementsByClassName("hearts");

document.addEventListener("click", function (e) {
  const target = e.target.closest(".like");

  for (let i = 0; i < arrButtons.length && i < arrLikes.length; i++) {
    const value = arrLikes[i].innerHTML * 1;
    if (target === arrButtons[i]) {
      if (arrHearts[i].style.backgroundColor === "transparent") {
        arrLikes[i].innerHTML = value - 1;
        arrHearts[i].style.backgroundColor = "";
        arrHearts[i].classList.remove("red");
      } else {
        arrLikes[i].innerHTML = value + 1;
        arrHearts[i].style.backgroundColor = "transparent";
        arrHearts[i].classList.add("red");
      }
    }
  }
});

// Number Of Columns
let numbers = document.getElementById("numberOfColumns");
numbers.onchange = function () {
  if (window.innerWidth > 992) {
    if (numbers.value === "1") {
      container.style.gridTemplateColumns = "auto";
    } else if (numbers.value === "2") {
      container.style.gridTemplateColumns = "auto auto";
    } else if (numbers.value === "3") {
      container.style.gridTemplateColumns = "auto auto auto";
    } else if (numbers.value === "4") {
      container.style.gridTemplateColumns = "auto auto auto auto";
    } else if (numbers.value === "5") {
      container.style.gridTemplateColumns = "auto auto auto auto auto";
    }
  }
  if (numbers.value === "dynamic") {
    container.style.removeProperty("grid-template-columns");
  }
};

let lightTheme = document.getElementById("lightTheme");
let darkTheme = document.getElementById("darkTheme");

// this is a workaround to check screen to set the layout
setInterval(() => {
  checkScreen();
}, 1);
function checkScreen() {
  if (window.innerWidth < 992) {
    container.style.removeProperty("grid-template-columns");
  }
  if (lightTheme.checked) {
    handleLight();
  }
  if (darkTheme.checked) {
    handleDark();
  }
}

// Card Background Color
let bgColor = document.getElementById("cardBackgroundColor");
let arrCards = document.getElementsByClassName("card");

bgColor.onchange = function () {
  for (let i = 0; i < arrCards.length; i++) {
    arrCards[i].style.backgroundColor = bgColor.value;
  }
};

// Card Space Between
let spaceBetween = document.getElementById("cardSpaceBetween");

spaceBetween.onchange = function () {
  container.style.gap = spaceBetween.value;
};

// Choose Theme
lightTheme.onchange = function () {
  handleLight();
};
function handleLight() {
  for (let i = 0; i < arrCards.length; i++) {
    arrCards[i].style.backgroundColor = "white";
    arrCards[i].style.color = "black";
  }
}
darkTheme.onchange = function () {
  handleDark();
};
function handleDark() {
  for (let i = 0; i < arrCards.length; i++) {
    arrCards[i].style.backgroundColor = "black";
    arrCards[i].style.color = "white";
    arrButtons[i].style.backgroundColor = "white";
  }
}

// Filter By Source
let instagram = document.getElementById("instagram");
let facebook = document.getElementById("facebook");
let all = document.getElementById("all");

let arrFacebook = document.getElementsByClassName("facebook");
let arrInstagram = document.getElementsByClassName("instagram");

instagram.onchange = function () {
  for (let i = 0; i < arrInstagram.length; i++) {
    arrInstagram[i].style.display = "flex";
  }
  for (let i = 0; i < arrFacebook.length; i++) {
    arrFacebook[i].style.display = "none";
  }
};
facebook.onchange = function () {
  for (let i = 0; i < arrInstagram.length; i++) {
    arrInstagram[i].style.display = "none";
  }
  for (let i = 0; i < arrFacebook.length; i++) {
    arrFacebook[i].style.display = "flex";
  }
};
all.onchange = function () {
  for (let i = 0; i < arrInstagram.length; i++) {
    arrInstagram[i].style.display = "flex";
  }
  for (let i = 0; i < arrFacebook.length; i++) {
    arrFacebook[i].style.display = "flex";
  }
};
// We don't have data for twitter select option in data.json file
