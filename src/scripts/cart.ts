import {
  emptyCartInfo,
  cartWindow,
  cartContainer,
  retrieveName,
  retrievePrice,
  retrievedImg,
  insertCartItems,
  cartBody,
  priceNumber,
  cartH6Span,
  removeAll,
} from "./cartItems";

let button = document.getElementById("addToCart");
let plus = document.getElementById("plus");
let quantityDiv = document.getElementById("qty");
let minus = document.getElementById("minus");
let cartLogo = document.getElementById("cart-logo");

let spanForCart = document.createElement("span");
spanForCart.className = "qtyCircle";
let quantity: number;

let cartListItems = document.getElementsByClassName("cartListItems");
let qtyB = document.getElementsByClassName("qtyB");
let plusB = document.getElementsByClassName("plusB");
let minusB = document.getElementsByClassName("minusB");

let inLocalStorage = JSON.parse(localStorage.getItem("cart"));

//code to remove all items from cart when clicked corresponding button
if (removeAll) {
  removeAll.addEventListener("click", function () {
    localStorage.removeItem("cart");
    cartWindow.removeChild(cartContainer);
    cartWindow.appendChild(emptyCartInfo);
    spanForCart.remove();
  });
}

//increase or decrease quantites from main window
if (quantityDiv) {
  quantity = parseInt(quantityDiv.innerText);

  plus.addEventListener("click", function () {
    quantity = quantity + 1;
    quantityDiv.innerText = quantity.toString();
  });

  minus.addEventListener("click", function () {
    if (quantity <= 1) {
      quantityDiv.innerText = "1";
      quantity = 1;
    } else {
      quantity = quantity - 1;
      quantityDiv.innerText = quantity.toString();
    }
  });

  //___________________________________________________________________

  //when clicked main button display correct ammount of quantities everywhere where needed
  //and at the same updating localStorage
  button.addEventListener("click", function () {
    if (emptyCartInfo) {
      emptyCartInfo.remove();
    }

    let objectForStorage = {
      retrievedName: retrieveName.innerText,
      imgSrc: retrievedImg.getAttribute("src"),
      price: retrievePrice.innerText,
      qty: quantityDiv.innerText,
    };
    Promise.resolve().then(function () {
      while (cartBody.hasChildNodes()) {
        cartBody.removeChild(cartBody.firstChild);
      }
      insertCartItems(spanForCart);
      cartWindow.appendChild(cartContainer);
      cartLogo.appendChild(spanForCart);
      amountInCart();
      totalPriceInCart();
      cartPlusMinus();
    });

    if (spanForCart.innerText) {
      spanForCart.innerText = (parseInt(spanForCart.innerText) + quantity).toString();
    } else {
      spanForCart.innerText = quantity.toString();
    }

    let items = [];
    let forStorage = {};
    if (!inLocalStorage) {
      items.push(objectForStorage);
      forStorage["item"] = items;
      forStorage["totalAmount"] = quantity;
      localStorage.setItem("cart", JSON.stringify(forStorage));
      inLocalStorage = JSON.parse(localStorage.getItem("cart"));
    } else {
      for (let i = 0; i < inLocalStorage["item"].length; i++) {
        if (inLocalStorage["item"][i].retrievedName === objectForStorage.retrievedName) {
          inLocalStorage["item"][i].qty = (
            parseInt(inLocalStorage["item"][i].qty) + parseInt(objectForStorage.qty)
          ).toString();
          inLocalStorage.totalAmount = inLocalStorage.totalAmount + parseInt(objectForStorage.qty);
          localStorage.setItem("cart", JSON.stringify(inLocalStorage));
          inLocalStorage = JSON.parse(localStorage.getItem("cart"));
          break;
        } else {
          if (inLocalStorage["item"][i].retrievedName !== objectForStorage.retrievedName) {
            if (i === inLocalStorage["item"].length - 1) {
              inLocalStorage.totalAmount = inLocalStorage.totalAmount + parseInt(objectForStorage.qty);
              inLocalStorage["item"].push(objectForStorage);
              localStorage.setItem("cart", JSON.stringify(inLocalStorage));
              break;
            }
          }
        }
      }
    }
  });
}

//if user changed page and if there is items in cart
//we need to keep this items to be in cart
if (inLocalStorage) {
  window.addEventListener("load", function () {
    if (emptyCartInfo) {
      emptyCartInfo.remove();
    }
    insertCartItems(spanForCart);
    cartWindow.appendChild(cartContainer);
    cartLogo.appendChild(spanForCart);
    amountInCart();
    totalPriceInCart();
    cartPlusMinus();
  });
}

//function responsible to display amount of every item in "plus-minus button"
function amountInCart() {
  for (let i = 0; i < qtyB.length; i++) {
    if ((qtyB[i] as HTMLElement).innerText) {
      (qtyB[i] as HTMLElement).innerText = (parseInt((qtyB[i] as HTMLElement).innerText) + quantity).toString();
    } else {
      (qtyB[i] as HTMLElement).innerText = inLocalStorage["item"][i]["qty"];
    }
  }
}

//function responsible for displaying total price in cart
function totalPriceInCart() {
  let totalPriceNum = 0;
  for (let i = 0; i < inLocalStorage["item"].length; i++) {
    totalPriceNum =
      totalPriceNum +
      parseInt(inLocalStorage["item"][i]["qty"]) * parseFloat(inLocalStorage["item"][i]["price"].replaceAll(".", ""));
  }
  priceNumber.innerText = totalPriceNum.toLocaleString("de-DE");
}

//function responsible for adding or removeing item in cart
//using  "plus-minus button" in cart and updateing localStorage
function cartPlusMinus() {
  if (qtyB) {
    //control quantity in cart window
    for (let i = 0; i < cartListItems.length; i++) {
      let cartQty = qtyB[i] as HTMLElement;
      plusB[i].addEventListener("click", function () {
        cartQty.innerText = (parseInt(cartQty.innerText) + 1).toString();
        spanForCart.innerText = (parseInt(spanForCart.innerText) + 1).toString();
        cartH6Span.innerText = `(${inLocalStorage.totalAmount + 1})`;
        inLocalStorage["item"][i]["qty"] = cartQty.innerText;
        inLocalStorage.totalAmount = inLocalStorage.totalAmount + 1;

        localStorage.setItem("cart", JSON.stringify(inLocalStorage));
        totalPriceInCart();
      });
      minusB[i].addEventListener("click", function () {
        if (parseInt(cartQty.innerText) <= 1) {
          cartQty.innerText = "1";
          spanForCart.innerText = "1";
        } else {
          cartQty.innerText = (parseInt(cartQty.innerText) - 1).toString();
          spanForCart.innerText = (parseInt(spanForCart.innerText) - 1).toString();
          cartH6Span.innerText = `(${inLocalStorage.totalAmount - 1})`;
          inLocalStorage["item"][i]["qty"] = cartQty.innerText;
          inLocalStorage.totalAmount = inLocalStorage.totalAmount - 1;
          localStorage.setItem("cart", JSON.stringify(inLocalStorage));
          totalPriceInCart();
        }
      });
    }
  }
}
