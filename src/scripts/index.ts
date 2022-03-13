import "../css/styles.css";
import "./cart";

let hamburger = document.getElementById("hamburger");
let hamburgerProduct = document.getElementById("hamburger-product");
let hamburgerIcon = document.getElementById("hamburger-icon") as HTMLImageElement;
let cart = document.getElementById("cart-logo");
let cartWindow = document.getElementById("cart-window");
let infade = document.getElementsByClassName("infade");
let forBlur = document.getElementsByClassName("forBlur")[0] as HTMLElement;

window.addEventListener("scroll", function () {
  let scrollYPixels = window.scrollY + window.innerHeight;
  for (let i = 0; i < infade.length; i++) {
    let element = infade[i] as HTMLElement;
    let divTop = element.getBoundingClientRect().bottom;
    if (scrollYPixels > divTop) {
      element.style.transition = `${i + 3}s`;
      element.style.opacity = "1";
    }
  }
});

window.addEventListener("resize", function () {
  if (this.window.innerWidth > 1010) {
    hamburgerProduct.removeAttribute("style");
    hamburgerIcon.src = "./images/icon-hamburger.svg";
    if (hamburgerProduct && forBlur) {
      if (!hamburgerProduct.style.visibility && forBlur.style.filter && !cartWindow.style.display) {
        forBlur.removeAttribute("style");
      }
    }
  }
});

hamburger.addEventListener("click", function () {
  if (cartWindow.style.display) {
    cartWindow.removeAttribute("style");
  }
  if (!hamburgerProduct.style.visibility) {
    if (forBlur) {
      forBlur.style.filter = "blur(2px) grayscale(80%)";
    }
    hamburgerProduct.style.visibility = "visible";
    hamburgerProduct.style.opacity = "1";
    hamburgerProduct.style.transform = "translate(0rem,0rem)";
    hamburgerProduct.style.transition = "transform 500ms, opacity 500ms";
    hamburgerIcon.src = "./images/icon-close-menu.svg";
  } else {
    hamburgerProduct.removeAttribute("style");
    hamburgerIcon.src = "./images/icon-hamburger.svg";
    if (forBlur) {
      forBlur.removeAttribute("style");
    }
  }
});

cart.addEventListener("click", function () {
  if (!cartWindow.style.display) {
    if (forBlur) {
      forBlur.style.filter = "blur(2px) grayscale(80%)";
    }
    cartWindow.style.display = "flex";
    hamburgerProduct.removeAttribute("style");
    hamburgerIcon.src = "./images/icon-hamburger.svg";
  } else {
    cartWindow.removeAttribute("style");
    if (forBlur) {
      forBlur.removeAttribute("style");
    }
  }
});
