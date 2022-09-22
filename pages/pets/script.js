
// burger-menu ---------------->
const hamburger = document.querySelector(".menu");
const menu = document.querySelector(".wrap-menu");
const overlay = document.querySelector(".overlay");
const menuList = document.querySelector(".menu-list");
const body = document.querySelector("body");

function toggleMenu() {
  hamburger.classList.toggle("open");
  menu.classList.toggle("open");
  overlay.classList.toggle("open");
  body.classList.toggle("open");
}

hamburger.addEventListener("click", toggleMenu);

function deleteClass() {
  menu.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.classList.remove("open");
  body.classList.remove("open");
}

overlay.addEventListener("click", deleteClass);

function closeMenuForLink(event) {
  if (event.target.classList.contains("menu-list-link")) {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.classList.remove("open");
    body.classList.remove("open");
  }
}

menuList.addEventListener("click", closeMenuForLink);

// <---------------- burger-menu

// Pagination ----------------->
const wrapSlider = document.querySelector(".wrapper-slider-pets");
const btnRight = document.querySelector(".right");
const btnRightContent = document.querySelector(".content-right");
const btnDoubleRight = document.querySelector(".double-right");
const btnDoubleRightContent = document.querySelector(".content-double-right");
const btnLeft = document.querySelector(".left");
const btnLeftContent = document.querySelector(".content-left");
const page = document.querySelector(".content-page-slider");
const btnDoubleLeft = document.querySelector(".double-left");
const btnDoubleLeftContent = document.querySelector(".content-double-left");
const popup = document.querySelector(".container-popup");
const overlayPopup = document.querySelector(".overlay-popup");
const btnClosePopup = document.querySelector(".wrap-btn-popup");

let idCard;
let arr = [];
let array = [];
let mainArray = [];
let step = 0;
let step2 = 0;
let curretPage = 1;
let currentMainArrayLength = 0;
let currentPageLength = 0;
let size = 0;
let lastPageLength = 0;

async function getData() {
  const res = await fetch("../../assets/json/pets.json");
  const data = await res.json();
  showData(data);
}
getData();


function createArr() {
  for (let i = 0; i < 8; i++) {
    arr.push(i);
  }

  arr.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 8; i++) {
    let x = arr.shift();
    arr.push(x);
    array.push(...arr);
  }

  if (body.clientWidth >= 1200) {
    currentMainArrayLength = 8;
    currentPageLength = 6;
    size = 1200;
    lastPageLength = 6000;
  } else if (body.clientWidth < 1200 && body.clientWidth >= 768) {
    currentMainArrayLength = 6;
    currentPageLength = 8;
    size = 580;
    lastPageLength = 4060;
  } else if (body.clientWidth < 768) {
    currentMainArrayLength = 3;
    currentPageLength = 16;
    size = 270;
    lastPageLength = 4050;
  }
  for (let i = 0; i < array.length; i += currentMainArrayLength) {
    mainArray.push(array.slice(i, i + currentMainArrayLength));
  }
}

createArr();

