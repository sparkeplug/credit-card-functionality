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
    const value = event.target.value;
    for (let conf in this.config) {
      console.log(conf);
      const pattern = this.config[conf]["cardPattern"];
      console.log("pattern", pattern);
      let reg = new RegExp(pattern);
      let flag = reg.test(value);
      console.log("flag", flag);
    }
    console.log("value", value);
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

localStorage.setItem(
  "savedCards",
  JSON.stringify([
    {
      name: "HDFC",
      cardNo: "5536859105276613",
      expiry: "03/22"
    },
    {
      name: "AXIS",
      cardNo: "4716088083344970",
      expiry: "02/22"
    },
    {
      name: "AMEX",
      cardNo: "370897299093956",
      expiry: "01/22"
    }
  ])
);

let ADD_CARD_BTN = document.querySelector(".cards__add");
let NEW_CARD_FORM = document.querySelector(".cards__card");
let SAVED_CARDS = document.querySelector(".saved-cards__cards");

ADD_CARD_BTN.addEventListener("click", event => {
  NEW_CARD_FORM.style.display = "block";
  NewCard = new CreditCard("", "", "", "", NEW_CARD_FORM);
  setTimeout(() => {
    console.log("NewCard", NewCard);
  }, 2000);
});

const localData = JSON.parse(localStorage.getItem("savedCards"));
console.log("localData", localData);

const renderSavedCards = function() {
  localData.forEach(d => {
    const li = document.createElement("li");
    li.className = "saved-cards__card";
    const cardDetails = document.createElement("div");
    cardDetails.className = "saved-cards__card-details";
    const title = document.createElement("h2");
    title.style.marginBottom = "0.5rem";
    title.innerHTML = d["name"];
    title.className = "title";
    const image = document.createElement("img");
    image.className = "image";
    image.alt = "visa";
    const cardNo = document.createElement("div");
    cardNo.className = "cardNo";
    const cardNoTextStrong = document.createElement("strong");
    const cardNoText = document.createElement("h4");
    cardNoText.innerHTML = d["cardNo"];
    const cardActions = document.createElement("div");
    cardActions.className = "saved-cards__card-actions";
    const edit = document.createElement("button");
    edit.className = "edit";
    edit.innerHTML = "EDIT";
    const del = document.createElement("button");
    del.className = "delete";
    del.innerHTML = "DELETE";
    cardNoTextStrong.append(cardNoText);
    cardNo.append(cardNoText);
    cardDetails.append(title);
    cardDetails.append(image);
    cardDetails.append(cardNo);
    cardActions.append(edit);
    cardActions.append(del);
    li.append(cardDetails);
    li.append(cardActions);
    console.log(li);

    SAVED_CARDS.append(li);
  });
};

renderSavedCards();
