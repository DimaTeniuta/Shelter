
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

function deleteClass() {
  menu.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.classList.remove("open");
  body.classList.remove("open");
}

function closeMenuForLink(event) {
  if (event.target.classList.contains("menu-list-link")) {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.classList.remove("open");
    body.classList.remove("open");
  }
}

overlay.addEventListener("click", deleteClass);
hamburger.addEventListener("click", toggleMenu);
menuList.addEventListener("click", closeMenuForLink);

// <---------------- burger-menu

const slider = document.querySelector(".slider-pets");
const btnLeftOurPets = document.querySelector(".btn-left-pets");
const btnRightOurPets = document.querySelector(".btn-right-pets");
const wrapSlider = document.querySelector(".wrapper-slider-pets");
const popup = document.querySelector(".container-popup");
const overlayPopup = document.querySelector(".overlay-popup");
const btnClosePopup = document.querySelector(".wrap-btn-popup");

let idCard;
let arr = [];
let arrNum = [];
let step = 0;
let numForCreateArr = 0;
let currentwidth;

async function getData() {
  const res = await fetch("../../assets/json/pets.json");
  const data = await res.json();
  showData(data);
}
getData();

function showData(data) {
  const listPets = data;

  function addCardinArrNum() {
    if (slider.clientWidth === 1080) {
      numForCreateArr = 3;
    } else if (slider.clientWidth === 580) {
      numForCreateArr = 2;
    } else if (slider.clientWidth === 270) {
      numForCreateArr = 1;
    }

    for (let i = 0; i < 100; i++) {
      let num = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      if (!arrNum.includes(num)) {
        arrNum.push(num);
      }
      if (arrNum.length === numForCreateArr * 2) {
        break;
      }
    }
    arrNum.splice(0, numForCreateArr);
  }

  addCardinArrNum();

  function addCardInArr() {
    arr.length = 0;
    for (let i = 0; i < arrNum.length; i++) {
      arr.push(listPets[arrNum[i]]);
    }
  }

  addCardInArr();

  function showCardInLoad() {
    if (slider.clientWidth === 1080) {
      currentwidth = 360;
    } else if (slider.clientWidth === 580) {
      currentwidth = 310;
    } else if (slider.clientWidth === 270) {
      currentwidth = 270;
    }
    arr.forEach((el) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = el.name;
      card.style.left = step * currentwidth + "px";
      slider.append(card);
      const fotoCard = document.createElement("div");
      fotoCard.classList.add("foto-card");
      fotoCard.style.backgroundImage = `url(${el.img})`;
      card.append(fotoCard);
      const namePets = document.createElement("h3");
      namePets.classList.add("name-card");
      namePets.textContent = el.name;
      card.append(namePets);
      const btnCard = document.createElement("button");
      btnCard.classList.add("btn-card");
      const textBtn = document.createElement("span");
      textBtn.classList.add("text-btn-card");
      textBtn.textContent = "Learn more";
      btnCard.append(textBtn);
      card.append(btnCard);
      step++;
    });
  }

  showCardInLoad();

  function showCardRight() {
    if (slider.clientWidth === 1080) {
      step = 3;
      currentwidth = 360;
    } else if (slider.clientWidth === 580) {
      step = 2;
      currentwidth = 310;
    } else if (slider.clientWidth === 270) {
      step = 1;
      currentwidth = 270;
    }

    arr.forEach((el) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = el.name;
      card.style.left = step * currentwidth + "px";
      slider.append(card);
      const fotoCard = document.createElement("div");
      fotoCard.classList.add("foto-card");
      fotoCard.style.backgroundImage = `url(${el.img})`;
      card.append(fotoCard);
      const namePets = document.createElement("h3");
      namePets.classList.add("name-card");
      namePets.textContent = el.name;
      card.append(namePets);
      const btnCard = document.createElement("button");
      btnCard.classList.add("btn-card");
      const textBtn = document.createElement("span");
      textBtn.classList.add("text-btn-card");
      textBtn.textContent = "Learn more";
      btnCard.append(textBtn);
      card.append(btnCard);
      step++;
    });
  }

  function moveCardsRight() {
    let size = 0;
    if (slider.clientWidth === 1080) {
      size = -1080;
      currentwidth = 360;
    } else if (slider.clientWidth === 580) {
      size = -620;
      currentwidth = 310;
    } else if (slider.clientWidth === 270) {
      size = -270;
      currentwidth = 270;
    }

    for (let i = 0; i < slider.childNodes.length; i++) {
      slider.childNodes[i].style.left = size + "px";
      size += currentwidth;
    }
  }

  function deleteCardRight() {
    if (slider.clientWidth === 1080) {
      slider.firstChild.remove();
      slider.firstChild.remove();
      slider.firstChild.remove();
    } else if (slider.clientWidth === 580) {
      slider.firstChild.remove();
      slider.firstChild.remove();
    } else if (slider.clientWidth === 270) {
      slider.firstChild.remove();
    }
  }

  function shiftRight() {
    btnRightOurPets.disabled = true;
    btnLeftOurPets.disabled = true;
    addCardinArrNum();
    addCardInArr();
    showCardRight();
    setTimeout(function () {
      moveCardsRight();
    }, 1);
    setTimeout(function () {
      deleteCardRight();
      btnRightOurPets.disabled = false;
      btnLeftOurPets.disabled = false;
    }, 1200);
  }

  btnRightOurPets.addEventListener("click", shiftRight);

  function showCardLeft() {
    step = 1;
    arr.forEach((el) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = el.name;
      card.style.left = -(step * currentwidth) + "px";
      slider.prepend(card);
      const fotoCard = document.createElement("div");
      fotoCard.classList.add("foto-card");
      fotoCard.style.backgroundImage = `url(${el.img})`;
      card.append(fotoCard);
      const namePets = document.createElement("h3");
      namePets.classList.add("name-card");
      namePets.textContent = el.name;
      card.append(namePets);
      const btnCard = document.createElement("button");
      btnCard.classList.add("btn-card");
      const textBtn = document.createElement("span");
      textBtn.classList.add("text-btn-card");
      textBtn.textContent = "Learn more";
      btnCard.append(textBtn);
      card.append(btnCard);
      step++;
    });
  }

  function moveCardsLeft() {
    if (slider.clientWidth === 1080) {
      currentwidth = 360;
    } else if (slider.clientWidth === 580) {
      currentwidth = 310;
    } else if (slider.clientWidth === 270) {
      currentwidth = 270;
    }
    let size = 0;
    for (let i = 0; i < slider.childNodes.length; i++) {
      slider.childNodes[i].style.left = size + "px";
      size += currentwidth;
    }
  }

  function deleteCardLeft() {
    if (slider.clientWidth === 1080) {
      slider.lastChild.remove();
      slider.lastChild.remove();
      slider.lastChild.remove();
    } else if (slider.clientWidth === 580) {
      slider.lastChild.remove();
      slider.lastChild.remove();
    } else if (slider.clientWidth === 270) {
      slider.lastChild.remove();
    }
  }

  function shiftLeft() {
    btnLeftOurPets.disabled = true;
    btnRightOurPets.disabled = true;
    addCardinArrNum();
    addCardInArr();
    showCardLeft();
    setTimeout(function () {
      moveCardsLeft();
    }, 1);
    setTimeout(function () {
      deleteCardLeft();
      btnLeftOurPets.disabled = false;
      btnRightOurPets.disabled = false;
    }, 1200);
  }

  btnLeftOurPets.addEventListener("click", shiftLeft);

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

  slider.addEventListener("click", showPopup);

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
// <--------------------- slider





