import { type ICartProduct } from "./ICartProduct";
import type { ICustomerData } from "./ICustomerData";

export class Shoppingcart {
  cart: ICartProduct[] = [];
  cartTotal = 0;
  discount = 0;

  customerData: ICustomerData = {
    firstName: "",
    lastName: "",
    streetName: "",
    postalCode: "",
    city: "",
    phoneNr: "",
    email: "",
    cardHolderName: "",
    cardNr: "",
    cardCvc: "",
    cardExpiration: "",
  };

  constructor() {
    this.cart = [];
  }


  addProduct(id: number, name: string, price: number, quantity = 1) {
    const existingItem = this.cart.find(product => product.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ id, name, price, quantity });
    }
    this.updateTotalPrice();
  }

  removeProduct(id: number) {
    const delItem = this.cart.findIndex((product) => {return product.id == id});
    if (delItem > -1) {
      if (this.cart[delItem].quantity > 1) {
        this.cart[delItem].quantity -= 1;
      }
      else {
        this.cart.splice(delItem, 1)
      }
      this.updateTotalPrice();
    }
  }

  applyVoucher(code: string) {
    if (code === "418_I'm_A_Teapot") {
      this.discount = 0.25;
      this.updateTotalPrice();
    }
    else {
      throw new TypeError('That is not a valid voucher, please try again')
    }
  }
  updateTotalPrice() {
    this.cartTotal = this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    this.cartTotal *= (1 - this.discount);
  }

  clearCart() {
    this.cart.splice(0);
    this.updateTotalPrice();
  }

  placeOrder(customerData: ICustomerData) {
    const reEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validEmail = reEmail.test(String(customerData.email).toLowerCase());
    if (!validEmail) {
      throw new TypeError('Email is invalid, please try again')
    }

    const reAlphabetic = /^[a-zA-Z]{1,128}$/;
    const validFName = reAlphabetic.test(String(customerData.firstName).toLowerCase());
    const validLName = reAlphabetic.test(String(customerData.lastName).toLowerCase());
    const reAlphabeticCity = /^[a-zA-Z" "]{1,128}$/;
    const validCity = reAlphabeticCity.test(String(customerData.city).toLowerCase()); 
    if (!validFName || !validLName) {
      throw new TypeError('Names can only contain letters, please try again') 
    }
    if (!validCity) {
      throw new TypeError('Citynames can only contain letters, please try again') 
    }
    const reAlphaNumeric = /^[a-zA-Z]{1,128}[" "]{1}[0-9]{1,10}$/;
    const validStreetName = reAlphaNumeric.test(String(customerData.streetName).toLowerCase());

    if (!validStreetName) {
      throw new TypeError('Invalid street name, please try again')
    }
    const reAlphabeticCard = /^[a-zA-Z]{1,64}[" "]{1}[a-zA-Z]{1,64}$/;
    const validCardHolderName = reAlphabeticCard.test(String(customerData.cardHolderName).toLowerCase());

    const reNumericCardNr = /^[0-9]{15,19}$/;
    const validCardNr = reNumericCardNr.test(String(customerData.cardNr));

    const reNumericCardCvc = /^[0-9]{3}$/;
    const validCardCvc = reNumericCardCvc.test(String(customerData.cardCvc));

    const reNumericCardExp = /^[0-9]{2}\/[0-9]{2}$/;
    const validCardExp = reNumericCardExp.test(String(customerData.cardExpiration));
        
    if (!validCardHolderName || !validCardNr || !validCardCvc || !validCardExp) {
      throw new TypeError('Invalid card details, please try again')
    }

    const reNumericPhoneNr = /^[0-9]{10}$/;
    const validPhoneNr = reNumericPhoneNr.test(String(customerData.phoneNr));
    if (!validPhoneNr) {
      throw new TypeError('Invalid phone number, please try again')
    }

    const reNumericPostalCode = /^[0-9]{5}$/;
    const validPostalCode = reNumericPostalCode.test(String(customerData.postalCode));
    if (!validPostalCode) {
      throw new TypeError('Invalid postal code, please try again')
    }
    if (this.cart.length === 0) {
      throw new TypeError('Can not order with an empty cart! Why would you do this? Why. Really sit down and think about what you did.')
    }
    this.customerData = customerData
  }


}