function showData(data) {
  const listPets = data;

  function createCards() {
    for (let i = 0; i < currentPageLength; i++) {
      const slider = document.createElement("div");
      slider.classList.add("slider-pets");
      for (let j = 0; j < currentMainArrayLength; j++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = listPets[mainArray[i][j]].name;
      slider.append(card);
      const fotoCard = document.createElement("div");
      fotoCard.classList.add("foto-card");
      fotoCard.style.backgroundImage = `url(${listPets[mainArray[i][j]].img})`;
      card.append(fotoCard);
      const namePets = document.createElement("h3");
      namePets.classList.add("name-card");
      namePets.textContent = listPets[mainArray[i][j]].name;
      card.append(namePets);
      const btnCard = document.createElement("button");
      btnCard.classList.add("btn-card");
      const textBtn = document.createElement("span");
      textBtn.classList.add("text-btn-card");
      textBtn.textContent = "Learn more";
      btnCard.append(textBtn);
      card.append(btnCard);
      }
      wrapSlider.append(slider);
    };
    checkPage();
  }
  createCards();


  function checkPage() {
    if (curretPage === currentPageLength) {
      btnRight.disabled = true;
      btnDoubleRight.disabled = true;
      btnRight.classList.add('off');
      btnRightContent.classList.add('off');
      btnDoubleRight.classList.add('off');
      btnDoubleRightContent.classList.add('off');
     } else {
      btnRight.disabled = false;
      btnDoubleRight.disabled = false;
      btnRight.classList.remove('off');
      btnRightContent.classList.remove('off');
      btnDoubleRight.classList.remove('off');
      btnDoubleRightContent.classList.remove('off');
     }

     if (curretPage === 1) {
      btnLeft.disabled = true;
      btnDoubleLeft.disabled = true;
      btnLeft.classList.add('off');
      btnLeftContent.classList.add('off');
      btnDoubleLeft.classList.add('off');
      btnDoubleLeftContent.classList.add('off');
     } else {
      btnLeft.disabled = false;
      btnDoubleLeft.disabled = false;
      btnLeft.classList.remove('off');
      btnLeftContent.classList.remove('off');
      btnDoubleLeft.classList.remove('off');
      btnDoubleLeftContent.classList.remove('off');
     }  
  }

  function shiftRight() {
    step2 += size;
    wrapSlider.style.left = -step2 + 'px';
     curretPage++;
     page.innerHTML = curretPage;
     checkPage();
  }

  btnRight.addEventListener('click', shiftRight);

  function shiftLeft() {
    step2 -= size;
    wrapSlider.style.left = -step2 + 'px';
     curretPage--;
     page.innerHTML = curretPage;
     checkPage();
  }

  btnLeft.addEventListener('click', shiftLeft);

function shiftRightEnd() {
  step2 = lastPageLength;
  curretPage = currentPageLength;
  page.innerHTML = curretPage;
  wrapSlider.style.left = -step2 + 'px';
  checkPage();
}

  btnDoubleRight.addEventListener('click', shiftRightEnd);

function shiftLefttEnd() {
  step2 = 0;
  curretPage = 1;
  page.innerHTML = curretPage;
  wrapSlider.style.left = -step2 + 'px';
  checkPage();
}

  btnDoubleLeft.addEventListener('click', shiftLefttEnd);

// popup ---------------------->
function createContentPopup() {
  listPets.forEach((el) => {
    if (idCard === el.name) {
      document.querySelector(".img-popup").style.backgroundImage = `url(${el.img2})`;
      document.querySelector(".name-popup").innerHTML = el.name;
      document.querySelector(".breed-popup").innerHTML = `${el.type} - ${el.breed}`;
      document.querySelector(".description-popup").innerHTML = el.description;
      document.querySelector(".age-text-popup").innerHTML = el.age;
      document.querySelector(".inoculations-text-popup").innerHTML = el.inoculations;
      document.querySelector(".diseases-text-popup").innerHTML = el.diseases;
      document.querySelector(".parasites-text-popup").innerHTML = el.parasites;
    }
  });
}

function showPopup(event) {
  if (
    event.target.classList.contains("card") ||
    event.target.classList.contains("foto-card") ||
    event.target.closest("button") ||
    event.target.closest("h3")
  ) {
    if (
      event.target.className === "foto-card" ||
      event.target.className === "name-card" ||
      event.target.className === "btn-card" ||
      event.target.className === "text-btn-card"
    ) {
      idCard = event.target.parentNode.id;
    } else {
      idCard = event.target.id;
    }
    createContentPopup();
    popup.classList.add("show-popup");
    overlayPopup.classList.add("show-popup");
    body.classList.add("open");
  }
}

wrapSlider.addEventListener("click", showPopup);

function closePopup() {
  popup.classList.remove("show-popup");
  overlayPopup.classList.remove("show-popup");
  body.classList.remove("open");
}

btnClosePopup.addEventListener("click", closePopup);
overlayPopup.addEventListener("click", closePopup);

overlayPopup.addEventListener("mouseover", () => {
  // add hover effect for bntClosePopup
  btnClosePopup.classList.add("hover-bnt");
});

overlayPopup.addEventListener("mouseout", () => {
  // remove hover effect for bntClosePopup
  btnClosePopup.classList.remove("hover-bnt");
});
// <---------------------- popup
}

// <----------------- Pagination
