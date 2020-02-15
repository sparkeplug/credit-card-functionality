function CreditCard(cardNo, expiry, cvv, name) {
  this.cardNo = cardNo;
  this.expiry = expiry;
  this.cvv = cvv;
  this.name = name;
  this.validationRules = {};
}

CreditCard.prototype.setValidationRules = (rules) => {
  this.validationRules = Object.assign({}, rules);
};

CreditCard.prototype.getValidationRules = (cardType) => {
  return this.validationRules[cardType];
};

CreditCard.prototype.saveCard = () => {
    let obj = {
        this.cardNo,
        this.expiry,
        this.name
    }
    localStorage.setItem(this.name,JSON.stringify(obj));
};

CreditCard.prototype.retrieveCard = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

CreditCard.prototype.setCardDetails = (cardNo, expiry, cvv, name) => {
     this.cardNo = cardNo;
  this.expiry = expiry;
  this.name = name;
};

CreditCard.prototype.addCardHTMLTemplate = (parent) => {
    
};

export default CreditCard;
