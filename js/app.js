function CreditCard(cardNo, expiry, cvv, name, element) {
  this.cardNo = cardNo;
  this.expiry = expiry;
  this.cvv = cvv;
  this.name = name;
  this.parentElem = element;
  this.config = {};
  this.cardElements = {};
  this.init = this.init.bind(this);
  this.getValidationRules = this.getValidationRules.bind(this);
  this.scrapeFormElements = this.scrapeFormElements.bind(this);
  this.setCardFinderEvent = this.setCardFinderEvent.bind(this);
  this.getValidationRules();
}

CreditCard.prototype.setCardFinderEvent = function(element) {
  element.addEventListener("blur", event => {
    console.log("event", event);
  });
};

CreditCard.prototype.getValidationRules = function(cardType) {
  const configUrl = "https://api.myjson.com/bins/fvzpp";
  debugger;
  const scrapeFormElements = this.scrapeFormElements.bind(this);
  return fetch(configUrl)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      this.config = data;
      this.init();
    });
};

CreditCard.prototype.scrapeFormElements = function() {
  this.cardElements["cardNo"] = this.parentElem.querySelector(
    ".cards__card-formfield #cardNo"
  );
  this.cardElements["expMm"] = this.parentElem.querySelector(
    ".cards__card-formfield #mm"
  );
  this.cardElements["expYy"] = this.parentElem.querySelector(
    ".cards__card-formfield #yy"
  );
  this.cardElements["name"] = this.parentElem.querySelector(
    ".cards__card-formfield #name"
  );
  console.log("SCRAPE ", this);
};

CreditCard.prototype.saveCard = function() {
  let obj = {
    cardNo: this.cardNo,
    expiry: this.expiry,
    name: this.name
  };
  localStorage.setItem(this.name, JSON.stringify(obj));
};

CreditCard.prototype.retrieveCard = function(name) {
  return JSON.parse(localStorage.getItem(name));
};

CreditCard.prototype.setCardDetails = function(cardNo, expiry, cvv, name) {
  this.cardNo = cardNo;
  this.expiry = expiry;
  this.name = name;
};

CreditCard.prototype.init = function() {
  debugger;
  this.scrapeFormElements();
  this.setCardFinderEvent(this.cardElements["cardNo"]);
};

let NewCard = null;

let ADD_CARD_BTN = document.querySelector(".cards__add");
console.log("ADD_CARD_BTN", ADD_CARD_BTN);
let NEW_CARD_FORM = document.querySelector(".cards__card");
console.log("NEW_CARD_FORM", NEW_CARD_FORM);

ADD_CARD_BTN.addEventListener("click", event => {
  NEW_CARD_FORM.style.display = "block";
  NewCard = new CreditCard("", "", "", "", NEW_CARD_FORM);
  setTimeout(() => {
    console.log("NewCard", NewCard);
  }, 2000);
});

function scrapeFormElements() {}
