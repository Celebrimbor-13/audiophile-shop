//here is created html too hold items in cart

let cartWindow = document.getElementById("cart-window");
let emptyCartInfo = document.getElementById("cart-info");

let retrievedImg = document.getElementById("retrieveImg") as HTMLImageElement;
let retrieveName = document.getElementById("retrieveName");
let retrievePrice = document.getElementById("retrievePrice");

let cartContainer = document.createElement("div");
cartContainer.id = "cartEverything";
//_______________________________________________
let cartHeader = document.createElement("div");
cartHeader.id = "cartHeader";
let cartH6 = document.createElement("h6");
cartH6.className = "H6";
let cartH6Span = document.createElement("span");
cartH6Span.className = "H6";
cartH6Span.id = "itemAmount";
cartH6.innerText = "CART";
cartH6.appendChild(cartH6Span);
let removeAll = document.createElement("button");
removeAll.id = "removeAll";
removeAll.className = "body";
removeAll.innerHTML = "Remove All";
cartHeader.appendChild(cartH6);
cartHeader.appendChild(removeAll);

//_______________________________________________

let cartBody = document.createElement("ul");
cartBody.id = "itemList";

//___________________________________________;
let cartFooter = document.createElement("div");
cartFooter.id = "cartFooter";
let cartTotal = document.createElement("p");
cartTotal.id = "total";
cartTotal.innerText = "TOTAL";
let totalPrice = document.createElement("p");
let priceNumber = document.createElement("span");
totalPrice.innerText = "$";
totalPrice.appendChild(priceNumber);
cartFooter.appendChild(cartTotal);
cartFooter.appendChild(totalPrice);

//_______________________________________________
let cartButton = document.createElement("a");
cartButton.className = "btn-primary checkout";
cartButton.innerText = "CHECKOUT";
cartButton.href = "./form.html";

function insertCartItems(spanForCart) {
  let inLocalStorage = JSON.parse(localStorage.getItem("cart"));

  cartContainer.appendChild(cartHeader);

  if (inLocalStorage["item"]) {
    inLocalStorage["item"].forEach((element) => {
      let cartListItem = document.createElement("li");
      cartListItem.className = "cartListItems";
      cartBody.appendChild(cartListItem);
      let liImgAndPriceAndText = document.createElement("div");
      liImgAndPriceAndText.className = "imgPriceText";
      let liImg = document.createElement("img");

      let liPriceAntText = document.createElement("div");
      let liPrice = document.createElement("p");
      liPrice.className = "liPrice";
      let liText = document.createElement("p");
      liText.className = "liName";
      let liButton = document.createElement("div");
      liButton.className = "plus-minus-input";
      let plusB = document.createElement("button");
      plusB.innerText = "+";
      plusB.className = "plusB";
      let minusB = document.createElement("button");
      minusB.innerText = "-";
      minusB.className = "minusB";
      let qtyB = document.createElement("div");
      qtyB.className = "qtyB";

      cartH6Span.innerText = `(${inLocalStorage.totalAmount})`;

      liButton.appendChild(minusB);
      liButton.appendChild(qtyB);
      liButton.appendChild(plusB);

      liPriceAntText.appendChild(liText);
      liPriceAntText.appendChild(liPrice);

      liImgAndPriceAndText.appendChild(liImg);
      liImgAndPriceAndText.appendChild(liPriceAntText);
      cartListItem.appendChild(liImgAndPriceAndText);
      cartListItem.appendChild(liButton);

      liImg.setAttribute("src", element.imgSrc);
      liText.innerText = element.retrievedName;
      liPrice.innerText = "$" + element.price;

      spanForCart.innerText = inLocalStorage.totalAmount.toString();
    });
  }
  cartContainer.appendChild(cartBody);
  cartContainer.appendChild(cartFooter);
  cartContainer.appendChild(cartButton);
}

export {
  cartWindow,
  emptyCartInfo,
  cartContainer,
  retrieveName,
  retrievedImg,
  retrievePrice,
  insertCartItems,
  cartBody,
  priceNumber,
  cartH6Span,
  removeAll,
};
